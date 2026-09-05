"use client"

import { useMemo, useSyncExternalStore } from "react"
import { getProduct, type Product, type Slug, type Variant } from "@/lib/catalog"
import {
  addLine,
  clearLines,
  getServerSnapshot,
  getSnapshot,
  removeLine,
  setLineQty,
  subscribe,
} from "./store"

export interface CartLine {
  readonly product: Product
  readonly variant: Variant
  readonly qty: number
  /** price × qty. Variants without a price cannot reach the cart. */
  readonly lineTotal: number
}

export interface CartTotals {
  readonly itemCount: number
  readonly total: number
}

export function useCart() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const lines = useMemo<CartLine[]>(
    () =>
      stored
        .map((l) => {
          const product = getProduct(l.slug)
          const variant = product?.variants.find((v) => v.size === l.size)
          if (!product || !variant || variant.price === null) return null
          return { product, variant, qty: l.qty, lineTotal: variant.price * l.qty }
        })
        .filter((l): l is CartLine => l !== null),
    [stored]
  )

  const totals = useMemo<CartTotals>(
    () => ({
      itemCount: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.lineTotal, 0),
    }),
    [lines]
  )

  return {
    lines,
    totals,
    hydrated,
    add: (slug: Slug, size: string, qty = 1) => addLine(slug, size, qty),
    setQty: (slug: Slug, size: string, qty: number) => setLineQty(slug, size, qty),
    remove: (slug: Slug, size: string) => removeLine(slug, size),
    clear: clearLines,
  }
}

export { MAX_QTY } from "./store"
