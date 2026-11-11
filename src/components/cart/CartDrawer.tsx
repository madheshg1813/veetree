"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { formatPrice } from "@/lib/catalog"
import { mrpFor } from "@/lib/catalog/pricing"
import { cartKey, useCoupon } from "@/lib/cart/coupon"
import { closeCartDrawer, useCartDrawerOpen } from "@/lib/cart/drawer"
import { useOffers, type Milestone, type Offers } from "@/lib/cart/useOffers"
import { MAX_QTY, useCart, type CartLine } from "@/lib/cart/useCart"

/**
 * The slide-in cart, in the style of the Shopflo carts the client pointed to:
 * the dashboard's announcement, a progress bar to free shipping and a free
 * gift, the lines with quantity controls, coupon offers priced against this
 * cart, "You might also like", and the estimated total with what the shopper
 * saves, above a Checkout button that stays in view.
 *
 * Mounted once in the root layout. It opens from the header cart and from
 * every Add to Cart. The /cart page renders the same panel full width.
 */
export function CartDrawer() {
  const open = useCartDrawerOpen()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="cdrawer"
      aria-label="Your cart"
      onClose={closeCartDrawer}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => { if (e.target === e.currentTarget) closeCartDrawer() }}
    >
      {open ? <CartPanel mode="drawer" /> : null}
    </dialog>
  )
}

interface PricedCoupon {
  code: string
  title: string
  description: string
  discount: number | null
}

/**
 * Advertised coupons priced against this cart by Medusa, refreshed when the
 * cart changes. Empty until the dashboard lists some.
 */
function usePricedCoupons(lines: readonly CartLine[], offers: Offers) {
  const [priced, setPriced] = useState<PricedCoupon[]>([])
  const key = cartKey(lines)
  const hasCoupons = offers.coupons.length > 0
  useEffect(() => {
    if (!hasCoupons || lines.length === 0) return
    let cancelled = false
    const timer = window.setTimeout(() => {
      fetch("/api/cart/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((l) => ({ slug: l.product.slug, size: l.variant.size, qty: l.qty })),
        }),
      })
        .then((r) => (r.ok ? r.json() : { coupons: [] }))
        .then((d: { coupons?: PricedCoupon[] }) => { if (!cancelled) setPriced(d.coupons ?? []) })
        .catch(() => {})
    }, 400)
    return () => { cancelled = true; window.clearTimeout(timer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on cart contents
  }, [key, hasCoupons])
  return hasCoupons && lines.length > 0 ? priced : []
}

