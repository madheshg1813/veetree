/**
 * Placing an order in Medusa.
 *
 * Server-only. The browser never talks to Medusa's cart API directly, for two
 * reasons: the customer's bearer token lives in an httpOnly cookie and must
 * stay there, and the amount charged has to be computed from the catalogue
 * rather than accepted from the page. The client sends what the customer put
 * in their cart — slug, size and quantity — and nothing about money.
 */
import { getProduct } from "@/lib/catalog"
import type { Slug } from "@/lib/catalog/types"
import { quoteShipping } from "./shipping"
import type { DeliveryDetails } from "./types"

if (typeof window !== "undefined") {
  throw new Error("src/lib/checkout/medusaOrder.ts is server-only and must not be imported by client code")
}

const TIMEOUT_MS = 20_000

const config = () => ({
  base: process.env.NEXT_PUBLIC_MEDUSA_URL?.trim() ?? "",
  key: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.trim() ?? "",
  region: process.env.NEXT_PUBLIC_MEDUSA_REGION_ID?.trim() ?? "",
})

export const checkoutEnabled = () => {
  const { base, key, region } = config()
  return Boolean(base && key && region)
}

async function store<T>(
  path: string,
  init: { method: string; body?: unknown; token?: string }
): Promise<{ status: number; data: T | null; error: string | null }> {
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
    const error = res.ok ? null : `${res.status} ${text.slice(0, 200)}`
    return { status: res.status, data, error }
  } catch (err) {
    return { status: 0, data: null, error: err instanceof Error ? err.message : "network" }
  } finally {
    clearTimeout(timer)
  }
}

/** What the browser is allowed to say about the cart: what, and how many. */
export interface OrderLineInput {
  readonly slug: string
  readonly size: string
  readonly qty: number
}

interface RemoteVariant { id: string; title: string | null }
interface RemoteProduct { id: string; handle: string; variants: RemoteVariant[] }

/**
 * Resolves catalogue slug + size to a Medusa variant id, matching size against
 * variant title exactly as `mergeProduct` does — so what the customer was shown
 * and what they are charged for come from the same pairing rule.
 */
async function resolveVariants(
  lines: readonly OrderLineInput[]
): Promise<{ ok: true; items: { variant_id: string; quantity: number }[] } | { ok: false; error: string }> {
  const { region } = config()
  const q = new URLSearchParams({ limit: "200", fields: "id,handle,*variants", region_id: region })
  const res = await store<{ products: RemoteProduct[] }>(`/store/products?${q}`, { method: "GET" })
  if (!res.data?.products) return { ok: false, error: "catalogue unavailable" }

  const byHandle = new Map(res.data.products.map((p) => [p.handle, p]))
  const items: { variant_id: string; quantity: number }[] = []

  for (const line of lines) {
    const product = byHandle.get(line.slug)
    if (!product) return { ok: false, error: `"${line.slug}" is no longer available` }
    const variant = product.variants.find(
      (v) => (v.title ?? "").trim().toLowerCase() === line.size.trim().toLowerCase()
    )
    if (!variant) return { ok: false, error: `"${line.slug}" is not available in ${line.size}` }
    items.push({ variant_id: variant.id, quantity: line.qty })
  }
  return { ok: true, items }
}

interface Cart {
  id: string
  total: number
  currency_code: string
}

export interface StartedPayment {
  readonly cartId: string
  readonly razorpayOrderId: string
  /** Minor units, as Razorpay reports them — for display reconciliation only. */
  readonly amount: number
  readonly currency: string
}

export type StartResult =
  | { ok: true; payment: StartedPayment }
  | { ok: false; message: string }

/**
 * Builds a complete, payable cart: line items, addresses, a shipping method,
 * and a Razorpay order to pay against.
 */
