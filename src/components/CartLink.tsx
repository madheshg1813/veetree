"use client"

import Link from "next/link"
import { openCartDrawer } from "@/lib/cart/drawer"
import { useCart } from "@/lib/cart/useCart"

/**
 * Header cart link. Opens the slide-in cart; the /cart href stays for a new
 * tab or a page without JavaScript. The count only renders once storage has
 * been read.
 */
export function CartLink() {
  const { totals, hydrated } = useCart()
  const count = totals.itemCount

  return (
    <Link
      className="cartlink"
      href="/cart"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        openCartDrawer()
      }}
      aria-label={
        hydrated && count > 0 ? `Cart, ${count} ${count === 1 ? "item" : "items"}` : "Cart"
      }
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5h2.2l2 10.2a1.6 1.6 0 0 0 1.6 1.3h7.6a1.6 1.6 0 0 0 1.6-1.25L20.5 8H7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.4" fill="currentColor" />
        <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
      </svg>
      {hydrated && count > 0 ? <span className="cartlink__count">{count}</span> : null}
    </Link>
  )
}
