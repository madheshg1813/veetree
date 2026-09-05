import { NextResponse } from "next/server"
import { currentCustomer } from "@/lib/account/medusa"
import { clearSession, sessionToken } from "@/lib/account/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Who is signed in. The token never leaves the server; this is what the UI reads. */
export async function GET() {
  const token = await sessionToken()
  if (!token) return NextResponse.json({ customer: null })

  const customer = await currentCustomer(token)
  // An expired or revoked token should not leave a cookie that looks valid.
  if (!customer) await clearSession()
  return NextResponse.json({ customer })
}
