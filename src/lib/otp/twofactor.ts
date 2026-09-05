/**
 * Minimal client for 2Factor.in's SMS OTP API.
 *
 * 2Factor puts the API key in the URL path, which means a stray log line or a
 * thrown error carrying the URL would leak a spending credential. Every message
 * that leaves this module is therefore scrubbed through `redact`, and the raw
 * URL is never returned to a caller.
 *
 * The API answers with `{"Status":"Success"|"Error","Details":"..."}`. `Details`
 * carries the session id on send and a human string otherwise, so the mapping
 * below matches on substrings and treats anything unrecognised as a generic
 * provider failure rather than guessing.
 */

import { otpConfig } from "./config"

if (typeof window !== "undefined") {
  throw new Error("src/lib/otp/twofactor.ts is server-only and must not be imported by client code")
}

const BASE = "https://2factor.in/API/V1"
const TIMEOUT_MS = 10_000

/** Strips the API key out of any string before it can reach a log or a client. */
const redact = (text: string) => {
  const key = otpConfig().apiKey
  return key ? text.split(key).join("<api-key>") : text
}

interface Envelope {
  Status?: string
  Details?: unknown
}

async function call(path: string): Promise<Envelope> {
  const key = otpConfig().apiKey
  if (!key) throw new Error("TWOFACTOR_API_KEY is not set")

  let res: Response
  try {
    res = await fetch(`${BASE}/${key}/${path}`, {
      // OTP traffic must never be served from a cache, and Next.js caches
      // fetches by default in a server context.
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { accept: "application/json" },
    })
  } catch (err) {
    const reason = err instanceof Error ? err.message : "network error"
    throw new Error(`2Factor request failed: ${redact(reason)}`)
  }

  const text = await res.text()
  try {
    return JSON.parse(text) as Envelope
  } catch {
    throw new Error(`2Factor returned a non-JSON response (HTTP ${res.status})`)
  }
}

const details = (env: Envelope) => (typeof env.Details === "string" ? env.Details : "")
const succeeded = (env: Envelope) => env.Status?.toLowerCase() === "success"

export type SendOutcome =
  | { ok: true; sessionId: string }
  | { ok: false; kind: "balance" | "auth" | "phone" | "unknown"; detail: string }

/**
 * Asks 2Factor to generate and send a code. The generated code is never
 * returned to us — only a session id we later quote back to verify. That is
 * deliberate: a code this server never sees is a code this server cannot leak.
 */
export async function sendOtp(phoneWithCountryCode: string): Promise<SendOutcome> {
  const template = otpConfig().template
  const suffix = template ? `/${encodeURIComponent(template)}` : ""
  const env = await call(`SMS/${encodeURIComponent(phoneWithCountryCode)}/AUTOGEN${suffix}`)
  const detail = redact(details(env))

  if (succeeded(env) && detail) return { ok: true, sessionId: detail }

  const lower = detail.toLowerCase()
  const kind = lower.includes("balance")
    ? "balance"
    : lower.includes("api key") || lower.includes("apikey") || lower.includes("account")
      ? "auth"
      : lower.includes("phone") || lower.includes("mobile") || lower.includes("number")
        ? "phone"
        : "unknown"

  return { ok: false, kind, detail }
}

export type VerifyOutcome =
  | { ok: true }
  | { ok: false; kind: "mismatch" | "expired" | "unknown"; detail: string }

/** Checks a code against a session id. 2Factor expires sessions on its own side too. */
export async function verifyOtp(sessionId: string, code: string): Promise<VerifyOutcome> {
  const env = await call(
    `SMS/VERIFY/${encodeURIComponent(sessionId)}/${encodeURIComponent(code)}`
  )
  const detail = redact(details(env))

  if (succeeded(env)) return { ok: true }

  const lower = detail.toLowerCase()
  if (lower.includes("expire")) return { ok: false, kind: "expired", detail }
  if (lower.includes("mismatch") || lower.includes("not match") || lower.includes("invalid otp")) {
    return { ok: false, kind: "mismatch", detail }
  }
  return { ok: false, kind: "unknown", detail }
}

/** Reads the prepaid SMS balance. Used by the setup check, not by checkout. */
export async function smsBalance(): Promise<{ ok: boolean; detail: string }> {
  const env = await call("BAL/SMS")
  const raw = typeof env.Details === "string" ? env.Details : JSON.stringify(env.Details ?? null)
  return { ok: succeeded(env), detail: redact(raw) }
}
