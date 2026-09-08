"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { formatPrice, getProduct } from "@/lib/catalog"
import { useCart } from "@/lib/cart/useCart"

interface OrderLine {
  id: string
  title: string
  slug: string | null
  size: string | null
  qty: number
  unitPrice: number | null
  thumbnail: string | null
}

interface OrderSummary {
  id: string
  number: number | null
  placedAt: string | null
  total: number | null
  status: string | null
  fulfillment: string | null
  items: OrderLine[]
}

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

/** A line can only go back in the basket if the catalogue still has that size. */
const reorderable = (line: OrderLine) =>
  Boolean(
    line.slug &&
      line.size &&
      getProduct(line.slug)?.variants.some((v) => v.size === line.size)
  )

/**
 * Past purchases, with Buy again.
 *
 * The orders come from Medusa, which is the record of what was actually paid
 * for. Buy again puts the same sizes back in the basket rather than ordering
 * outright — prices, stock and delivery may all have moved since, so the
 * customer goes through the cart and sees what they are paying now.
 *
 * A line whose product or size has since left the catalogue cannot be re-added.
 * That is said plainly instead of silently dropping it, so the basket never
 * quietly disagrees with what was asked for.
 */
export function OrderHistory() {
  const { add } = useCart()
  const [orders, setOrders] = useState<OrderSummary[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [added, setAdded] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetch("/api/account/orders", { cache: "no-store" })
      .then((r) => r.json() as Promise<{ orders: OrderSummary[] }>)
      .then((d) => { if (!cancelled) setOrders(d.orders ?? []) })
      .catch(() => { if (!cancelled) { setOrders([]); setFailed(true) } })
    return () => { cancelled = true }
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const flash = (key: string) => {
    setAdded(key)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(null), 2200)
  }

  const buyAgain = (order: OrderSummary) => {
    const lines = order.items.filter(reorderable)
    for (const l of lines) add(l.slug!, l.size!, l.qty)
    if (lines.length) flash(order.id)
  }

  if (orders === null) {
    return (
      <section className="orders" aria-busy="true">
        <h2 className="orders__h">Your orders</h2>
        <p className="orders__note">Loading your orders…</p>
      </section>
    )
  }

  if (failed) {
    return (
      <section className="orders">
        <h2 className="orders__h">Your orders</h2>
        <p className="orders__note">
          We could not load your orders just now. Please try again in a moment.
        </p>
      </section>
    )
  }

  if (!orders.length) {
    return (
      <section className="orders">
        <h2 className="orders__h">Your orders</h2>
        <p className="orders__note">
          You have not placed an order yet. Once you do, it will appear here and you can
          reorder it in one tap.
        </p>
        <Link className="orders__browse" href="/#collection">
          Browse the collection
        </Link>
      </section>
    )
  }

  return (
    <section className="orders">
      <h2 className="orders__h">Your orders</h2>

      <ul className="orders__list">
        {orders.map((order) => {
          const canReorder = order.items.some(reorderable)
          const missing = order.items.length - order.items.filter(reorderable).length

          return (
            <li className="order" key={order.id}>
              <div className="order__head">
                <div>
                  <p className="order__num">
                    {order.number !== null ? `Order #${order.number}` : "Order"}
                  </p>
                  <p className="order__meta">
                    {order.placedAt ? dateFmt.format(new Date(order.placedAt)) : null}
                    {order.total !== null ? (
                      <>
                        <span aria-hidden="true"> · </span>
                        {formatPrice(order.total)}
                      </>
                    ) : null}
                    {order.fulfillment ? (
                      <>
                        <span aria-hidden="true"> · </span>
                        <span className="order__status">
                          {order.fulfillment.replace(/_/g, " ")}
                        </span>
                      </>
                    ) : null}
                  </p>
                </div>

                <button
                  type="button"
                  className="order__again"
                  onClick={() => buyAgain(order)}
                  disabled={!canReorder}
                  aria-live="polite"
                >
                  {added === order.id ? "Added to cart" : "Buy again"}
                </button>
              </div>

              <ul className="order__items">
                {order.items.map((line) => {
                  const key = `${order.id}:${line.id}`
                  const can = reorderable(line)
                  return (
                    <li className="oline" key={key}>
                      <div className="oline__text">
                        <p className="oline__name">
                          {can ? (
                            <Link href={`/products/${line.slug}`}>{line.title}</Link>
                          ) : (
                            line.title
                          )}
                        </p>
                        <p className="oline__meta">
                          {line.size ? `${line.size} · ` : null}Qty {line.qty}
                          {line.unitPrice !== null ? (
                            <>
                              <span aria-hidden="true"> · </span>
                              {formatPrice(line.unitPrice)}
                            </>
                          ) : null}
                        </p>
                      </div>

                      {can ? (
                        <button
                          type="button"
                          className="oline__again"
                          onClick={() => {
                            add(line.slug!, line.size!, line.qty)
                            flash(key)
                          }}
                        >
                          {added === key ? "Added" : "Buy again"}
                        </button>
                      ) : (
                        <span className="oline__gone">No longer sold</span>
                      )}
                    </li>
                  )
                })}
              </ul>

              {missing > 0 && canReorder ? (
                <p className="order__note">
                  Buy again adds {order.items.length - missing} of {order.items.length} items —
                  the rest are no longer sold.
                </p>
              ) : null}
            </li>
          )
        })}
      </ul>

      <Link className="orders__browse" href="/cart">
        Go to cart
      </Link>
    </section>
  )
}
