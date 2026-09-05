#!/usr/bin/env node
/**
 * Installs the 2Factor API key into .env.local.
 *
 * The key is read straight from the terminal into this process and written to
 * the file. It is never echoed, never logged, and never printed back — the only
 * thing reported is whether 2Factor accepted it.
 *
 *   npm run otp:setup
 */

import { randomBytes } from "node:crypto"
import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs"

const ENV = new URL("../.env.local", import.meta.url).pathname

const say = (m = "") => console.log(m)
const ok = (m) => say(`  ok    ${m}`)
const bad = (m) => say(`  FAIL  ${m}`)

say("\n2Factor key setup\n")

if (!process.stdin.isTTY) {
  bad("This needs an interactive terminal so the key can be typed without being logged.")
  process.exit(1)
}

/**
 * Prompts with the input hidden, the way a password prompt behaves.
 *
 * Reads raw keystrokes rather than going through readline: the usual muting
 * trick reaches into a private readline field that has changed between Node
 * versions, and a prompt that silently hangs is worse than no prompt.
 */
const askHidden = (question) =>
  new Promise((resolve) => {
    process.stdout.write(question)
    const stdin = process.stdin
    const wasRaw = Boolean(stdin.isRaw)
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding("utf8")

    let buf = ""
    const done = (value) => {
      stdin.removeListener("data", onData)
      stdin.setRawMode(wasRaw)
      stdin.pause()
      process.stdout.write("\n")
      resolve(value)
    }
    const onData = (chunk) => {
      for (const c of chunk) {
        if (c === "\r" || c === "\n" || c === "\u0004") return done(buf)
        if (c === "\u0003") { done(""); process.exit(130) }   // Ctrl-C
        if (c === "\u007f" || c === "\b") { buf = buf.slice(0, -1); continue }
        if (c >= " ") buf += c
      }
    }
    stdin.on("data", onData)
  })

const key = await askHidden("  Paste your 2Factor API key (input hidden), then press Enter: ")

if (!key) {
  bad("Nothing entered — no changes made.")
  process.exit(1)
}
if (/\s/.test(key)) {
  bad("That contains a space, so it is probably not just the key. No changes made.")
  process.exit(1)
}

say("  Checking it against your 2Factor account…")
let balance
try {
  const res = await fetch(`https://2factor.in/API/V1/${key}/BAL/SMS`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  })
  const body = await res.json()
  if (body.Status?.toLowerCase() !== "success") {
    // Report 2Factor's reason, but scrub the key in case it echoes the URL.
    const detail = String(body.Details ?? "unknown").split(key).join("<api-key>")
    bad(`2Factor rejected that key: ${detail}`)
    say("\n  Nothing was written. Check the key on your 2Factor dashboard and retry.\n")
    process.exit(1)
  }
  balance = JSON.stringify(body.Details)
} catch (err) {
  bad(`Could not reach 2Factor: ${err.message}`)
  say("\n  Nothing was written.\n")
  process.exit(1)
}
ok(`2Factor accepted the key. SMS balance: ${balance}`)

// Only touch the file once the key is known to work.
if (!existsSync(ENV)) writeFileSync(ENV, "")
copyFileSync(ENV, `${ENV}.bak-${Date.now()}`)
let text = readFileSync(ENV, "utf8")

const upsert = (name, value) => {
  const line = `${name}=${value}`
  const re = new RegExp(`^${name}=.*$`, "m")
  if (re.test(text)) {
    text = text.replace(re, line)
    return "updated"
  }
  text = `${text.replace(/\s*$/, "")}\n${line}\n`
  return "added"
}

ok(`TWOFACTOR_API_KEY ${upsert("TWOFACTOR_API_KEY", key)}`)

// The proof signature needs a secret too; generate one if it is missing.
if (/^OTP_SIGNING_SECRET=.+$/m.test(text)) {
  ok("OTP_SIGNING_SECRET already set — left alone")
} else {
  upsert("OTP_SIGNING_SECRET", randomBytes(32).toString("hex"))
  ok("OTP_SIGNING_SECRET generated")
}

writeFileSync(ENV, text)

say("\n  Written to .env.local (a timestamped backup was kept alongside it).")
say("  Restart the dev server for it to take effect — env files are read at boot:\n")
say("      npm run dev -- -p 4321\n")
