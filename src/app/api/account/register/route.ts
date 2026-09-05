import { NextResponse } from "next/server"
import { verifyCode } from "@/lib/account/otp"
import { registerCustomer } from "@/lib/account/medusa"
import { setSession } from "@/lib/account/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Creates the account — but only against a code this server issued.
 *
 * The code is verified here, server-side, not merely "in the UI". A client that
 * skipped the verification step would simply fail at this call.
 */
export async function POST(req: Request) {
  let body: { email?: string; password?: string; code?: string; firstName?: string; lastName?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  const email = (body.email ?? "").trim().toLowerCase()
  const password = body.password ?? ""
  const code = (body.code ?? "").trim()

  if (!email || !password || !code) {
    return NextResponse.json({ error: "Email, password and code are all required." }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Use at least 8 characters for your password." }, { status: 400 })
  }

  const verdict = verifyCode(email, code)
  if (verdict !== "ok") {
    const message = {
      wrong: "That code is not right.",
      expired: "That code has expired. Request a new one.",
      "too-many": "Too many attempts. Request a new code.",
    }[verdict]
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const result = await registerCustomer({
    email,
    password,
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
  })
  if (!result.ok) {
    const message =
      result.reason === "exists"
        ? "An account already exists for this address. Sign in instead."
        : "Could not create the account just now. Please try again."
    return NextResponse.json({ error: message }, { status: result.reason === "exists" ? 409 : 502 })
  }

  await setSession(result.token)
  return NextResponse.json({ ok: true, customer: result.customer })
}
