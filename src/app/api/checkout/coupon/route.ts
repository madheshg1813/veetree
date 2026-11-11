import { NextResponse } from "next/server"
import { checkoutEnabled, previewPromo } from "@/lib/checkout/medusaOrder"
import { parseOrderLines } from "@/lib/checkout/lines"
import { demoDiscount, demoOffers } from "@/lib/cart/offers"
import { getProduct } from "@/lib/catalog"
import type { Slug } from "@/lib/catalog/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Checks a discount code against what is in the cart and says how much it
 * takes off, for the cart and the order summary.
 *
 * Open to signed-out shoppers, since signing in is asked for only at Pay now.
 * The figure shown here is a preview: the code is applied again to the real
 * cart when the order is started, and that cart's total is what Razorpay
 * charges — so nothing sent to this route can lower a price.
 */
export async function POST(req: Request) {
  if (!checkoutEnabled()) {
    return NextResponse.json({ error: "Online ordering is not switched on yet." }, { status: 503 })
  }

  let body: { code?: unknown; lines?: unknown }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  const parsed = parseOrderLines(body.lines)
  if (!parsed.ok) return NextResponse.json({ error: parsed.message }, { status: 400 })

  const subtotal = parsed.lines.reduce((sum, l) => {
    const v = getProduct(l.slug as Slug)?.variants.find((x) => x.size === l.size)
    return sum + (v?.price ?? 0) * l.qty
  }, 0)
  const result = await previewPromo(
    parsed.lines,
    typeof body.code === "string" ? body.code : "",
    demoOffers() ? (code) => (code === "DIWALI20" || code === "FIRST100" ? demoDiscount(code, subtotal) : null) : undefined
  )
  if (!result.ok) return NextResponse.json({ error: result.message }, { status: 422 })
  return NextResponse.json({ code: result.code, discount: result.discount })
}
