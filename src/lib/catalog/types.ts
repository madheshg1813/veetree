/**
 * Catalogue types.
 *
 * Every page under /products and /collections renders from these shapes, so
 * adding a product is a data file — never a new template.
 *
 * Product facts come from the founder's product sheet. Fields that would be a
 * claim we cannot support (ratings, MRP, certifications) are nullable on
 * purpose: when absent the UI omits the element and the structured data leaves
 * the property out, rather than inventing a value.
 */

export type Slug = string

export interface Variant {
  /** As printed on the label, e.g. "20 ml", "100 g". */
  readonly size: string
  readonly sku: string
  /** Whole rupees. null when the price has not been set yet. */
  readonly price: number | null
  /**
   * Maximum retail price, for a struck-through comparison.
   * Absent throughout: the product sheet lists one price per size, so there
   * is no basis for showing a discount.
   */
  readonly mrp?: number
  /**
   * Units on hand, from Medusa. null when the backend is unreachable or the
   * variant does not manage inventory — never guessed, so "out of stock" is
   * only ever shown because Medusa said zero.
   */
  readonly stock?: number | null
  /**
   * Shipping weight in grams, from Medusa. null when unset — the delivery
   * quote then estimates from the pack size. See `variantWeightG`.
   */
  readonly weightG?: number | null
}

/** Only ever render a rating that comes from real collected reviews. */
export interface Rating {
  readonly value: number
  readonly count: number
}

export interface Badge {
  readonly label: string
  readonly title?: string
}

export interface KeyIngredient {
  readonly name: string
  readonly note: string
}

export interface HowToUseStep {
  readonly title: string
  readonly detail: string
}

export interface Faq {
  readonly q: string
  readonly a: string
}

export interface InfoSection {
  readonly id: string
  readonly heading: string
  readonly body?: readonly string[]
  readonly bullets?: readonly string[]
  readonly defaultOpen?: boolean
}

export interface Seo {
  readonly title: string
  readonly description: string
  /** Path only, e.g. "/products/kumkumadi-serum". */
  readonly canonical: string
}

export interface ProductImage {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export interface Product {
  readonly slug: Slug
  /** Exact product name. The H1 is `${brand} ${name}`, never a keyword phrase. */
  readonly name: string
  readonly brand: string
  readonly category: { readonly label: string; readonly href: string }
  /** Type-level collection. Omitted when none applies, so breadcrumbs don't repeat the parent. */
  readonly collection?: { readonly label: string; readonly href: string }

  /** At least one. More than one renders a size selector. */
  readonly variants: readonly Variant[]

  /** May be empty — photography is still outstanding for some products. */
  readonly images: readonly ProductImage[]

  /** null until real reviews exist. Never seed this. */
  readonly rating: Rating | null

  readonly badges: readonly Badge[]
  /**
   * One line, for cards and listings — the founder's own wording from the
   * product sheet. `shortDescription` is the fuller paragraph the product page
   * uses; at card size that ran to three clamped lines and told a browsing
   * customer very little.
   */
  readonly tagline?: string
  readonly shortDescription: string
  readonly sections: readonly InfoSection[]
  readonly keyIngredients: readonly KeyIngredient[]
  readonly fullIngredients: readonly string[] | null
  readonly howToUse: readonly HowToUseStep[]
  readonly faqs: readonly Faq[]

  readonly related: readonly Slug[]
  readonly seo: Seo
  readonly inStock: boolean
}

export interface CollectionSection {
  readonly heading: string
  readonly body: readonly string[]
}

export interface RelatedLink {
  readonly label: string
  readonly href: string
  readonly note?: string
}

export interface Collection {
  readonly slug: Slug
  /** The H1 — the broad category term this page owns. */
  readonly heading: string
  readonly breadcrumbs: readonly { readonly label: string; readonly href: string }[]
  readonly productSlugs: readonly Slug[]
  readonly sections: readonly CollectionSection[]
  readonly faqs: readonly Faq[]
  readonly relatedLinks: readonly RelatedLink[]
  readonly seo: Seo
}
