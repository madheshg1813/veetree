import { NextResponse } from "next/server"
import { checkAllowance, issueCode } from "@/lib/account/otp"
import { emailEnabled, sendEmail } from "@/lib/email/resend"
import { emailTaken } from "@/lib/account/medusa"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const clientIp = (req: Request) =>
  (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown"

/** Sends a six-digit code to an address that is signing up for the first time. */
export async function POST(req: Request) {
  let body: { email?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  // Shape first, configuration second: a mistyped address should be told so,
  // not handed "email is switched off".
  const email = (body.email ?? "").trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  if (!emailEnabled()) {
    return NextResponse.json(
      { error: "Email verification is not switched on yet." },
      { status: 503 }
    )
  }

  // Refuse before spending a send: an existing account should log in instead.
  if (await emailTaken(email)) {
    return NextResponse.json(
      { error: "An account already exists for this address. Sign in instead.", code: "exists" },
      { status: 409 }
    )
  }

  const allowance = checkAllowance(email, clientIp(req))
  if (!allowance.ok) {
    const message =
      allowance.reason === "cooldown"
        ? `Please wait ${allowance.retryAfter}s before requesting another code.`
        : "Too many codes requested. Try again later."
    return NextResponse.json({ error: message, retryAfter: allowance.retryAfter }, { status: 429 })
  }

  const code = issueCode(email, clientIp(req))
  const sent = await sendEmail(
    email,
    "Your Veetree verification code",
    `<div style="font-family:system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:420px">
       <p style="font-size:15px;color:#14190c">Your Veetree verification code is</p>
       <p style="font-size:30px;font-weight:700;letter-spacing:.18em;color:#283618;margin:14px 0">${code}</p>
       <p style="font-size:13px;color:#666">It expires in 10 minutes. If you did not ask to create an
       account, you can ignore this email.</p>
     </div>`,
    `Your Veetree verification code is ${code}. It expires in 10 minutes.`
  )

  if (!sent.ok) {
    return NextResponse.json(
      { error: "Could not send the code just now. Please try again." },
      { status: 502 }
    )
  }
  return NextResponse.json({ ok: true })
}
