import { NextResponse } from "next/server"
import { currentCustomer, loginCustomer, updatePassword } from "@/lib/account/medusa"
import { setSession } from "@/lib/account/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Same floor the sign-up form enforces, so the two cannot disagree. */
const MIN_PASSWORD = 8

/**
 * Finish a password reset.
 *
 * The token from the emailed link is the authorisation — Medusa reads the
 * customer out of it, so this route never needs to know whose account it is.
 * The token stays on the server: it arrives in the request body and is handed
 * straight to Medusa.
 *
 * On success the customer is signed in, so they land on their account rather
 * than being asked for the password they have just set.
 */
export async function POST(req: Request) {
  let body: { token?: string; password?: string; email?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  const token = (body.token ?? "").trim()
  const password = body.password ?? ""
  const email = (body.email ?? "").trim().toLowerCase()

  if (!token) {
    return NextResponse.json({ error: "This reset link is incomplete. Please request a new one." }, { status: 400 })
  }
  if (password.length < MIN_PASSWORD) {
    return NextResponse.json(
      { error: `Choose a password of at least ${MIN_PASSWORD} characters.` },
      { status: 400 }
    )
  }

  const result = await updatePassword(token, password)
  if (!result.ok) {
    const message =
      result.reason === "bad-token"
        ? "This reset link has expired or has already been used. Please request a new one."
        : result.reason === "weak"
          ? "That password was refused. Try a longer one."
          : "We could not change your password just now. Please try again."
    return NextResponse.json({ error: message }, { status: result.reason === "bad-token" ? 401 : 502 })
  }

  /*
   * Signing in is a convenience, not part of the reset: the password is
   * already changed by this point. If the link carried no email, or the login
   * fails for any reason, the reset still stands and the page says so.
   */
  if (email) {
    const login = await loginCustomer(email, password)
    if (login.ok) {
      await setSession(login.token)
      return NextResponse.json({ ok: true, signedIn: true, customer: await currentCustomer(login.token) })
    }
  }

  return NextResponse.json({ ok: true, signedIn: false })
}
