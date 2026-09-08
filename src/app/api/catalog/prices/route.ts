import { NextResponse } from "next/server"
import { liveProducts } from "@/lib/catalog/live"

export const runtime = "nodejs"
/** Matches the catalogue's own cache window, so a dashboard edit lands promptly. */
export const revalidate = 60

/**
 * Live prices, keyed "slug|size".
 *
 * The cart is a client component holding only slugs and sizes, so it cannot
 * reach Medusa itself. Without this it fell back to the prices compiled into
 * the catalogue files — which meant a price changed in the dashboard showed
 * correctly on the homepage and product page but not in the cart, while the
 * amount actually charged came from Medusa. Showing one price and charging
 * another is the worst possible version of that bug.
 */
export async function GET() {
  const products = await liveProducts()
  const prices: Record<string, number> = {}
  const mrps: Record<string, number> = {}

  for (const product of products) {
    for (const variant of product.variants) {
      const key = `${product.slug}|${variant.size}`
      if (typeof variant.price === "number") prices[key] = variant.price
      if (typeof variant.mrp === "number") mrps[key] = variant.mrp
    }
  }

  return NextResponse.json({ prices, mrps })
}
