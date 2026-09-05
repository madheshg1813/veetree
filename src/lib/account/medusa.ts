/**
 * Customer accounts, backed by Medusa.
 *
 * Accounts live in Medusa rather than in the storefront so they appear under
 * Customers in the admin dashboard and can be attached to real orders. The
 * storefront never stores a password — Medusa's emailpass provider hashes and
 * checks them.
 *
 * Server-only: the token these calls return is a bearer credential for the
 * customer's account and must never reach the browser except as an httpOnly
 * cookie.
 */
if (typeof window !== "undefined") {
  throw new Error("src/lib/account/medusa.ts is server-only and must not be imported by client code")
}

const TIMEOUT_MS = 15_000

const config = () => ({
  base: process.env.NEXT_PUBLIC_MEDUSA_URL?.trim() ?? "",
  key: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.trim() ?? "",
})

export const accountsEnabled = () => {
  const { base, key } = config()
  return Boolean(base && key)
}

async function call<T>(
  path: string,
  init: { method: string; body?: unknown; token?: string }
): Promise<{ status: number; data: T | null }> {
  const { base, key } = config()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(base + path, {
      method: init.method,
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": key,
        ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      signal: controller.signal,
      cache: "no-store",
    })
    const text = await res.text()
    let data: T | null = null
    try { data = text ? (JSON.parse(text) as T) : null } catch { data = null }
    return { status: res.status, data }
  } catch {
    return { status: 0, data: null }
  } finally {
    clearTimeout(timer)
  }
}

export interface Customer {
  readonly id: string
  readonly email: string
  readonly first_name: string | null
  readonly last_name: string | null
  readonly phone: string | null
}

/** True when Medusa already has an auth identity for this address. */
export async function emailTaken(email: string): Promise<boolean> {
  // Medusa gives no "does this exist" endpoint on purpose. Registering a
  // duplicate returns 401/409, which is the only honest signal available.
  const r = await call<{ token?: string }>("/auth/customer/emailpass/register", {
    method: "POST",
    body: { email, password: `probe-${Math.random().toString(36).slice(2)}Aa1!` },
  })
  return r.status === 401 || r.status === 409 || r.status === 422
}

export type RegisterResult =
  | { ok: true; token: string; customer: Customer }
  | { ok: false; reason: "exists" | "weak" | "unavailable" }

export async function registerCustomer(input: {
  email: string
  password: string
  firstName?: string
  lastName?: string
}): Promise<RegisterResult> {
  const reg = await call<{ token: string }>("/auth/customer/emailpass/register", {
    method: "POST",
    body: { email: input.email, password: input.password },
  })
  if (reg.status === 401 || reg.status === 409 || reg.status === 422) return { ok: false, reason: "exists" }
  if (reg.status !== 200 || !reg.data?.token) return { ok: false, reason: "unavailable" }

  const created = await call<{ customer: Customer }>("/store/customers", {
    method: "POST",
    token: reg.data.token,
    body: {
      email: input.email,
      first_name: input.firstName || undefined,
      last_name: input.lastName || undefined,
    },
  })
  if (created.status !== 200 || !created.data?.customer) return { ok: false, reason: "unavailable" }

  // The registration token predates the customer record; logging in afresh
  // returns one that carries the customer's identity.
  const login = await loginCustomer(input.email, input.password)
  if (!login.ok) return { ok: false, reason: "unavailable" }
  return { ok: true, token: login.token, customer: created.data.customer }
}

export type LoginResult =
  | { ok: true; token: string }
  | { ok: false; reason: "bad-credentials" | "unavailable" }

export async function loginCustomer(email: string, password: string): Promise<LoginResult> {
  const r = await call<{ token: string }>("/auth/customer/emailpass", {
    method: "POST",
    body: { email, password },
  })
  if (r.status === 401) return { ok: false, reason: "bad-credentials" }
  if (r.status !== 200 || !r.data?.token) return { ok: false, reason: "unavailable" }
  return { ok: true, token: r.data.token }
}

export async function currentCustomer(token: string): Promise<Customer | null> {
  const r = await call<{ customer: Customer }>("/store/customers/me", { method: "GET", token })
  return r.status === 200 ? (r.data?.customer ?? null) : null
}
