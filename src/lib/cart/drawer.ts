"use client"

import { useSyncExternalStore } from "react"

/**
 * Whether the slide-in cart is open. Module-level so any button — the header
 * cart, Add to Cart on a card or a product page — can open it without the
 * drawer having to be its parent.
 */
let open = false
const listeners = new Set<() => void>()

const set = (next: boolean) => {
  if (open === next) return
  open = next
  listeners.forEach((l) => l())
}

export const openCartDrawer = () => set(true)
export const closeCartDrawer = () => set(false)

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

export const useCartDrawerOpen = () => useSyncExternalStore(subscribe, () => open, () => false)
