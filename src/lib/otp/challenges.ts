/**
 * In-memory state for in-flight OTP challenges, plus the throttles that protect
 * the prepaid SMS balance.
 *
 * SCALING NOTE: this lives in the process. That is correct for a single
 * instance and wrong the moment the storefront runs more than one — two
 * replicas would each enforce half the limits and neither would find the
 * other's challenges. Moving to Redis means reimplementing this one file;
 * nothing outside it knows where the state is kept.
 */

import { randomBytes } from "node:crypto"
import { otpConfig } from "./config"

if (typeof window !== "undefined") {
  throw new Error("src/lib/otp/challenges.ts is server-only and must not be imported by client code")
}

interface Challenge {
  /** 2Factor's session id. Deliberately never sent to the browser. */
  readonly sessionId: string
  readonly phone: string
  readonly createdAt: number
  readonly expiresAt: number
  attempts: number
}

interface State {
  challenges: Map<string, Challenge>
  /** key -> send timestamps, for the sliding windows. */
  hits: Map<string, number[]>
  lastSweep: number
}

/**
 * Held on globalThis so a hot reload in development does not silently reset
 * every limit — which would make the throttles untestable locally.
 */
const globalRef = globalThis as typeof globalThis & { __veetreeOtp?: State }

const state: State = (globalRef.__veetreeOtp ??= {
  challenges: new Map(),
  hits: new Map(),
  lastSweep: 0,
})

const DAY = 86_400_000
const HOUR = 3_600_000
const WINDOW = 900_000 // 15 minutes

function sweep(now: number) {
  if (now - state.lastSweep < 60_000) return
  state.lastSweep = now

  for (const [id, c] of state.challenges) {
    if (c.expiresAt <= now) state.challenges.delete(id)
  }
  for (const [key, times] of state.hits) {
    const kept = times.filter((t) => now - t < DAY)
    if (kept.length === 0) state.hits.delete(key)
    else state.hits.set(key, kept)
  }
}

const countWithin = (key: string, window: number, now: number) =>
  (state.hits.get(key) ?? []).reduce((n, t) => (now - t < window ? n + 1 : n), 0)

const lastHit = (key: string) => {
  const times = state.hits.get(key)
  return times?.[times.length - 1] ?? 0
}

export type Allowance =
  | { allowed: true }
  | { allowed: false; reason: "cooldown" | "rate-limited" | "quota"; retryAfter: number }

/**
 * Decides whether one more message may be sent, before any money is spent.
 * Checks the cheapest and most user-explicable limit first so the message the
 * customer sees is the one that actually applies to them.
 */
export function checkAllowance(phone: string, ip: string): Allowance {
  const now = Date.now()
  sweep(now)

  const since = now - lastHit(`p:${phone}`)
  const cooldownMs = otpConfig().resendCooldown * 1000
  if (since < cooldownMs) {
    return { allowed: false, reason: "cooldown", retryAfter: Math.ceil((cooldownMs - since) / 1000) }
  }

  if (countWithin(`p:${phone}`, WINDOW, now) >= otpConfig().perPhonePerWindow) {
    return { allowed: false, reason: "rate-limited", retryAfter: Math.ceil(WINDOW / 1000) }
  }
  if (countWithin(`p:${phone}`, DAY, now) >= otpConfig().perPhonePerDay) {
    return { allowed: false, reason: "rate-limited", retryAfter: Math.ceil(HOUR / 1000) }
  }
  if (countWithin(`i:${ip}`, HOUR, now) >= otpConfig().perIpPerHour) {
    return { allowed: false, reason: "rate-limited", retryAfter: Math.ceil(HOUR / 1000) }
  }
  if (countWithin(`a:${ip}`, HOUR, now) >= otpConfig().attemptsPerIpPerHour) {
    return { allowed: false, reason: "rate-limited", retryAfter: Math.ceil(HOUR / 1000) }
  }
  if (countWithin("global", DAY, now) >= otpConfig().dailyCap) {
    return { allowed: false, reason: "quota", retryAfter: Math.ceil(HOUR / 1000) }
  }

  return { allowed: true }
}

/**
 * Records that a send was attempted, before we know whether it worked.
 *
 * Kept separate from `recordSend` on purpose: a provider outage must not eat
 * the customer's daily allowance, but it must not buy an attacker unlimited
 * retries either.
 */
export function recordAttemptFrom(ip: string) {
  const key = `a:${ip}`
  state.hits.set(key, [...(state.hits.get(key) ?? []), Date.now()])
}

/** Records a message that was actually sent. Call only after the send succeeds. */
export function recordSend(phone: string, ip: string) {
  const now = Date.now()
  for (const key of [`p:${phone}`, `i:${ip}`, "global"]) {
    state.hits.set(key, [...(state.hits.get(key) ?? []), now])
  }
}

/** Stores a live challenge and returns the opaque id the browser will hold. */
export function openChallenge(sessionId: string, phone: string): string {
  const id = randomBytes(18).toString("base64url")
  const now = Date.now()
  state.challenges.set(id, {
    sessionId,
    phone,
    createdAt: now,
    expiresAt: now + otpConfig().codeTtl * 1000,
    attempts: 0,
  })
  return id
}

export type Lookup =
  | { found: true; challenge: Challenge }
  | { found: false; reason: "expired" | "too-many-attempts" }

export function getChallenge(id: string): Lookup {
  const challenge = state.challenges.get(id)
  if (!challenge || challenge.expiresAt <= Date.now()) {
    if (challenge) state.challenges.delete(id)
    return { found: false, reason: "expired" }
  }
  if (challenge.attempts >= otpConfig().maxAttempts) {
    return { found: false, reason: "too-many-attempts" }
  }
  return { found: true, challenge }
}

/** Counts a wrong code. Returns how many tries remain. */
export function recordAttempt(id: string): number {
  const challenge = state.challenges.get(id)
  if (!challenge) return 0
  challenge.attempts += 1
  const left = Math.max(0, otpConfig().maxAttempts - challenge.attempts)
  if (left === 0) state.challenges.delete(id)
  return left
}

/** A challenge is single-use: consume it the moment it succeeds. */
export function closeChallenge(id: string) {
  state.challenges.delete(id)
}
