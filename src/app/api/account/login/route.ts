import { NextResponse } from "next/server"
import { currentCustomer, loginCustomer } from "@/lib/account/medusa"
import { setSession } from "@/lib/account/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  let body: { email?: string; password?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  const email = (body.email ?? "").trim().toLowerCase()
  const password = body.password ?? ""
  if (!email || !password) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 })
  }

  const result = await loginCustomer(email, password)
  if (!result.ok) {
    // Deliberately the same message either way: distinguishing "no such
    // account" from "wrong password" tells an attacker which addresses exist.
    const message =
      result.reason === "bad-credentials"
        ? "That email and password do not match."
        : "Sign in is unavailable just now. Please try again."
    return NextResponse.json({ error: message }, { status: result.reason === "bad-credentials" ? 401 : 502 })
  }

  await setSession(result.token)
  return NextResponse.json({ ok: true, customer: await currentCustomer(result.token) })
}
