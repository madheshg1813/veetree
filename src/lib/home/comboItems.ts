import { COMBOS, type Combo } from "@/lib/catalog/combos"
import { type Product, type Variant } from "@/lib/catalog"

/**
 * Combo view models.
 *
 * Names and prices are resolved here, on the server, from the live catalogue —
 * so a renamed or repriced product shows through on the combo cards without
 * anyone editing combos.ts.
 */
export interface ComboItem {
  readonly slug: string
  readonly name: string
  readonly href: string
  readonly image: Combo["image"]
  /** Component names with their sizes, in the order the combo lists them. */
  readonly contents: readonly string[]
  /** What Add to Cart puts in the basket: the exact sizes the combo is built on. */
  readonly lines: readonly { readonly slug: string; readonly size: string }[]
  /** The bundle price — what the cart will charge. */
  readonly price: number | null
  /**
   * Sum of the components' original prices, struck through beside the bundle
   * price. Derived from the same MRPs the product pages show, so a combo and
   * its parts can never claim different savings.
   */
  readonly separately: number | null
  /** Whole-percent saving against `separately`. */
  readonly off: number | null
  /** False when a component is missing, unpriced or out of stock. */
  readonly buyable: boolean
}

export function toComboItem(combo: Combo, products: readonly Product[]): ComboItem {
  const bySlug = new Map(products.map((p) => [p.slug, p]))

  const parts = combo.components.map((c) => {
    const product = bySlug.get(c.slug)
    const variant: Variant | undefined = product?.variants.find((v) => v.size === c.size)
    return { product, variant }
  })

  const complete = parts.every(
    (x) => x.product?.inStock && x.variant && x.variant.price !== null
  )

  // The struck-through figure is the sum of the components' own originals,
  // falling back to a component's selling price where it has no MRP.
  const separately = complete
    ? parts.reduce((sum, x) => sum + (x.variant!.mrp ?? (x.variant!.price as number)), 0)
    : null

  const off =
    separately !== null && combo.price !== null && separately > combo.price
      ? Math.round((100 * (separately - combo.price)) / separately)
      : null

  return {
    slug: combo.slug,
    name: combo.name,
    href: `/combos#${combo.slug}`,
    image: combo.image,
    contents: parts.map((x, i) =>
      x.product ? `${x.product.name} ${combo.components[i]!.size}` : combo.components[i]!.slug
    ),
    lines: complete
      ? combo.components.map((c) => ({ slug: c.slug, size: c.size }))
      : [],
    price: combo.price,
    separately,
    off,
    buyable: complete && combo.price !== null,
  }
}

export const comboItems = (products: readonly Product[]): readonly ComboItem[] =>
  COMBOS.map((c) => toComboItem(c, products))
