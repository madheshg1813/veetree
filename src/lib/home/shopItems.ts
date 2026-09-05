import { discountPercent, priceRange, type Product } from "@/lib/catalog"
import { FEATURED_SLUGS } from "@/lib/catalog/featured"

/**
 * Homepage view models.
 *
 * The bestsellers grid and the search box are client components, so they can
 * only be handed data that is worth sending over the wire. A whole Product
 * carries its FAQs, full ingredient list and every info section — roughly 4 KB
 * each — so these narrow shapes exist to keep the homepage payload small.
 */

/** The five category tabs, labelled as the client's layout names them. */
export const HOME_TABS = [
  { slug: "face-care", label: "Face" },
  { slug: "hair-care", label: "Hair" },
  { slug: "body-care", label: "Body" },
  { slug: "lip-care", label: "Lips" },
  { slug: "eye-care", label: "Eyes" },
] as const

export type HomeTab = (typeof HOME_TABS)[number]

export interface ShopItem {
  readonly slug: string
  readonly name: string
  readonly brand: string
  readonly href: string
  readonly categoryLabel: string
  readonly image: {
    readonly src: string
    readonly alt: string
    readonly width: number
    readonly height: number
  } | null
  /** The one-line description shown on a card, from the product sheet. */
  readonly blurb: string
  /** The size "Add to cart" puts in the basket — the cheapest priced one. */
  readonly size: string | null
  readonly price: number | null
  /** Printed MRP of the quoted size, struck through beside the price. */
  readonly mrp: number | null
  /** Whole-percent saving against the MRP, or null when there is none. */
  readonly off: number | null
  /** true when larger sizes cost more, so the price reads "from ₹x". */
  readonly priceFrom: boolean
  /** null for every product today: no star ratings have been collected. */
  readonly rating: { readonly value: number; readonly count: number } | null
  readonly inStock: boolean
}

const categorySlug = (product: Product) => product.category.href.replace("/collections/", "")

export function toShopItem(product: Product): ShopItem {
  const priced = product.variants.filter((v) => v.price !== null)
  const cheapest = priced.length
    ? priced.reduce((a, b) => ((b.price as number) < (a.price as number) ? b : a))
    : null
  const range = priceRange(product)

  return {
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    href: `/products/${product.slug}`,
    categoryLabel: product.category.label,
    image: product.images[0] ?? null,
    // The card wants the one-liner; shortDescription is the product page's
    // fuller paragraph and clamped to an unhelpful three lines at this size.
    blurb: product.tagline ?? product.shortDescription,
    size: cheapest?.size ?? null,
    price: cheapest?.price ?? null,
    mrp: cheapest?.mrp ?? null,
    off: cheapest ? discountPercent(cheapest) : null,
    priceFrom: range !== null && range.min !== range.max,
    rating: product.rating,
    inStock: product.inStock,
  }
}

/**
 * Bestsellers per category tab.
 *
 * Ordered by the curated FEATURED_SLUGS list first, then the rest of the
 * category in catalogue order — filtering the featured eight by category alone
 * would leave the Eyes tab empty and Body and Lips with one card each.
 */
export function bestSellersByTab(
  products: readonly Product[],
  perTab = 4
): Record<string, readonly ShopItem[]> {
  const rank = new Map(FEATURED_SLUGS.map((slug, i) => [slug, i]))

  return Object.fromEntries(
    HOME_TABS.map((tab) => [
      tab.slug,
      products
        .filter((p) => categorySlug(p) === tab.slug)
        .sort(
          (a, b) =>
            (rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
            (rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER)
        )
        .slice(0, perTab)
        .map(toShopItem),
    ])
  )
}

/** What the search box needs: enough to match on, and a thumbnail to show. */
export interface SearchItem {
  readonly slug: string
  readonly name: string
  readonly href: string
  readonly categoryLabel: string
  readonly thumb: string | null
}

export const searchIndex = (products: readonly Product[]): readonly SearchItem[] =>
  products.map((p) => ({
    slug: p.slug,
    name: p.name,
    href: `/products/${p.slug}`,
    categoryLabel: (p.collection ?? p.category).label,
    thumb: p.images[0]?.src ?? null,
  }))
