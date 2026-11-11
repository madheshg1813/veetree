import { NextResponse } from "next/server"
import { demoDiscount, demoOffers, fetchCartOffers } from "@/lib/cart/offers"
import { getProduct } from "@/lib/catalog"
import type { Slug } from "@/lib/catalog/types"
import { checkoutEnabled, previewPromos } from "@/lib/checkout/medusaOrder"
import { parseOrderLines } from "@/lib/checkout/lines"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * The advertised coupons, each priced against this cart by Medusa — what
 * "Save ₹289 with DIWALI20" and "View all coupons" show. A coupon whose
 * conditions the cart does not meet comes back with a null discount.
 */
export async function POST(req: Request) {
  const { coupons } = await fetchCartOffers()
  if (coupons.length === 0 || !checkoutEnabled()) return NextResponse.json({ coupons: [] })

  let body: { lines?: unknown }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }
  const parsed = parseOrderLines(body.lines)
  if (!parsed.ok) return NextResponse.json({ coupons: coupons.map((c) => ({ ...c, discount: null })) })

  if (demoOffers()) {
    const subtotal = parsed.lines.reduce((sum, l) => {
      const v = getProduct(l.slug as Slug)?.variants.find((x) => x.size === l.size)
      return sum + (v?.price ?? 0) * l.qty
    }, 0)
    return NextResponse.json({ coupons: coupons.map((c) => ({ ...c, discount: demoDiscount(c.code, subtotal) })) })
  }

  const priced = await previewPromos(parsed.lines, coupons.map((c) => c.code))
  return NextResponse.json({
    coupons: coupons.map((c, i) => ({ ...c, discount: priced[i]?.discount ?? null })),
  })
}
