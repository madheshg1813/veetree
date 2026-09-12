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

export interface OrderLine {
  readonly id: string
  readonly title: string
  /** The storefront slug: Medusa's product handle is our slug. */
  readonly slug: string | null
  /** The storefront size: Medusa's variant title is our size. */
  readonly size: string | null
  readonly qty: number
  readonly unitPrice: number | null
  readonly thumbnail: string | null
}

/**
 * The couriers Veetree ships with, mirroring the list in the backend's
 * `src/lib/couriers.ts`. Kept here as names only: the storefront never chooses
 * a courier, it just has to print the one the dashboard recorded.
 */
const COURIER_NAMES: Record<string, string> = {
  st: "ST Courier",
  "india-post": "India Post",
  dtdc: "DTDC",
  franch: "Franch Express",
  thirupathi: "Thirupathi Courier",
}

export interface OrderSummary {
  readonly id: string
  /** The number a customer sees on their confirmation, e.g. #14. */
  readonly number: number | null
  readonly placedAt: string | null
  readonly total: number | null
  readonly status: string | null
  readonly fulfillment: string | null
  /** Set in the dashboard once the parcel is handed to the courier. */
  readonly courier: string | null
  readonly tracking: string | null
  readonly items: readonly OrderLine[]
}

interface RawLine {
  id?: string
  title?: string
  product_title?: string
  product_handle?: string | null
  variant_title?: string | null
  quantity?: number
  unit_price?: number
  thumbnail?: string | null
}

interface RawOrder {
  id?: string
  display_id?: number
  created_at?: string
  total?: number
  status?: string
  fulfillment_status?: string
  /** Where the dashboard records the courier and tracking number. */
  metadata?: Record<string, unknown> | null
  items?: RawLine[]
}

/**
 * A customer's past orders, newest first.
 *
 * Medusa is the record of what was actually bought and paid for, so the
 * storefront asks rather than keeping its own copy. Everything is narrowed to
 * the fields the account page shows — an order carries addresses, payment
 * collections and tax lines that have no business reaching the browser.
 */
export async function listOrders(token: string, limit = 20): Promise<readonly OrderSummary[]> {
  const r = await call<{ orders?: RawOrder[] }>(
    `/store/orders?limit=${limit}&order=-created_at`,
    { method: "GET", token }
  )
  if (r.status !== 200 || !r.data?.orders) return []

  return r.data.orders.map((o) => {
    const meta = o.metadata ?? {}
    const courierId = typeof meta.veetree_courier === "string" ? meta.veetree_courier : null
    const tracking = typeof meta.veetree_tracking === "string" ? meta.veetree_tracking : null

    return {
    id: o.id ?? "",
    number: typeof o.display_id === "number" ? o.display_id : null,
    placedAt: o.created_at ?? null,
    total: typeof o.total === "number" ? o.total : null,
    status: o.status ?? null,
    fulfillment: o.fulfillment_status ?? null,
    // The name, not the id — a customer has no use for "thirupathi". An
    // unrecognised id falls through as itself rather than disappearing.
    courier: courierId ? COURIER_NAMES[courierId] ?? courierId : null,
    tracking: tracking || null,
    items: (o.items ?? []).map((i) => ({
      id: i.id ?? "",
      title: i.product_title ?? i.title ?? "Item",
      slug: i.product_handle ?? null,
      size: i.variant_title ?? null,
      qty: typeof i.quantity === "number" ? i.quantity : 1,
      unitPrice: typeof i.unit_price === "number" ? i.unit_price : null,
      thumbnail: i.thumbnail ?? null,
    })),
    }
  })
}

export type ResetRequest = { ok: true } | { ok: false; reason: "unavailable" }

/**
 * Ask Medusa to issue a password reset token.
 *
 * Medusa answers 201 whether or not the address has an account, and never
 * returns the token — it emits `auth.password_reset` instead, which a
 * subscriber in the backend turns into an email. That is deliberate: a
 * response that differed would tell anyone which addresses are registered.
 * So this reports only whether the request was accepted.
 */
export async function requestPasswordReset(email: string): Promise<ResetRequest> {
  const r = await call<unknown>("/auth/customer/emailpass/reset-password", {
    method: "POST",
    body: { identifier: email },
  })
  // 201 is the documented success. Anything else means Medusa is unreachable
  // or refused the request, which is worth telling the customer about.
  return r.status === 201 || r.status === 200 ? { ok: true } : { ok: false, reason: "unavailable" }
}

export type PasswordUpdate =
  | { ok: true }
  | { ok: false; reason: "bad-token" | "weak" | "unavailable" }

/**
 * Set a new password using a reset token from the emailed link.
 *
 * The token is a short-lived JWT signed by Medusa; `update` reads the customer
 * identity out of it, so possession of a valid token is the authorisation. The
 * storefront never learns which account it belongs to, and does not need to.
 */
export async function updatePassword(token: string, password: string): Promise<PasswordUpdate> {
  const r = await call<{ success?: boolean }>("/auth/customer/emailpass/update", {
    method: "POST",
    token,
    body: { password },
  })
  if (r.status === 200 && r.data?.success) return { ok: true }
  if (r.status === 401 || r.status === 403) return { ok: false, reason: "bad-token" }
  if (r.status === 400 || r.status === 422) return { ok: false, reason: "weak" }
  return { ok: false, reason: "unavailable" }
}
