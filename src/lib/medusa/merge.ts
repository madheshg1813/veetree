import type { Product, Variant } from "@/lib/catalog/types"
import type { MedusaProduct } from "./client"

/**
 * Overlays live Medusa data onto a local product definition.
 *
 * The local file stays the source of truth for editorial content — FAQs,
 * benefits, section copy, SEO — because none of that lives in Medusa. Medusa
 * owns the commercial facts: price, availability and sizes. That way Veetree
 * can change a price in the admin without a deploy, and we do not lose the
 * hand-written content by importing a thinner record over it.
 *
 * Anything Medusa does not know about is left exactly as the file has it.
 */
/**
 * Whether an image URL from Medusa can actually be served to a visitor.
 *
 * Medusa's default file provider writes URLs from the backend's own point of
 * view — `http://localhost:9000/static/…` — which resolves to nothing in a
 * customer's browser. Those records exist as soon as anyone uploads through
 * the dashboard before object storage is configured, so they are filtered out
 * here rather than rendered as broken images. Plain http is rejected too: the
 * storefront is https, and a mixed-content image is blocked anyway.
 */
export function usableImageUrl(url: string | null | undefined): url is string {
  if (!url) return false
  try {
    const { protocol, hostname } = new URL(url)
    if (protocol !== "https:") return false
    return !/^(localhost|127\.|0\.0\.0\.0|\[::1\]|.*\.local|.*\.internal)$/i.test(hostname)
  } catch {
    return false
  }
}

export function mergeProduct(local: Product, remote: MedusaProduct | undefined): Product {
  if (!remote) return local

  const variants: Variant[] = local.variants.map((v) => {
    const match = remote.variants.find(
      (rv) => (rv.title ?? "").trim().toLowerCase() === v.size.trim().toLowerCase()
    )
    const amount = match?.calculated_price?.calculated_amount
    return {
      ...v,
      sku: match?.sku ?? v.sku,
      // Only override when Medusa actually returns a number, so a missing
      // price never silently becomes free.
      price: typeof amount === "number" ? Math.round(amount) : v.price,
      stock:
        match?.manage_inventory === false
          ? null
          : typeof match?.inventory_quantity === "number"
            ? match.inventory_quantity
            : null,
      weightG: typeof match?.weight === "number" && match.weight > 0 ? match.weight : null,
    }
  })

  // Sizes Medusa has that the local file does not — a new variant added in
  // the admin shows up without a code change.
  const extra: Variant[] = remote.variants
    .filter(
      (rv) =>
        rv.title &&
        !local.variants.some(
          (v) => v.size.trim().toLowerCase() === rv.title!.trim().toLowerCase()
        )
    )
    .map((rv) => ({
      size: rv.title!,
      sku: rv.sku ?? `${local.slug}-${rv.title}`,
      price:
        typeof rv.calculated_price?.calculated_amount === "number"
          ? Math.round(rv.calculated_price.calculated_amount)
          : null,
    }))

  /**
   * Photography from the dashboard wins when it is there.
   *
   * The thumbnail leads, then any gallery images that are not already it —
   * Medusa keeps the two separately, and a product can have one without the
   * other. Dimensions are the square the rest of the catalogue uses; the
   * Cloudinary loader serves whatever the layout asks for, so these only set
   * the aspect ratio that reserves space before the image lands.
   */
  const remoteImages = [
    ...(remote.thumbnail ? [remote.thumbnail] : []),
    ...remote.images.map((i) => i.url).filter((url) => url !== remote.thumbnail),
  ]
    .filter(usableImageUrl)
    .map((src) => ({ src, alt: local.name, width: 1100, height: 1100 }))

  return {
    ...local,
    images: remoteImages.length ? remoteImages : local.images,
    variants: [...variants, ...extra],
    inStock: remote.status === "published" && variants.some((v) => v.price !== null),
  }
}

/** Index Medusa products by handle for O(1) lookup against local slugs. */
export const byHandle = (products: MedusaProduct[]): Map<string, MedusaProduct> =>
  new Map(products.map((p) => [p.handle, p]))
