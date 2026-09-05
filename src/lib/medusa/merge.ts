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

  return {
    ...local,
    variants: [...variants, ...extra],
    inStock: remote.status === "published" && variants.some((v) => v.price !== null),
  }
}

/** Index Medusa products by handle for O(1) lookup against local slugs. */
export const byHandle = (products: MedusaProduct[]): Map<string, MedusaProduct> =>
  new Map(products.map((p) => [p.handle, p]))
