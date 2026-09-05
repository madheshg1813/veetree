/**
 * Proof that a phone number was verified.
 *
 * The browser cannot be the authority on "this number is verified" — anything
 * it reports can be edited. So on success the server issues a signed token
 * bound to that exact number and a short expiry, and whatever eventually places
 * the order re-checks the signature before it trusts the claim.
 */

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"
import { otpConfig } from "./config"

interface Payload {
  /** Normalised 10-digit number. */
  readonly p: string
  /** Expiry, epoch milliseconds. */
  readonly e: number
  /** Nonce, so two proofs for the same number are not byte-identical. */
  readonly n: string
}

const b64url = (buf: Buffer) => buf.toString("base64url")

const sign = (body: string, secret: string) =>
  b64url(createHmac("sha256", secret).update(body).digest())

/** Issues a proof for a number that has just passed verification. */
export function issueProof(phone: string): string {
  const secret = otpConfig().signingSecret
  if (!secret) throw new Error("OTP_SIGNING_SECRET is not set")

  const payload: Payload = {
    p: phone,
    e: Date.now() + otpConfig().proofTtl * 1000,
    n: randomBytes(9).toString("base64url"),
  }
  const body = b64url(Buffer.from(JSON.stringify(payload)))
  return `v1.${body}.${sign(body, secret)}`
}

export type ProofCheck =
  | { readonly valid: true; readonly phone: string }
  | { readonly valid: false; readonly reason: "malformed" | "bad-signature" | "expired" | "wrong-phone" }

/**
 * Checks a proof, optionally against the number the order is actually for.
 * Pass `expectedPhone` whenever you know it — a valid proof for a *different*
 * number is exactly the substitution this is meant to catch.
 */
export function checkProof(proof: string | null | undefined, expectedPhone?: string): ProofCheck {
  const secret = otpConfig().signingSecret
  if (!secret || !proof) return { valid: false, reason: "malformed" }

  const [version, body, mac] = proof.split(".")
  if (version !== "v1" || !body || !mac) return { valid: false, reason: "malformed" }

  const expected = Buffer.from(sign(body, secret))
  const given = Buffer.from(mac)
  // Compare in constant time, and only when the lengths already match —
  // timingSafeEqual throws on a length mismatch.
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return { valid: false, reason: "bad-signature" }
  }

  let payload: Payload
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Payload
  } catch {
    return { valid: false, reason: "malformed" }
  }

  if (typeof payload.p !== "string" || typeof payload.e !== "number") {
    return { valid: false, reason: "malformed" }
  }
  if (Date.now() > payload.e) return { valid: false, reason: "expired" }
  if (expectedPhone && expectedPhone !== payload.p) return { valid: false, reason: "wrong-phone" }

  return { valid: true, phone: payload.p }
}
