"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { checkCoupon } from "@/lib/checkout/submitOrder"
import type { CartLine } from "./useCart"

/**
 * The discount code the shopper applied, shared by the cart drawer and the
 * checkout so a code applied in the cart is still there at Pay now.
 *
 * Kept in localStorage with the cart it belongs to. The discount figure is
 * only ever a preview from Medusa; it is checked again whenever the cart
 * changes and once more, on the real order, at Pay now.
 */
export interface AppliedCoupon {
  readonly code: string
  readonly discount: number
}

const KEY = "veetree.coupon.v1"
const listeners = new Set<() => void>()
let cache: AppliedCoupon | null = null
let loaded = false

function read(): AppliedCoupon | null {
  try {
    const d = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as AppliedCoupon | null
    return d && typeof d.code === "string" && Number.isFinite(d.discount) ? d : null
  } catch {
    return null
  }
}

const snapshot = () => {
  if (!loaded && typeof window !== "undefined") { cache = read(); loaded = true }
  return cache
}

export function setCoupon(next: AppliedCoupon | null) {
  cache = next
  loaded = true
  try {
    if (next) window.localStorage.setItem(KEY, JSON.stringify(next))
    else window.localStorage.removeItem(KEY)
  } catch { /* storage unavailable: the code still holds for this page */ }
  listeners.forEach((l) => l())
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

/** A string that changes whenever what is in the cart changes. */
export const cartKey = (lines: readonly CartLine[]) =>
  lines.map((l) => `${l.product.slug}:${l.variant.size}:${l.qty}`).join("|")

/**
 * The applied coupon plus apply/remove, with this component's own busy and
 * error state. `watch` re-checks the code whenever the cart changes; only the
 * view on screen should pass true, so two mounted views do not both ask.
 */
export function useCoupon(lines: readonly CartLine[], watch: boolean) {
  const coupon = useSyncExternalStore(subscribe, snapshot, () => null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const apply = async (raw: string): Promise<boolean> => {
    const code = raw.trim()
    if (!code) { setError("Enter a discount code."); return false }
    setBusy(true)
    setError(null)
    const outcome = await checkCoupon(code, lines)
    setBusy(false)
    if (outcome.ok) {
      setCoupon({ code: outcome.code, discount: outcome.discount })
      return true
    }
    setCoupon(null)
    setError(outcome.message)
    return false
  }

  const remove = () => { setCoupon(null); setError(null) }

  const key = cartKey(lines)
  const applied = coupon?.code
  useEffect(() => {
    if (!watch || !applied) return
    if (lines.length === 0) { setCoupon(null); return }
    // Quietly, without the busy state: the shopper did not ask for this check.
    let cancelled = false
    void checkCoupon(applied, lines).then((outcome) => {
      if (cancelled) return
      if (outcome.ok) setCoupon({ code: outcome.code, discount: outcome.discount })
      else { setCoupon(null); setError(`${applied} was removed: ${outcome.message}`) }
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-check on cart contents only
  }, [key, watch])

  return { coupon, error, busy, apply, remove, clearError: () => setError(null) }
}
