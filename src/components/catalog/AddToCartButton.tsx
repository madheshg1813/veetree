"use client"

import { useEffect, useRef, useState } from "react"
import { useCart } from "@/lib/cart/useCart"

/**
 * Add to cart, from a product card.
 *
 * Its own component so the cards around it stay server-rendered: only this
 * button needs the cart, and a card list ships one small island rather than
 * becoming a client component wholesale.
 *
 * A product with more than one size adds the cheapest, which is the size the
 * card already quotes — so the price on the card is the price in the basket.
 * The button does not name that size: it made the label long and uneven
 * between cards, and the cart shows the size on every line anyway.
 */
export function AddToCartButton({
  slug,
  size,
  inStock,
}: {
  slug: string
  size: string | null
  inStock: boolean
}) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  if (!inStock || !size) {
    return (
      <span className="scard__add scard__add--off" aria-disabled="true">
        {inStock ? "Unavailable" : "Out of stock"}
      </span>
    )
  }

  const onAdd = () => {
    add(slug, size, 1)
    setAdded(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <button
      type="button"
      className={`scard__add ${added ? "is-added" : ""}`}
      onClick={onAdd}
      aria-live="polite"
    >
      {added ? "Added" : "Add to cart"}
    </button>
  )
}
