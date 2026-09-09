import { NextResponse } from "next/server"
import { liveProducts } from "@/lib/catalog/live"

export const runtime = "nodejs"
/** Matches the catalogue's own cache window, so a dashboard edit lands promptly. */
export const revalidate = 60

/**
 * Live prices and photography, keyed "slug|size".
 *
 * The cart is a client component holding only slugs and sizes, so it cannot
 * reach Medusa itself. Without this it fell back to what is compiled into the
 * catalogue files — which meant a price changed in the dashboard showed
 * correctly on the homepage and product page but not in the cart, while the
 * amount actually charged came from Medusa. Showing one price and charging
 * another is the worst possible version of that bug.
 *
 * Images are here for the same reason and were the same bug one step behind:
 * a photograph replaced in the dashboard appeared everywhere except the cart
 * and checkout, which still showed the file shipped with the build. Those two
 * pages are the last thing a customer sees before paying, so the picture there
 * has to be the picture of what they are buying.
 */
export async function GET() {
  const products = await liveProducts()
  const prices: Record<string, number> = {}
  const mrps: Record<string, number> = {}
  const images: Record<string, string> = {}

  for (const product of products) {
    const productImage = product.images[0]?.src

    for (const variant of product.variants) {
      const key = `${product.slug}|${variant.size}`
      if (typeof variant.price === "number") prices[key] = variant.price
      if (typeof variant.mrp === "number") mrps[key] = variant.mrp

      // A size can carry its own photography in the dashboard; fall back to the
      // product's own, so every line has a picture either way.
      const image = variant.images?.[0] ?? productImage
      if (image) images[key] = image
    }
  }

  return NextResponse.json({ prices, mrps, images })
}
