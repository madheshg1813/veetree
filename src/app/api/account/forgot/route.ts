import { NextResponse } from "next/server"
import { requestPasswordReset } from "@/lib/account/medusa"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Start a password reset.
 *
 * Always answers the same way when the request reaches Medusa, whether or not
 * the address has an account — the reply is the one thing an attacker could
 * use to harvest which of a list of addresses are registered here.
 */
export async function POST(req: Request) {
  let body: { email?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  const email = (body.email ?? "").trim().toLowerCase()
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter the email address on your account." }, { status: 400 })
  }

  const result = await requestPasswordReset(email)
  if (!result.ok) {
    return NextResponse.json(
      { error: "We could not start a reset just now. Please try again in a moment." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
