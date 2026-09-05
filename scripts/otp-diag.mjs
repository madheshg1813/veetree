#!/usr/bin/env node
/**
 * Works out which 2Factor route, if any, actually delivers a text.
 *
 *   npm run otp:diag                 # read-only: balances, no sends
 *   npm run otp:diag -- 9384606981   # sends ONE message on each SMS route
 *
 * Two routes are tried because they are separate products on 2Factor's side:
 *   AUTOGEN      — 2Factor generates and holds the code (what checkout uses)
 *   explicit OTP — we generate the code and hand it to them to send
 * If one arrives as a text and the other as a call, that tells us which one
 * checkout should be using. If both arrive as calls, the cause is the account
 * or the number, not the endpoint, and no code change will fix it.
 */

const key = process.env.TWOFACTOR_API_KEY?.trim()
if (!key) { console.error("TWOFACTOR_API_KEY is not set"); process.exit(1) }

const call = async (path) => {
  const res = await fetch(`https://2factor.in/API/V1/${key}/${path}`, {
    headers: { accept: "application/json" }, signal: AbortSignal.timeout(10_000),
  })
  const text = (await res.text()).split(key).join("<key>")
  try { return JSON.parse(text) } catch { return { Status: "Error", Details: text.slice(0, 200) } }
}

const balances = async () => ({
  sms: (await call("BAL/SMS")).Details,
  voice: (await call("BAL/VOICE")).Details,
})

const before = await balances()
console.log(`\nBalances now — SMS: ${before.sms}   VOICE: ${before.voice}\n`)

const phone = process.argv[2]?.replace(/\D/g, "").slice(-10)
if (!phone) {
  console.log("Pass a mobile number to send one message on each SMS route.\n")
  process.exit(0)
}
if (!/^[6-9]\d{9}$/.test(phone)) { console.error(`"${process.argv[2]}" is not a valid number`); process.exit(1) }

const template = process.env.TWOFACTOR_TEMPLATE_NAME?.trim()
const suffix = template ? `/${encodeURIComponent(template)}` : ""
console.log(template ? `Using template "${template}"\n` : "No template set — using 2Factor's default\n")

// Route A: the one checkout uses today.
console.log("Route A  SMS/{phone}/AUTOGEN")
const a = await call(`SMS/+91${phone}/AUTOGEN${suffix}`)
console.log(`         ${a.Status}: ${a.Details}\n`)

// Route B: our own code, on the explicit SMS route.
const mine = String(Math.floor(100000 + Math.random() * 900000))
console.log(`Route B  SMS/{phone}/{otp}   (code ${mine})`)
const b = await call(`SMS/+91${phone}/${mine}${suffix}`)
console.log(`         ${b.Status}: ${b.Details}\n`)

const after = await balances()
console.log(`Balances after — SMS: ${after.sms}   VOICE: ${after.voice}`)
console.log(`Consumed — SMS: ${Number(before.sms) - Number(after.sms)}   VOICE: ${Number(before.voice) - Number(after.voice)}\n`)
console.log("Now check your phone. Report which of the two arrived, and whether")
console.log("each came as a text or a call.\n")
