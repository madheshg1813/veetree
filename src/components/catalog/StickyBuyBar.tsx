"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { defaultVariant, formatPrice, type Product } from "@/lib/catalog"
import { useCart } from "@/lib/cart/useCart"

/**
 * Mobile purchase bar. Appears once the main buy box has scrolled off the top,
 * so it never duplicates a CTA already on screen.
 *
 * Driven by a passive scroll listener: IntersectionObserver produces no
 * threshold crossings for a zero-area anchor, so it fired only once.
 */
export function StickyBuyBar({ product }: { product: Product }) {
  const [show, setShow] = useState(false)
  const { add } = useCart()
  const router = useRouter()
  const variant = defaultVariant(product)
  const buyable = variant.price !== null

  useEffect(() => {
    const buybox = document.querySelector(".buybox")
    if (!buybox) return

    let frame = 0
    const measure = () => {
      frame = 0
      setShow(buybox.getBoundingClientRect().bottom < 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div className={`stickybar ${show ? "is-visible" : ""}`} aria-hidden={!show}>
      <div className="stickybar__price">
        <strong>
          {variant.price === null ? "On request" : formatPrice(variant.price)}
        </strong>
        <s>{variant.size}</s>
      </div>
      <button
        type="button"
        className="btn-buy btn-buy--primary stickybar__cta"
        disabled={!buyable}
        onClick={() => add(product.slug, variant.size)}
        tabIndex={show ? 0 : -1}
      >
        Add to Cart
      </button>
      <button
        type="button"
        className="btn-buy btn-buy--secondary stickybar__cta"
        disabled={!buyable}
        onClick={() => {
          add(product.slug, variant.size)
          router.push("/cart")
        }}
        tabIndex={show ? 0 : -1}
      >
        Buy Now
      </button>
    </div>
  )
}
