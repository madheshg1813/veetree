"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { formatPrice, type Product } from "@/lib/catalog"
import { useCart } from "@/lib/cart/useCart"
import { PriceBlock } from "./PriceBlock"
import { StockLine } from "./StockLine"

/**
 * Size selector, quantity and the two CTAs.
 *
 * Products with more than one size render a selector; the price and the cart
 * line both follow the chosen variant. A variant with no price yet cannot be
 * added — the CTA is disabled and says so rather than failing silently.
 */
export function BuyBox({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(() =>
    Math.max(0, product.variants.findIndex((v) => v.price !== null))
  )
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { add } = useCart()
  const router = useRouter()

  const variant = product.variants[sizeIndex] ?? product.variants[0]!
  /**
   * Sold out only when Medusa says zero. `stock` is null when the backend is
   * unreachable or the variant does not track inventory, and refusing a sale
   * on a missing number would turn a backend blip into lost orders.
   */
  const soldOut = variant.stock === 0
  const buyable = variant.price !== null && !soldOut
  // Never offer more than exist: backorders are off, so Medusa would reject
  // the cart at checkout and the customer would find out far too late.
  const max = Math.max(1, Math.min(10, variant.stock ?? 10))

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 2600)
    return () => clearTimeout(t)
  }, [added])

  return (
    <div className="buybox">
      {product.variants.length > 1 ? (
        <div className="sizes">
          <span id="size-label" className="buybox__qty-label">
            Size
          </span>
          <div className="sizes__row" role="radiogroup" aria-labelledby="size-label">
            {product.variants.map((v, i) => (
              <button
                key={v.size}
                type="button"
                role="radio"
                aria-checked={i === sizeIndex}
                className={`sizes__opt ${i === sizeIndex ? "is-active" : ""}`}
                onClick={() => setSizeIndex(i)}
              >
                <strong>{v.size}</strong>
                <span>{v.price === null ? "On request" : formatPrice(v.price)}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="buybox__price">
        <PriceBlock variant={variant} />
        <p className="pdp__tax">Inclusive of all taxes</p>
        {/* Follows the chosen size, since stock is per variant. */}
        <StockLine variant={variant} />
      </div>

      <div className="buybox__qty">
        <span id="qty-label" className="buybox__qty-label">
          Quantity
        </span>
        <div className="stepper" role="group" aria-labelledby="qty-label">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1 || !buyable}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <output aria-live="polite">{qty}</output>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max || !buyable}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="buybox__ctas">
        <button
          type="button"
          className="btn-buy btn-buy--primary"
          disabled={!buyable}
          onClick={() => {
            add(product.slug, variant.size, qty)
            setAdded(true)
          }}
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="btn-buy btn-buy--secondary"
          disabled={!buyable}
          onClick={() => {
            add(product.slug, variant.size, qty)
            router.push("/cart")
          }}
        >
          Buy Now
        </button>
      </div>

      <p className="buybox__total" role="status" aria-live="polite">
        {soldOut ? (
          <span className="buybox__tbc">
            This size is out of stock. Message us on WhatsApp and we will tell you when the
            next batch is ready.
          </span>
        ) : !buyable ? (
          <span className="buybox__tbc">
            Pricing for this size is being finalised — please check back shortly.
          </span>
        ) : added ? (
          <span className="buybox__added">✓ Added to cart</span>
        ) : qty > 1 ? (
          <>
            Total <strong>{formatPrice(variant.price! * qty)}</strong> for {qty} × {variant.size}
          </>
        ) : (
          <>Ships as a single {variant.size} pack</>
        )}
      </p>
    </div>
  )
}
