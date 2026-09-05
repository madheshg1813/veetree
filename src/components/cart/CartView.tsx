"use client"

import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { commerce, formatPrice } from "@/lib/catalog"
import { MAX_QTY, useCart } from "@/lib/cart/useCart"

const TRAIL = [
  { label: "Home", href: "/" },
  { label: "Cart", href: "/cart" },
]

export function CartView() {
  const { lines, totals, hydrated, setQty, remove } = useCart()

  // Until localStorage is read, render a neutral shell rather than an empty
  // cart that would flash into a full one.
  if (!hydrated) {
    return (
      <div className="shell cart__loading" aria-busy="true">
        <p>Loading your cart…</p>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="shell cart__empty">
        <h1 className="cart__title">Your cart is empty</h1>
        <p>Nothing here yet. Have a look at the collection and add something you like.</p>
        <div className="cart__empty-actions">
          <Link className="btn-buy btn-buy--primary" href="/#collection">
            Browse the collection
          </Link>
          <Link className="btn-buy btn-buy--secondary" href="/collections/hair-care">
            Hair care
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="shell">
        <Breadcrumbs trail={TRAIL} />
      </div>

      <div className="shell cart">
        <div className="cart__main">
          <h1 className="cart__title">
            Your Cart <span>· {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"}</span>
          </h1>

          <ul className="cart__lines">
            {lines.map(({ product, variant, qty, lineTotal }) => {
              const img = product.images[0]
              return (
                <li key={`${product.slug}-${variant.size}`} className="cline">
                  <Link className="cline__media" href={`/products/${product.slug}`}>
                    {img ? (
                      <Image src={img.src} alt={img.alt} width={200} height={200} sizes="110px" />
                    ) : null}
                  </Link>

                  <div className="cline__info">
                    <p className="cline__meta">
                      {(product.collection ?? product.category).label} · {variant.size}
                    </p>
                    <h2 className="cline__name">
                      <Link href={`/products/${product.slug}`}>
                        {product.brand} {product.name}
                      </Link>
                    </h2>
                    <p className="cline__unit">
                      {formatPrice(variant.price ?? 0)}
                      <span> each</span>
                    </p>

                    <div className="cline__controls">
                      <div className="stepper stepper--sm" role="group" aria-label={`Quantity for ${product.name}`}>
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, variant.size, qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <output aria-live="polite">{qty}</output>
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, variant.size, qty + 1)}
                          disabled={qty >= MAX_QTY}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cline__remove"
                        onClick={() => remove(product.slug, variant.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="cline__total">
                    <span className="sr-only">Line total </span>
                    {formatPrice(lineTotal)}
                  </p>
                </li>
              )
            })}
          </ul>

          <Link className="cart__continue" href="/#collection">
            ← Continue shopping
          </Link>
        </div>

        <aside className="cart__summary" aria-label="Order summary">
          <h2>Order Summary</h2>

          <dl className="csum">
            <div>
              <dt>Item total</dt>
              <dd>{formatPrice(totals.total)}</dd>
            </div>
            {commerce.freeDelivery.enabled ? (
              <div className="csum__save">
                <dt>Delivery</dt>
                <dd>Free</dd>
              </div>
            ) : null}
            <div className="csum__total">
              <dt>Total</dt>
              <dd>{formatPrice(totals.total)}</dd>
            </div>
          </dl>

          <p className="csum__tax">Price inclusive of all taxes</p>

          {commerce.freeDelivery.enabled ? (
            <p className="delivery delivery--sm">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 19Zm10 0a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              <strong>{commerce.freeDelivery.label}</strong>
              <span>{commerce.freeDelivery.note}</span>
            </p>
          ) : null}

          <Link className="btn-buy btn-buy--primary cart__checkout" href="/checkout">
            Proceed to Checkout
          </Link>

          <p className="csum__note">
            Delivery details and payment are collected on the next step.
          </p>
        </aside>
      </div>
    </>
  )
}
