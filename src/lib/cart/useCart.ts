"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
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

/**
 * Live prices from Medusa, keyed "slug|size".
 *
 * The catalogue files carry a price so the site works with no backend, but
 * those are only a fallback. Without this the cart showed the compiled-in
 * price while Medusa charged its own — a price edited in the dashboard
 * appeared on the homepage and the product page, but not here.
 *
 * Fetched once per mount and shared, since three components read the cart.
 */
type PriceMap = Record<string, number>
let cachedPrices: { prices: PriceMap; mrps: PriceMap } | null = null
let inFlight: Promise<{ prices: PriceMap; mrps: PriceMap }> | null = null

function loadLivePrices() {
  if (cachedPrices) return Promise.resolve(cachedPrices)
  inFlight ??= fetch("/api/catalog/prices")
    .then((r) => (r.ok ? r.json() : { prices: {}, mrps: {} }))
    .then((d: { prices?: PriceMap; mrps?: PriceMap }) => {
      cachedPrices = { prices: d.prices ?? {}, mrps: d.mrps ?? {} }
      return cachedPrices
    })
    .catch(() => ({ prices: {}, mrps: {} }))
  return inFlight
}

export function useCart() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const [live, setLive] = useState(cachedPrices)
  useEffect(() => {
    // No "already asked" guard here. Strict mode mounts, unmounts and remounts:
    // a guard makes the first run's result get discarded by its own cleanup
    // while the second run skips the fetch entirely, so `live` stays null for
    // ever and the cart silently falls back to the compiled-in price. The
    // module-level cache is what prevents a duplicate request.
    let cancelled = false
    loadLivePrices().then((p) => { if (!cancelled) setLive(p) })
    return () => { cancelled = true }
  }, [])

  const lines = useMemo<CartLine[]>(
    () =>
      stored
        .map((l): CartLine | null => {
          const product = getProduct(l.slug)
          const variant = product?.variants.find((v) => v.size === l.size)
          if (!product || !variant) return null

          // Medusa wins; the file price is the fallback for a backend outage.
          const key = `${l.slug}|${l.size}`
          const price = live?.prices[key] ?? variant.price
          if (typeof price !== "number") return null
          const mrp = live?.mrps[key] ?? variant.mrp

          const priced: Variant = { ...variant, price, ...(mrp === undefined ? {} : { mrp }) }
          return { product, variant: priced, qty: l.qty, lineTotal: price * l.qty }
        })
        .filter((l): l is CartLine => l !== null),
    [stored, live]
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
