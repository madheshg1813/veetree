import { cookies } from "next/headers"

/**
 * The customer's Medusa token, kept in an httpOnly cookie.
 *
 * httpOnly so no script can read it, sameSite=lax so it survives a normal
 * navigation but not a cross-site POST, and secure outside development. The
 * browser never sees the token itself — the UI asks /api/account/me instead.
 */
const COOKIE = "veetree_customer"
const MAX_AGE = 60 * 60 * 24 * 30

export async function setSession(token: string) {
  const jar = await cookies()
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  })
}

export async function clearSession() {
  const jar = await cookies()
  jar.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 })
}

export async function sessionToken(): Promise<string | null> {
  const jar = await cookies()
  return jar.get(COOKIE)?.value || null
}