export async function startPayment(input: {
  token: string
  email: string
  details: DeliveryDetails
  lines: readonly OrderLineInput[]
}): Promise<StartResult> {
  const { region } = config()
  const { token, email, details } = input

  const resolved = await resolveVariants(input.lines)
  if (!resolved.ok) return { ok: false, message: resolved.error }
  if (resolved.items.length === 0) return { ok: false, message: "Your cart is empty." }

  const created = await store<{ cart: Cart }>("/store/carts", {
    method: "POST",
    token,
    body: { region_id: region, email },
  })
  if (!created.data?.cart) return { ok: false, message: "Could not start your order. Please try again." }
  const cartId = created.data.cart.id

  for (const item of resolved.items) {
    const added = await store<{ cart: Cart }>(`/store/carts/${cartId}/line-items`, {
      method: "POST", token, body: item,
    })
    if (added.error) return { ok: false, message: "One of the items could not be added. Please try again." }
  }

  const [firstName, ...rest] = details.fullName.trim().split(/\s+/)
  const address = {
    first_name: firstName || details.fullName.trim(),
    last_name: rest.join(" ") || "",
    address_1: details.address1.trim(),
    address_2: details.address2.trim() || undefined,
    city: details.city.trim(),
    province: details.state.trim(),
    postal_code: details.pincode.replace(/\D/g, ""),
    country_code: "in",
    phone: details.phone.replace(/\D/g, "").slice(-10),
  }
  const addressed = await store<{ cart: Cart }>(`/store/carts/${cartId}`, {
    method: "POST", token, body: { shipping_address: address, billing_address: address },
  })
  if (addressed.error) return { ok: false, message: "That delivery address was not accepted. Please check it." }

  const options = await store<{ shipping_options: { id: string; name: string; amount: number }[] }>(
    `/store/shipping-options?cart_id=${cartId}`, { method: "GET", token }
  )
  const available = options.data?.shipping_options ?? []
  if (available.length === 0) return { ok: false, message: "We do not deliver to that PIN code yet." }

  /**
   * Pick the rate that matches the destination and the parcel weight, rather
   * than whatever Medusa happened to list first.
   *
   * The weight is computed here, on the server, from the resolved catalogue —
   * never from anything the browser sent — so the delivery charge cannot be
   * talked down by editing the request.
   */
  const quoteLines = input.lines.flatMap((line) => {
    const product = getProduct(line.slug as Slug)
    const variant = product?.variants.find(
      (v) => v.size.trim().toLowerCase() === line.size.trim().toLowerCase()
    )
    return variant ? [{ variant, qty: line.qty }] : []
  })
  const quote = quoteShipping(quoteLines, details.state)
  const option =
    available.find((o) => o.name === quote.optionName) ??
    // Falls back to the cheapest on offer rather than failing the order: a
    // missing rate is our configuration problem, not the customer's.
    available.reduce((cheapest, o) => (o.amount < cheapest.amount ? o : cheapest), available[0]!)

  const shipped = await store<{ cart: Cart }>(`/store/carts/${cartId}/shipping-methods`, {
    method: "POST", token, body: { option_id: option.id },
  })
  if (shipped.error) return { ok: false, message: "Delivery could not be arranged for that address." }

  const collection = await store<{ payment_collection: { id: string } }>("/store/payment-collections", {
    method: "POST", token, body: { cart_id: cartId },
  })
  const collectionId = collection.data?.payment_collection?.id
  if (!collectionId) return { ok: false, message: "Payment could not be set up. Nothing has been charged." }

  interface Session { id: string; provider_id: string; data: { razorpayOrder?: { id?: string; amount?: number; currency?: string } } }
  const session = await store<{ payment_collection: { payment_sessions: Session[] } }>(
    `/store/payment-collections/${collectionId}/payment-sessions`,
    { method: "POST", token, body: { provider_id: "pp_razorpay_razorpay" } }
  )
  const sessions = session.data?.payment_collection?.payment_sessions ?? []
  const razorpay = sessions.map((s) => s.data?.razorpayOrder).filter(Boolean).pop()
  if (!razorpay?.id) return { ok: false, message: "Payment could not be set up. Nothing has been charged." }

  return {
    ok: true,
    payment: {
      cartId,
      razorpayOrderId: razorpay.id,
      amount: razorpay.amount ?? 0,
      currency: razorpay.currency ?? "INR",
    },
  }
}

export type CompleteResult =
  | { ok: true; orderId: string; orderNumber: string }
  | { ok: false; message: string }

/**
 * Turns a paid cart into an order.
 *
 * Medusa authorises the payment session as part of this call, and the Razorpay
 * provider does that by asking Razorpay for the order's own status — so an
 * unpaid cart cannot be completed even if this endpoint is called directly.
 */
export async function completeOrder(cartId: string, token: string): Promise<CompleteResult> {
  interface Completed {
    type: "order" | "cart"
    order?: { id: string; display_id?: number | string }
    error?: { message?: string }
  }

  // Razorpay's browser callback fires the moment the payment succeeds, but
  // Medusa authorises by asking Razorpay for the order's status — and that can
  // still read "attempted" for a second or two afterwards. Retrying briefly
  // turns a timing artefact into a completed order instead of a frightening
  // message to somebody who has just been charged.
  let detail = ""
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, attempt * 1500))

    const res = await store<Completed>(`/store/carts/${cartId}/complete`, { method: "POST", token })
    if (res.data?.type === "order" && res.data.order) {
      const order = res.data.order
      return {
        ok: true,
        orderId: order.id,
        orderNumber: order.display_id ? `#${order.display_id}` : order.id,
      }
    }
    // Medusa answers 200 with type "cart" when it refuses to convert.
    detail = res.data?.error?.message ?? res.error ?? ""
  }

  console.warn("[checkout] completion refused after retries:", detail.slice(0, 200))
  return {
    ok: false,
    message:
      "Your payment went through but the order did not finish recording. Please contact us with your payment reference — you will not be charged twice.",
  }
}
