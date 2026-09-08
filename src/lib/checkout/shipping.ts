import type { Variant } from "@/lib/catalog/types"

/**
 * Delivery charges.
 *
 * Two tiers by weight, two by destination — Tamil Nadu is Veetree's home state
 * and cheaper to reach than anywhere else.
 *
 * These figures are quoted to the customer at checkout, but the amount actually
 * charged comes from Medusa: the storefront picks the matching shipping option
 * and Medusa prices the cart. The two must therefore agree, so the option names
 * below are the contract between this file and the backend.
 */
export const SHIPPING = {
  tamilNadu: { upTo1Kg: 50, over1Kg: 99 },
  restOfIndia: { upTo1Kg: 99, over1Kg: 150 },
} as const

/**
 * Rates as the dashboard has them, overriding the constants above.
 *
 * The constants are only a fallback for when the backend cannot be reached —
 * the figures that count live on Medusa's shipping options, because those are
 * what price a cart. Quoting from anywhere else would let the number shown
 * drift from the number charged.
 */
export interface DeliveryRates {
  readonly tnLight: number
  readonly tnHeavy: number
  readonly inLight: number
  readonly inHeavy: number
  readonly breakG: number
  readonly packagingG: number
}

export const FALLBACK_RATES: DeliveryRates = {
  tnLight: SHIPPING.tamilNadu.upTo1Kg,
  tnHeavy: SHIPPING.tamilNadu.over1Kg,
  inLight: SHIPPING.restOfIndia.upTo1Kg,
  inHeavy: SHIPPING.restOfIndia.over1Kg,
  breakG: 1000,
  packagingG: 80,
}

/** The weight, in grams, above which the heavier rate applies. */
export const WEIGHT_BREAK_G = 1000

/**
 * Packaging added per unit on top of the net contents.
 *
 * A 100 ml bottle does not weigh 100 g in a courier's hands — there is glass or
 * PET, a cap, a label, a box and filler. This is the one number the tiers turn
 * on, so it is deliberately a single named constant rather than being buried in
 * a formula.
 *
 * It is only a fallback. Set a variant's weight in the Medusa dashboard and
 * that real figure is used instead, exactly like stock.
 */
export const PACKAGING_G = 80

/** Names of the shipping options as they exist in Medusa. */
export const SHIPPING_OPTION = {
  tnLight: "Tamil Nadu — up to 1 kg",
  tnHeavy: "Tamil Nadu — over 1 kg",
  inLight: "Rest of India — up to 1 kg",
  inHeavy: "Rest of India — over 1 kg",
} as const

/** Tamil Nadu, however the customer spelled it. */
export function isTamilNadu(state: string): boolean {
  return /^\s*tamil\s*-?\s*nadu\s*$/i.test(state)
}

/**
 * One unit's shipping weight in grams.
 *
 * Prefers the real weight from Medusa. Falls back to the pack size — every
 * variant is labelled in g or ml, and for these formulations a millilitre is
 * close enough to a gram — plus the packaging allowance.
 */
export function variantWeightG(variant: Variant, packagingG = PACKAGING_G): number {
  if (typeof variant.weightG === "number" && variant.weightG > 0) return variant.weightG

  const match = /(\d+(?:\.\d+)?)\s*(g|ml|kg|l)\b/i.exec(variant.size)
  if (!match) return packagingG

  const value = Number(match[1])
  const unit = match[2]!.toLowerCase()
  const net = unit === "kg" || unit === "l" ? value * 1000 : value
  return net + packagingG
}

export interface ShippingQuote {
  readonly fee: number
  readonly weightG: number
  readonly heavy: boolean
  readonly optionName: string
  /** False until a state has been chosen, so the summary can stay honest. */
  readonly known: boolean
}

/** What this order costs to deliver, given where it is going and what is in it. */
export function quoteShipping(
  lines: readonly { variant: Variant; qty: number }[],
  state: string,
  live: DeliveryRates = FALLBACK_RATES
): ShippingQuote {
  const weightG = lines.reduce(
    (sum, l) => sum + variantWeightG(l.variant, live.packagingG) * l.qty,
    0
  )
  const heavy = weightG > live.breakG
  const tn = isTamilNadu(state)

  return {
    fee: tn ? (heavy ? live.tnHeavy : live.tnLight) : heavy ? live.inHeavy : live.inLight,
    weightG,
    heavy,
    optionName: tn
      ? heavy ? SHIPPING_OPTION.tnHeavy : SHIPPING_OPTION.tnLight
      : heavy ? SHIPPING_OPTION.inHeavy : SHIPPING_OPTION.inLight,
    known: state.trim().length > 0,
  }
}
