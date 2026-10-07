import type { Product, Variant } from "./types"

/** Money is whole rupees as integers — never floats. */
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export const formatPrice = (amount: number): string => inr.format(amount)

/**
 * The MRP struck through beside a price: 20% above it, to the nearest ₹10.
 *
 * Derived rather than stored so a price changed in the dashboard carries its
 * MRP with it. When MRP was a second number kept in the product files, raising
 * a price in the dashboard quietly shrank the discount, or put the price above
 * its own MRP and dropped the discount altogether.
 */
export const mrpFor = (price: number): number => Math.round((price * 1.2) / 10) * 10

/** "15 ml — ₹289" for each size, from whatever the variants are priced at now. */
export const sizeBullets = (variants: readonly Variant[]): string[] =>
  variants.map(
    (v) => `${v.size} — ${v.price !== null ? formatPrice(v.price) : "price on request"}`
  )

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
