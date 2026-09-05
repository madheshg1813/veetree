import { NextResponse } from "next/server"
import {
  closeChallenge,
  getChallenge,
  recordAttempt,
} from "@/lib/otp/challenges"
import { otpReadiness } from "@/lib/otp/config"
import { OTP_LENGTH, type VerifyResponse } from "@/lib/otp/contract"
import { issueProof } from "@/lib/otp/proof"
import { verifyOtp } from "@/lib/otp/twofactor"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const fail = (body: Extract<VerifyResponse, { ok: false }>, status: number) =>
  NextResponse.json<VerifyResponse>(body, { status })

export async function POST(req: Request) {
  const readiness = otpReadiness()
  if (!readiness.ready) {
    console.error(`[otp] verify refused — missing env: ${readiness.missing.join(", ")}`)
    return fail(
      { ok: false, reason: "disabled", message: "Mobile verification is not switched on yet." },
      503
    )
  }

  let challengeId = ""
  let code = ""
  try {
    const body = (await req.json()) as { challengeId?: unknown; code?: unknown }
    if (typeof body.challengeId === "string") challengeId = body.challengeId
    if (typeof body.code === "string") code = body.code.replace(/\D/g, "")
  } catch {
    /* handled by the guards below */
  }

  if (!challengeId || code.length !== OTP_LENGTH) {
    return fail(
      { ok: false, reason: "bad-code", message: `Enter the ${OTP_LENGTH}-digit code we sent you.` },
      400
    )
  }

  const lookup = getChallenge(challengeId)
  if (!lookup.found) {
    return fail(
      lookup.reason === "too-many-attempts"
        ? {
            ok: false,
            reason: "too-many-attempts",
            message: "Too many incorrect codes. Please request a new one.",
          }
        : {
            ok: false,
            reason: "expired",
            message: "That code has expired. Please request a new one.",
          },
      410
    )
  }

  const { challenge } = lookup
  const outcome = await verifyOtp(challenge.sessionId, code).catch((err: unknown) => {
    console.error("[otp] verify threw:", err instanceof Error ? err.message : err)
    return null
  })

  if (!outcome) {
    return fail(
      {
        ok: false,
        reason: "provider",
        message: "We could not check that code just now. Please try again in a moment.",
      },
      502
    )
  }

  if (!outcome.ok) {
    if (outcome.kind === "expired") {
      closeChallenge(challengeId)
      return fail(
        { ok: false, reason: "expired", message: "That code has expired. Please request a new one." },
        410
      )
    }
    if (outcome.kind === "unknown") {
      console.error(`[otp] 2Factor verify returned an unmapped error: ${outcome.detail}`)
    }
    const attemptsLeft = recordAttempt(challengeId)
    return fail(
      {
        ok: false,
        reason: attemptsLeft === 0 ? "too-many-attempts" : "mismatch",
        message:
          attemptsLeft === 0
            ? "Too many incorrect codes. Please request a new one."
            : `That code is not right. ${attemptsLeft} ${attemptsLeft === 1 ? "try" : "tries"} left.`,
        attemptsLeft,
      },
      400
    )
  }

  // Single use: the challenge is spent whether or not the customer goes on to
  // place the order, so a captured challenge id cannot be replayed.
  closeChallenge(challengeId)

  return NextResponse.json<VerifyResponse>(
    { ok: true, proof: issueProof(challenge.phone), phone: challenge.phone },
    { status: 200, headers: { "cache-control": "no-store" } }
  )
}
