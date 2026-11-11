import { NextResponse } from "next/server"
import { FEATURED_SLUGS } from "@/lib/catalog/featured"
import { liveProducts } from "@/lib/catalog/live"
import { fetchCartOffers } from "@/lib/cart/offers"
import { toShopItem } from "@/lib/home/shopItems"

export const runtime = "nodejs"
/** The same window as prices, so a dashboard edit reaches the cart promptly. */
export const revalidate = 60

/**
 * Everything the cart drawer shows besides the cart itself: the dashboard's
 * announcement, milestones and advertised coupons, and the products offered
 * under "You might also like" — bestsellers first, in stock and priced only.
 */
export async function GET() {
  const [offers, products] = await Promise.all([fetchCartOffers(), liveProducts()])
  const rank = new Map(FEATURED_SLUGS.map((slug, i) => [slug, i]))

  const suggestions = products
    .map(toShopItem)
    .filter((p) => p.inStock && p.price !== null && p.size !== null)
    .sort((a, b) => (rank.get(a.slug) ?? 999) - (rank.get(b.slug) ?? 999))
    .slice(0, 12)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      size: p.size,
      price: p.price,
      mrp: p.mrp,
      image: p.image?.src ?? null,
      href: p.href,
    }))

  return NextResponse.json({ ...offers, suggestions })
}
