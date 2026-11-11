/**
 * Cart offers as the dashboard has them: the announcement strip, the
 * progress-bar milestones (free shipping, free gift) and the coupons shown to
 * shoppers under "View all coupons".
 *
 * Server-only. Read from the backend's /store/cart-offers so the client can
 * change them in the dashboard without a website release. When the backend
 * has no such route, or is down, everything comes back empty and the cart
 * simply shows no bar and no offer list.
 *
 * Expected shape (every field optional):
 *   {
 *     "announcement": "Diwali Sale: 20% OFF | Apply Code DIWALI20",
 *     "milestones": [
 *       { "amount": 699,  "label": "Free Shipping", "kind": "shipping" },
 *       { "amount": 1499, "label": "Freebie",       "kind": "gift" }
 *     ],
 *     "coupons": [
 *       { "code": "DIWALI20", "title": "20% off", "description": "On everything, this week only" }
 *     ]
 *   }
 * Amounts are rupees, compared with the cart value after any coupon discount.
 * Coupon codes must exist as promotions in Medusa; this list only decides which
 * of them are advertised. The discount itself is always Medusa's.
 */
if (typeof window !== "undefined") {
  throw new Error("src/lib/cart/offers.ts is server-only")
}

export type MilestoneKind = "shipping" | "gift"

export interface Milestone {
  readonly amount: number
  readonly label: string
  readonly kind: MilestoneKind
}

export interface PublicCoupon {
  readonly code: string
  readonly title: string
  readonly description: string
}

export interface CartOffers {
  readonly announcement: string | null
  readonly milestones: readonly Milestone[]
  readonly coupons: readonly PublicCoupon[]
}

export const NO_OFFERS: CartOffers = { announcement: null, milestones: [], coupons: [] }

const MAX_COUPONS = 10

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")

/**
 * Sample offers for seeing the cart's bar and coupons on a development machine
 * before the backend has any. Only with CART_OFFERS_DEMO=1, and never in a
 * production build, so it cannot leak onto the live site.
 */
export const demoOffers = () =>
  process.env.NODE_ENV !== "production" && process.env.CART_OFFERS_DEMO === "1"

const DEMO: CartOffers = {
  announcement: "Diwali Sale: 20% OFF | Apply Code DIWALI20",
  milestones: [
    { amount: 699, label: "Free Shipping", kind: "shipping" },
    { amount: 1499, label: "Freebie", kind: "gift" },
  ],
  coupons: [
    { code: "DIWALI20", title: "20% off everything", description: "Diwali sale, this week only" },
    { code: "FIRST100", title: "₹100 off your first order", description: "On orders above ₹999" },
  ],
}

/** What the sample coupons would take off a cart of this value. */
export const demoDiscount = (code: string, subtotal: number): number | null =>
  code === "DIWALI20" ? Math.round(subtotal * 0.2) : subtotal >= 999 ? 100 : null

export async function fetchCartOffers(): Promise<CartOffers> {
  if (demoOffers()) return DEMO
  const base = process.env.NEXT_PUBLIC_MEDUSA_URL?.trim()
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.trim()
  if (!base || !key) return NO_OFFERS

  try {
    const res = await fetch(`${base}/store/cart-offers`, {
      headers: { "x-publishable-api-key": key },
      next: { revalidate: 60 },
    })
    if (!res.ok) return NO_OFFERS
    const d = (await res.json()) as Record<string, unknown>

    const milestones = (Array.isArray(d.milestones) ? d.milestones : [])
      .map((m: Record<string, unknown>): Milestone | null => {
        const amount = Number(m?.amount)
        if (!Number.isFinite(amount) || amount <= 0) return null
        const kind: MilestoneKind = m?.kind === "shipping" ? "shipping" : "gift"
        return { amount, kind, label: text(m?.label, 30) || (kind === "shipping" ? "Free Shipping" : "Free Gift") }
      })
      .filter((m): m is Milestone => m !== null)
      .sort((a, b) => a.amount - b.amount)
      .slice(0, 3)

    const seen = new Set<string>()
    const coupons = (Array.isArray(d.coupons) ? d.coupons : [])
      .map((c: Record<string, unknown>): PublicCoupon | null => {
        const code = text(c?.code, 40)
        if (!code || seen.has(code.toUpperCase())) return null
        seen.add(code.toUpperCase())
        return { code, title: text(c?.title, 60), description: text(c?.description, 160) }
      })
      .filter((c): c is PublicCoupon => c !== null)
      .slice(0, MAX_COUPONS)

    return { announcement: text(d.announcement, 120) || null, milestones, coupons }
  } catch {
    return NO_OFFERS
  }
}
