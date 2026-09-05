import { NextResponse } from "next/server"
import { normalizePhone } from "@/lib/checkout/types"
import {
  checkAllowance,
  openChallenge,
  recordAttemptFrom,
  recordSend,
} from "@/lib/otp/challenges"
import { otpConfig, otpReadiness } from "@/lib/otp/config"
import { sendOtp } from "@/lib/otp/twofactor"
import type { SendResponse } from "@/lib/otp/contract"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Every request here can cost money, so the order of operations matters:
 * validate, then throttle, then spend. Nothing reaches 2Factor until the number
 * is well-formed and inside every limit.
 */

const clientIp = (req: Request) => {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]!.trim()
  return req.headers.get("x-real-ip")?.trim() || "unknown"
}

const fail = (body: Extract<SendResponse, { ok: false }>, status: number) =>
  NextResponse.json<SendResponse>(body, { status })

export async function POST(req: Request) {
  const readiness = otpReadiness()
  if (!readiness.ready) {
    console.error(`[otp] send refused — missing env: ${readiness.missing.join(", ")}`)
    return fail(
      {
        ok: false,
        reason: "disabled",
        message: "Mobile verification is not switched on yet.",
      },
      503
    )
  }

  let phone: string | null = null
  try {
    const body = (await req.json()) as unknown
    const raw = (body as { phone?: unknown })?.phone
    if (typeof raw === "string") phone = normalizePhone(raw)
  } catch {
    phone = null
  }

  if (!phone) {
    return fail(
      { ok: false, reason: "bad-phone", message: "Enter a valid 10-digit mobile number." },
      400
    )
  }

  const ip = clientIp(req)
  const allowance = checkAllowance(phone, ip)
  if (!allowance.allowed) {
    const message =
      allowance.reason === "cooldown"
        ? `Please wait ${allowance.retryAfter}s before asking for another code.`
        : allowance.reason === "quota"
          ? "We have sent as many codes as we can today. Please try again tomorrow."
          : "Too many codes requested for this number. Please try again later."
    return fail(
      { ok: false, reason: allowance.reason, message },
      allowance.reason === "quota" ? 503 : 429
    )
  }

  // Counted before the outbound call, so a failing provider cannot be used as
  // an amplifier: the attempt is charged to the IP even when no SMS results.
  recordAttemptFrom(ip)

  const outcome = await sendOtp(`+91${phone}`).catch((err: unknown) => {
    console.error("[otp] send threw:", err instanceof Error ? err.message : err)
    return null
  })

  if (!outcome || !outcome.ok) {
    // The operator needs the real reason; the customer needs a next step.
    if (outcome) console.error(`[otp] 2Factor refused (${outcome.kind}): ${outcome.detail}`)
    const message =
      outcome?.kind === "phone"
        ? "That number was rejected by our SMS provider. Please check it and try again."
        : "We could not send a code just now. Please try again in a moment."
    return fail({ ok: false, reason: "provider", message }, 502)
  }

  recordSend(phone, ip)
  const challengeId = openChallenge(outcome.sessionId, phone)

  return NextResponse.json<SendResponse>(
    {
      ok: true,
      challengeId,
      expiresIn: otpConfig().codeTtl,
      resendIn: otpConfig().resendCooldown,
      hint: phone.slice(-2),
    },
    // Belt and braces: this response is per-user and must never be cached.
    { status: 200, headers: { "cache-control": "no-store" } }
  )
}
