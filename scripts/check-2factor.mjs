#!/usr/bin/env node
/**
 * Confirms the 2Factor setup against the live account, so nobody has to guess
 * whether checkout verification will work.
 *
 *   npm run otp:check              # config + balance only, sends nothing
 *   npm run otp:check -- 9876543210  # also sends one real SMS to that number
 *
 * The API key is read from the environment and never printed.
 */

const key = process.env.TWOFACTOR_API_KEY?.trim()
const secret = process.env.OTP_SIGNING_SECRET?.trim()
const template = process.env.TWOFACTOR_TEMPLATE_NAME?.trim()

const ok = (m) => console.log(`  ok    ${m}`)
const bad = (m) => console.log(`  FAIL  ${m}`)
const info = (m) => console.log(`  ·     ${m}`)

console.log("\n2Factor checkout verification — setup check\n")

let fatal = false

if (key) ok(`TWOFACTOR_API_KEY is set (${key.length} chars, ending …${key.slice(-4)})`)
else { bad("TWOFACTOR_API_KEY is not set"); fatal = true }

if (secret) {
  if (secret.length >= 32) ok(`OTP_SIGNING_SECRET is set (${secret.length} chars)`)
  else { bad(`OTP_SIGNING_SECRET is only ${secret.length} chars — use at least 32`); fatal = true }
} else {
  bad("OTP_SIGNING_SECRET is not set  →  generate one with: openssl rand -hex 32")
  fatal = true
}

info(template ? `Using DLT template "${template}"` : "No TWOFACTOR_TEMPLATE_NAME — sending on 2Factor's own template")

if (fatal) {
  console.log("\nVerification stays switched off until the above is fixed.\n")
  process.exit(1)
}

const call = async (path) => {
  const res = await fetch(`https://2factor.in/API/V1/${key}/${path}`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`non-JSON response (HTTP ${res.status})`)
  }
}

try {
  const bal = await call("BAL/SMS")
  if (bal.Status?.toLowerCase() === "success") {
    ok(`Account reachable. SMS balance: ${JSON.stringify(bal.Details)}`)
  } else {
    bad(`Account rejected the key: ${bal.Details}`)
    process.exit(1)
  }
} catch (err) {
  bad(`Could not reach 2Factor: ${err.message}`)
  process.exit(1)
}

const target = process.argv[2]?.replace(/\D/g, "").slice(-10)
if (!target) {
  console.log("\nConfig looks good. Pass a mobile number to send one real test SMS.\n")
  process.exit(0)
}
if (!/^[6-9]\d{9}$/.test(target)) {
  bad(`"${process.argv[2]}" is not a valid 10-digit Indian mobile number`)
  process.exit(1)
}

console.log(`\nSending one real SMS to +91${target} (this costs one credit)…`)
const suffix = template ? `/${encodeURIComponent(template)}` : ""
const sent = await call(`SMS/+91${target}/AUTOGEN${suffix}`)

if (sent.Status?.toLowerCase() !== "success") {
  bad(`Send refused: ${sent.Details}`)
  process.exit(1)
}
ok("Sent. If the SMS does not arrive within a minute, the number's DLT/sender registration is the usual cause.")
console.log("\nTo finish the round trip, run:")
console.log(`  node --env-file=.env.local -e "fetch('https://2factor.in/API/V1/'+process.env.TWOFACTOR_API_KEY+'/SMS/VERIFY/${sent.Details}/'+process.argv[1]).then(r=>r.text()).then(console.log)" -- <code-you-received>\n`)
