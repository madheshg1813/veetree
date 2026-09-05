import { getCollection } from "@/lib/catalog"
import type { Product, ProductImage, Slug, Variant } from "@/lib/catalog/types"
import type { MedusaProduct } from "./client"
import { usableImageUrl } from "./merge"

/**
 * Builds a storefront product out of a Medusa record alone.
 *
 * This is for products created in the dashboard, which have no local file
 * behind them. Everything Medusa knows is used; everything it does not — FAQs,
 * how-to steps, ingredient lists — is simply absent rather than invented, and
 * the page renders without those sections. A product added this way is
 * therefore thinner than a hand-written one, and that is the honest outcome:
 * the alternative is filling a page with copy nobody wrote.
 *
 * Add the matching file under `lib/catalog/products` later and it takes over,
 * since the local catalogue is merged first.
 */

/** Medusa's category handles map onto the five storefront collections. */
function routeFor(remote: MedusaProduct): Pick<Product, "category" | "collection"> {
  const handles = remote.categories.map((c) => c.handle)
  const parents = ["face-care", "hair-care", "body-care", "lip-care", "eye-care"] as const

  const parent = parents.find((p) => handles.includes(p))
  const sub = handles.find(
    (h) => !parents.includes(h as (typeof parents)[number]) && getCollection(h as Slug)
  )

  const parentCollection = parent ? getCollection(parent as Slug) : undefined
  const category = parentCollection
    ? { label: parentCollection.heading, href: `/collections/${parent}` }
    // No recognised category: point at the catalogue rather than a collection
    // page that would 404.
    : { label: "Shop", href: "/#collection" }

  const subCollection = sub ? getCollection(sub as Slug) : undefined
  const collection = subCollection
    ? { label: subCollection.heading, href: `/collections/${sub}` }
    : undefined

  return { category, collection }
}

export function productFromMedusa(remote: MedusaProduct): Product | null {
  if (remote.status !== "published" || !remote.handle) return null

  const variants: Variant[] = remote.variants
    .filter((v) => v.title)
    .map((v) => ({
      size: v.title!,
      sku: v.sku ?? `${remote.handle}-${v.title}`,
      price:
        typeof v.calculated_price?.calculated_amount === "number"
          ? Math.round(v.calculated_price.calculated_amount)
          : null,
      stock:
        v.manage_inventory === false
          ? null
          : typeof v.inventory_quantity === "number"
            ? v.inventory_quantity
            : null,
      weightG: typeof v.weight === "number" && v.weight > 0 ? v.weight : null,
    }))

  if (variants.length === 0) return null

  const images: ProductImage[] = [
    ...(remote.thumbnail ? [remote.thumbnail] : []),
    ...remote.images.map((i) => i.url).filter((url) => url !== remote.thumbnail),
  ]
    .filter(usableImageUrl)
    .map((src) => ({ src, alt: remote.title, width: 1100, height: 1100 }))

  const description = (remote.description ?? "").trim()
  const { category, collection } = routeFor(remote)

  return {
    slug: remote.handle as Slug,
    name: remote.title,
    brand: "Veetree",
    category,
    collection,
    variants,
    images,
    rating: null,
    badges: [],
    shortDescription: description,
    sections: description
      ? [{ id: "description", heading: "Product Description", defaultOpen: true, body: [description] }]
      : [],
    keyIngredients: [],
    fullIngredients: null,
    howToUse: [],
    faqs: [],
    related: [],
    seo: {
      title: `Veetree ${remote.title}`,
      description: description || `Veetree ${remote.title}.`,
      canonical: `/products/${remote.handle}`,
    },
    inStock: variants.some((v) => v.price !== null),
  }
}
