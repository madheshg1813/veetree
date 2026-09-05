import type { Product, Variant } from "./types"

/** Money is whole rupees as integers — never floats. */
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export const formatPrice = (amount: number): string => inr.format(amount)

/** The variant shown by default: the first that has a price, else the first. */
export function defaultVariant(product: Product): Variant {
  return product.variants.find((v) => v.price !== null) ?? product.variants[0]!
}

/** True when at least one variant can actually be bought. */
export const isPurchasable = (product: Product): boolean =>
  product.variants.some((v) => v.price !== null)

/**
 * The cheapest priced variant — the one a card quotes, so its MRP is the one a
 * card must strike through. Returns null when nothing is priced.
 */
export function cheapestVariant(product: Product): Variant | null {
  const priced = product.variants.filter((v) => v.price !== null)
  if (priced.length === 0) return null
  return priced.reduce((a, b) => ((b.price as number) < (a.price as number) ? b : a))
}

/** Lowest and highest priced variants, or null when nothing is priced. */
export function priceRange(product: Product): { min: number; max: number } | null {
  const prices = product.variants
    .map((v) => v.price)
    .filter((p): p is number => p !== null)
  if (prices.length === 0) return null
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

/** Whole-number percentage off, or null when there is no genuine MRP above price. */
export function discountPercent(variant: Variant): number | null {
  const { mrp, price } = variant
  if (!mrp || price === null || mrp <= price) return null
  return Math.round(((mrp - price) / mrp) * 100)
}
