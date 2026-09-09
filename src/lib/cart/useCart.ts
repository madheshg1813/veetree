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
type ImageMap = Record<string, string>
interface Live {
  prices: PriceMap
  mrps: PriceMap
  /** Live photography, keyed the same way — a size's own, else the product's. */
  images: ImageMap
}

const EMPTY: Live = { prices: {}, mrps: {}, images: {} }

let cachedPrices: Live | null = null
let inFlight: Promise<Live> | null = null

function loadLivePrices() {
  if (cachedPrices) return Promise.resolve(cachedPrices)
  inFlight ??= fetch("/api/catalog/prices")
    .then((r) => (r.ok ? r.json() : EMPTY))
    .then((d: Partial<Live>) => {
      cachedPrices = {
        prices: d.prices ?? {},
        mrps: d.mrps ?? {},
        images: d.images ?? {},
      }
      return cachedPrices
    })
    .catch(() => EMPTY)
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

          /**
           * And the photograph, for the same reason as the price: a picture
           * replaced in the dashboard has to reach the cart and checkout too,
           * which read `product.images[0]`. Swapping it in here fixes both
           * pages at once and leaves them needing no knowledge of Medusa.
           */
          const liveImage = live?.images[key]
          const shown =
            liveImage && liveImage !== product.images[0]?.src
              ? {
                  ...product,
                  images: [
                    { src: liveImage, alt: product.images[0]?.alt ?? product.name, width: 1100, height: 1100 },
                    ...product.images,
                  ],
                }
              : product

          return { product: shown, variant: priced, qty: l.qty, lineTotal: price * l.qty }
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
