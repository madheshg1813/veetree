import { createHash, randomInt, timingSafeEqual } from "node:crypto"

/**
 * Email verification codes for first-time signup.
 *
 * Unlike the phone flow, which delegates generation and checking to 2Factor,
 * these codes are ours — so they are generated here, stored hashed, and
 * compared in constant time. A plain-text code sitting in memory is a code that
 * can leak through a heap dump or a stray log line.
 *
 * SCALING NOTE: this lives in the process, exactly like src/lib/otp/challenges.
 * Correct for a single instance, wrong the moment the storefront runs two —
 * each replica would hold half the codes and neither would find the other's.
 * Moving to Redis means reimplementing this one file.
 */
if (typeof window !== "undefined") {
  throw new Error("src/lib/account/otp.ts is server-only and must not be imported by client code")
}

const TTL_MS = 10 * 60 * 1000
const RESEND_COOLDOWN_MS = 45 * 1000
const MAX_ATTEMPTS = 5
const MAX_PER_EMAIL_PER_HOUR = 5
const MAX_PER_IP_PER_HOUR = 20
const HOUR_MS = 60 * 60 * 1000

interface Challenge {
  readonly hash: string
  readonly email: string
  readonly expiresAt: number
  readonly sentAt: number
  attempts: number
}

interface Store {
  challenges: Map<string, Challenge>
  sends: Map<string, number[]>
}

// On globalThis so a dev hot reload does not quietly reset every limit.
const g = globalThis as unknown as { __veetreeEmailOtp?: Store }
const store: Store = (g.__veetreeEmailOtp ??= { challenges: new Map(), sends: new Map() })

const norm = (email: string) => email.trim().toLowerCase()
const hash = (code: string, email: string) =>
  createHash("sha256").update(`${norm(email)}:${code}`).digest("hex")

function sweep(now: number) {
  for (const [k, c] of store.challenges) if (c.expiresAt <= now) store.challenges.delete(k)
  for (const [k, times] of store.sends) {
    const recent = times.filter((t) => now - t < HOUR_MS)
    if (recent.length) store.sends.set(k, recent)
    else store.sends.delete(k)
  }
}

const countWithin = (key: string, now: number) =>
  (store.sends.get(key) ?? []).filter((t) => now - t < HOUR_MS).length

export type Allowance =
  | { ok: true }
  | { ok: false; reason: "cooldown" | "email-limit" | "ip-limit"; retryAfter: number }

/** Checked before a code is generated, so a refused request costs nothing. */
export function checkAllowance(email: string, ip: string): Allowance {
  const now = Date.now()
  sweep(now)
  const key = norm(email)

  const existing = store.challenges.get(key)
  if (existing && now - existing.sentAt < RESEND_COOLDOWN_MS) {
    return {
      ok: false,
      reason: "cooldown",
      retryAfter: Math.ceil((RESEND_COOLDOWN_MS - (now - existing.sentAt)) / 1000),
    }
  }
  if (countWithin(`e:${key}`, now) >= MAX_PER_EMAIL_PER_HOUR) {
    return { ok: false, reason: "email-limit", retryAfter: 3600 }
  }
  if (countWithin(`i:${ip}`, now) >= MAX_PER_IP_PER_HOUR) {
    return { ok: false, reason: "ip-limit", retryAfter: 3600 }
  }
  return { ok: true }
}

/** Creates a code and records the send against both limits. */
export function issueCode(email: string, ip: string): string {
  const now = Date.now()
  const key = norm(email)
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0")

  store.challenges.set(key, {
    hash: hash(code, key),
    email: key,
    expiresAt: now + TTL_MS,
    sentAt: now,
    attempts: 0,
  })
  for (const k of [`e:${key}`, `i:${ip}`]) {
    store.sends.set(k, [...(store.sends.get(k) ?? []), now])
  }
  return code
}

export type Verdict = "ok" | "wrong" | "expired" | "too-many"

export function verifyCode(email: string, code: string): Verdict {
  const now = Date.now()
  sweep(now)
  const key = norm(email)
  const challenge = store.challenges.get(key)
  if (!challenge || challenge.expiresAt <= now) return "expired"
  if (challenge.attempts >= MAX_ATTEMPTS) {
    store.challenges.delete(key)
    return "too-many"
  }
  challenge.attempts += 1

  const a = Buffer.from(challenge.hash, "hex")
  const b = Buffer.from(hash(code.trim(), key), "hex")
  if (a.length !== b.length || !timingSafeEqual(a, b)) return "wrong"

  // Single use: a correct code must not be replayable.
  store.challenges.delete(key)
  return "ok"
}