export function CartPanel({ mode }: { mode: "drawer" | "page" }) {
  const { lines, totals, hydrated, setQty, remove, add } = useCart()
  const offers = useOffers()
  const { coupon, error, busy, apply, remove: removeCoupon, clearError } = useCoupon(lines, true)
  const priced = usePricedCoupons(lines, offers)
  const [code, setCode] = useState("")
  const [showAll, setShowAll] = useState(false)

  const discount = Math.min(coupon?.discount ?? 0, totals.total)
  const value = totals.total - discount
  const mrpSavings = lines.reduce((sum, l) => {
    const price = l.variant.price ?? 0
    const mrp = l.variant.mrp ?? mrpFor(price)
    return sum + Math.max(0, mrp - price) * l.qty
  }, 0)
  const saved = mrpSavings + discount

  const best = priced
    .filter((c) => c.discount !== null && c.discount > 0)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))[0]

  const inCart = new Set(lines.map((l) => l.product.slug))
  const suggestions = offers.suggestions.filter((s) => !inCart.has(s.slug)).slice(0, 8)

  const close = mode === "drawer" ? closeCartDrawer : undefined

  /**
   * The suggestions row scrolls sideways. A mouse wheel only scrolls up and
   * down, so the arrows move it a card at a time, and a vertical wheel over the
   * row is turned into a sideways scroll until the row reaches its end.
   */
  const alsoRef = useRef<HTMLUListElement>(null)
  const scrollAlso = (dir: 1 | -1) => {
    const row = alsoRef.current
    if (!row) return
    const card = row.querySelector("li")
    row.scrollBy({ left: dir * ((card?.clientWidth ?? 240) + 11), behavior: "smooth" })
  }
  useEffect(() => {
    const row = alsoRef.current
    if (!row) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      const max = row.scrollWidth - row.clientWidth
      const atEnd = (e.deltaY > 0 && row.scrollLeft >= max - 1) || (e.deltaY < 0 && row.scrollLeft <= 0)
      if (max <= 0 || atEnd) return
      e.preventDefault()
      row.scrollLeft += e.deltaY
    }
    row.addEventListener("wheel", onWheel, { passive: false })
    return () => row.removeEventListener("wheel", onWheel)
  })

  const head = (
    <div className="cpanel__head">
      <h2>
        Your Cart {hydrated && totals.itemCount > 0 ? <span>({totals.itemCount})</span> : null}
      </h2>
      {close ? (
        <button type="button" className="cpanel__x" onClick={close} aria-label="Close cart" autoFocus>
          ×
        </button>
      ) : null}
    </div>
  )

  if (!hydrated) {
    return (
      <div className={`cpanel cpanel--${mode}`}>
        {head}
        <p className="cpanel__muted" aria-busy="true">Loading your cart…</p>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className={`cpanel cpanel--${mode}`}>
        {head}
        <div className="cpanel__empty">
          <p className="cpanel__empty-title">Your cart is empty</p>
          <p>Have a look at the collection and add something you like.</p>
          <Link className="btn-buy btn-buy--primary" href="/#collection" onClick={close}>
            Shop now
          </Link>
        </div>
      </div>
    )
  }

  const onApplyCode = async (raw: string) => {
    if (await apply(raw)) { setCode(""); setShowAll(false) }
  }

  return (
    <div className={`cpanel cpanel--${mode}`}>
      {head}
      {offers.announcement ? <p className="cpanel__strip">{offers.announcement}</p> : null}

      <div className="cpanel__body">
        {offers.milestones.length > 0 ? <Progress milestones={offers.milestones} value={value} /> : null}

        <ul className="cpanel__lines">
          {lines.map(({ product, variant, qty, lineTotal }) => {
            const img = product.images[0]
            const price = variant.price ?? 0
            const mrp = variant.mrp ?? mrpFor(price)
            return (
              <li key={`${product.slug}-${variant.size}`} className="cpline">
                <Link className="cpline__img" href={`/products/${product.slug}`} onClick={close}>
                  {img ? <Image src={img.src} alt="" width={160} height={160} sizes="80px" /> : null}
                </Link>
                <div className="cpline__info">
                  <Link className="cpline__name" href={`/products/${product.slug}`} onClick={close}>
                    {product.name}
                  </Link>
                  <span className="cpline__size">{variant.size}</span>
                  <div className="cpline__controls">
                    <button
                      type="button"
                      className="cpline__del"
                      onClick={() => remove(product.slug, variant.size)}
                      aria-label={`Remove ${product.name} ${variant.size}`}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12M10.5 10.5v5.5M13.5 10.5v5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="cpline__qty" role="group" aria-label={`Quantity for ${product.name}`}>
                      <button type="button" onClick={() => setQty(product.slug, variant.size, qty - 1)} aria-label="Decrease quantity">
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
                  </div>
                </div>
                <div className="cpline__price">
                  <strong>{formatPrice(lineTotal)}</strong>
                  {mrp > price ? <s>{formatPrice(mrp * qty)}</s> : null}
                </div>
              </li>
            )
          })}
        </ul>

        {/* ── Coupons ─────────────────────────────────────────────── */}
        <section className="cpanel__offers" aria-label="Coupons and offers">
          {coupon ? (
            <div className="coffer coffer--applied">
              <span className="coffer__ico" aria-hidden="true">%</span>
              <div className="coffer__text">
                <strong>
                  {discount > 0 ? `You save ${formatPrice(discount)}` : "Coupon applied"}
                </strong>
                <span>with &lsquo;{coupon.code}&rsquo;</span>
              </div>
              <button type="button" className="coffer__btn coffer__btn--ghost" onClick={removeCoupon}>
                Remove
              </button>
            </div>
          ) : best ? (
            <div className="coffer">
              <span className="coffer__ico" aria-hidden="true">%</span>
              <div className="coffer__text">
                <strong>Save {formatPrice(best.discount ?? 0)}</strong>
                <span>with &lsquo;{best.code}&rsquo;</span>
              </div>
              <button type="button" className="coffer__btn" onClick={() => void onApplyCode(best.code)} disabled={busy}>
                Apply
              </button>
            </div>
          ) : null}

          {priced.length > 0 ? (
            <>
              <button
                type="button"
                className="coffer__more"
                aria-expanded={showAll}
                onClick={() => setShowAll((v) => !v)}
              >
                <span className="coffer__ico" aria-hidden="true">%</span>
                <strong>More offers</strong>
                <span className="coffer__more-link">
                  {showAll ? "Hide coupons" : "View all coupons"} <span aria-hidden="true">›</span>
                </span>
              </button>
              {showAll ? (
                <ul className="coffer__list">
                  {priced.map((c) => {
                    const usable = c.discount !== null
                    const isApplied = coupon?.code.toUpperCase() === c.code.toUpperCase()
                    return (
                      <li key={c.code} className={usable ? undefined : "is-off"}>
                        <div>
                          <code>{c.code}</code>
                          {c.title ? <strong>{c.title}</strong> : null}
                          {c.description ? <span>{c.description}</span> : null}
                          <em>
                            {usable
                              ? c.discount && c.discount > 0
                                ? `Save ${formatPrice(c.discount)} on this cart`
                                : "Applies to this cart"
                              : "Not applicable to this cart yet"}
                          </em>
                        </div>
                        <button
                          type="button"
                          className="coffer__btn"
                          disabled={!usable || busy || isApplied}
                          onClick={() => void onApplyCode(c.code)}
                        >
                          {isApplied ? "Applied" : "Apply"}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </>
          ) : null}

          <form
            className="coffer__form"
            onSubmit={(e) => { e.preventDefault(); void onApplyCode(code) }}
          >
            <span className="coffer__ico coffer__ico--muted" aria-hidden="true">%</span>
            <input
              value={code}
              onChange={(e) => { setCode(e.target.value); clearError() }}
              placeholder="Enter coupon code"
              aria-label="Coupon code"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={40}
              aria-invalid={error ? "true" : undefined}
            />
            {code.trim() ? (
              <button type="submit" className="coffer__apply" disabled={busy}>
                {busy ? "…" : "Apply"}
              </button>
            ) : null}
          </form>
          {error ? <p className="coffer__err" role="alert">{error}</p> : null}
        </section>

        {/* ── You might also like ─────────────────────────────────── */}
        {suggestions.length > 0 ? (
          <section className="cpanel__also" aria-labelledby={`also-${mode}`}>
            <div className="calso__head">
              <h3 id={`also-${mode}`}>You might also like</h3>
              <div className="calso__nav">
                <button type="button" aria-label="Previous suggestions" onClick={() => scrollAlso(-1)}>‹</button>
                <button type="button" aria-label="More suggestions" onClick={() => scrollAlso(1)}>›</button>
              </div>
            </div>
            <ul ref={alsoRef}>
              {suggestions.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} onClick={close} className="calso__img">
                    {s.image ? <Image src={s.image} alt="" width={160} height={160} sizes="72px" /> : null}
                  </Link>
                  <div className="calso__info">
                    <Link href={s.href} onClick={close}>{s.name}</Link>
                    <span>
                      {formatPrice(s.price)}
                      {s.mrp && s.mrp > s.price ? <s>{formatPrice(s.mrp)}</s> : null}
                    </span>
                  </div>
                  <button type="button" className="calso__add" onClick={() => add(s.slug, s.size, 1)}>
                    + Add
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="cpanel__foot">
        <div className="cpanel__total">
          <span>Estimated total</span>
          <div>
            {saved > 0 ? <s>{formatPrice(value + saved)}</s> : null}
            <strong>{formatPrice(value)}</strong>
          </div>
        </div>
        {saved > 0 ? <p className="cpanel__saved">You saved {formatPrice(saved)}!</p> : null}
        <Link className="btn-buy btn-buy--primary cpanel__checkout" href="/checkout" onClick={close}>
          Checkout
        </Link>
        <p className="cpanel__note">Delivery charges and taxes are shown at checkout.</p>
      </div>
    </div>
  )
}

/**
 * "Shop for ₹51 more to unlock Free Shipping!" — a bar to the highest
 * milestone with a marker at each, ticked once reached.
 */
function Progress({ milestones, value }: { milestones: readonly Milestone[]; value: number }) {
  const top = milestones[milestones.length - 1]!.amount
  const next = milestones.find((m) => value < m.amount)
  const fill = Math.min(100, (value / top) * 100)

  return (
    <div className="cprog">
      <p className="cprog__msg" aria-live="polite">
        {next ? (
          <>
            Shop for <strong>{formatPrice(Math.ceil(next.amount - value))}</strong> more to unlock{" "}
            {next.kind === "shipping" ? "Free Shipping" : `a ${next.label}`}!
          </>
        ) : (
          <>You have unlocked {milestones.map((m) => m.label).join(" + ")}!</>
        )}
      </p>
      <div className="cprog__track">
        <div className="cprog__fill" style={{ width: `${fill}%` }} />
        {milestones.map((m) => {
          const done = value >= m.amount
          return (
            <div
              key={m.amount}
              className={`cprog__stop ${done ? "is-done" : ""}`}
              style={{ left: `${(m.amount / top) * 100}%` }}
            >
              <span className="cprog__amt">{formatPrice(m.amount)}</span>
              <span className="cprog__dot" aria-hidden="true">
                {done ? "✓" : m.kind === "shipping" ? <TruckIcon /> : <GiftIcon />}
              </span>
              <span className="cprog__label">{m.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const TruckIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 19Zm10 0a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
)
const GiftIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-1.5-3-5-3-5-1s3 1 5 1Zm0 0c1.5-3 5-3 5-1s-3 1-5 1Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
)
