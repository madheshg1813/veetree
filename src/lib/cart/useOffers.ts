"use client"

import { useEffect, useState } from "react"

export interface Milestone {
  readonly amount: number
  readonly label: string
  readonly kind: "shipping" | "gift"
}

export interface Suggestion {
  readonly slug: string
  readonly name: string
  readonly size: string
  readonly price: number
  readonly mrp: number | null
  readonly image: string | null
  readonly href: string
}

export interface Offers {
  readonly announcement: string | null
  readonly milestones: readonly Milestone[]
  readonly coupons: readonly { code: string; title: string; description: string }[]
  readonly suggestions: readonly Suggestion[]
}

const EMPTY: Offers = { announcement: null, milestones: [], coupons: [], suggestions: [] }

let cached: Offers | null = null
let inFlight: Promise<Offers> | null = null

const load = () => {
  if (cached) return Promise.resolve(cached)
  inFlight ??= fetch("/api/cart/offers")
    .then((r) => (r.ok ? r.json() : EMPTY))
    .then((d: Partial<Offers>) => {
      cached = { ...EMPTY, ...d }
      return cached
    })
    .catch(() => EMPTY)
  return inFlight
}

/** The dashboard's cart offers, fetched once per page and shared. */
export function useOffers(): Offers {
  const [offers, setOffers] = useState<Offers>(cached ?? EMPTY)
  useEffect(() => {
    let cancelled = false
    load().then((o) => { if (!cancelled) setOffers(o) })
    return () => { cancelled = true }
  }, [])
  return offers
}

/** Whether the cart value reaches a free-shipping milestone. */
export const freeShippingReached = (offers: Offers, value: number) =>
  offers.milestones.some((m) => m.kind === "shipping" && value >= m.amount)
