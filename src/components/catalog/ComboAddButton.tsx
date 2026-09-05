"use client"

import { useEffect, useRef, useState } from "react"
import { useCart } from "@/lib/cart/useCart"
import type { ComboItem } from "@/lib/home/comboItems"

/**
 * Add to Cart for a combo.
 *
 * A combo is not a catalogue product, and the cart resolves every line from the
 * catalogue — so this adds the combo's components, each at the size the combo
 * is costed on. The cart total therefore matches the price on the card exactly.
 *
 * Once Veetree sets bundle prices this should become a single combo line at the
 * discounted price; that needs the cart store to carry combos, which is worth
 * doing only when there is a real bundle price to charge.
 */
export function ComboAddButton({ item }: { item: ComboItem }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  if (!item.buyable) {
    return (
      <span className="combo__cta combo__cta--off" aria-disabled="true">
        Unavailable
      </span>
    )
  }

  const onAdd = () => {
    for (const line of item.lines) add(line.slug, line.size, 1)
    setAdded(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <button
      type="button"
      className={`combo__cta ${added ? "is-added" : ""}`}
      onClick={onAdd}
      aria-live="polite"
    >
      {added ? "Added to cart" : "Add to Cart"}
    </button>
  )
}
