"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react"
import { CartLink } from "@/components/CartLink"
import { Wordmark } from "@/components/Wordmark"
import { commerce, formatPrice } from "@/lib/catalog"
import { useCart } from "@/lib/cart/useCart"
import { FALLBACK_RATES, quoteShipping, type DeliveryRates } from "@/lib/checkout/shipping"
import { submitOrder, type SubmitResult } from "@/lib/checkout/submitOrder"
import {
  EMPTY_DETAILS,
  STATES,
  validate,
  type DeliveryDetails,
  type FieldErrors,
} from "@/lib/checkout/types"
import { useAccount } from "@/lib/account/useAccount"
import { setCoupon, useCoupon } from "@/lib/cart/coupon"
import { freeShippingReached, useOffers } from "@/lib/cart/useOffers"
import { AuthPanel } from "@/components/account/AuthPanel"
import { policy } from "@/lib/legal/business"

/**
 * One-page checkout, laid out the way Shopify stores are: the form on the left
 * — contact, delivery, shipping method, payment — and the order summary on a
 * grey panel to the right. On a phone the summary folds into a bar at the top.
 *
 * Anyone can fill the form, but paying needs an account: pressing Pay now
 * while signed out opens the sign-in / sign-up box, and payment carries on by
 * itself once they are in. Every order then belongs to an account, which is
 * where the customer sees their past orders. The server enforces the same
 * rule. A signed-in account pre-fills the email and name.
 *
 * Delivery details live in component state only and are sent with the order;
 * nothing is kept in browser storage.
 */

/** Field order on the page, so validation can focus the first one that fails. */
const FIELD_ORDER = [
  "email",
  "fullName",
  "address1",
  "city",
  "state",
  "pincode",
  "phone",
] as const satisfies readonly (keyof DeliveryDetails)[]

export function CheckoutView() {
  const { lines, totals, hydrated, clear } = useCart()
  const [details, setDetails] = useState<DeliveryDetails>(EMPTY_DETAILS)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [payment, setPayment] = useState<string | null>(commerce.paymentMethods[0]?.id ?? null)
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [busy, setBusy] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  /** The sign-in / sign-up dialog, and whether payment should follow it. */
  const [authOpen, setAuthOpen] = useState(false)
  const [payAfterSignIn, setPayAfterSignIn] = useState(false)
  const authRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = authRef.current
    if (!d) return
    if (authOpen && !d.open) d.showModal()
    if (!authOpen && d.open) d.close()
  }, [authOpen])
  /** Set once an order exists, so the emptied cart cannot erase the receipt. */
  const [placed, setPlaced] = useState<string | null>(null)
  const account = useAccount()

  /**
   * Rates from the dashboard. Until they arrive the constants are used, which
   * only matters for the fraction of a second before the fetch resolves.
   */
  const [rates, setRates] = useState<DeliveryRates>(FALLBACK_RATES)
  useEffect(() => {
    let cancelled = false
    fetch("/api/checkout/rates")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d && !cancelled) setRates(d as DeliveryRates) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Pre-fill from the account once it is known. The email always becomes the
  // account's, because that is where the server sends the confirmation; the
  // name only fills boxes that are still empty.
  const customer = account.customer
  useEffect(() => {
    if (!customer) return
    setDetails((d) => ({ ...d, email: customer.email }))
    setFirstName((v) => v || customer.first_name || "")
    setLastName((v) => v || customer.last_name || "")
  }, [customer])

  /**
   * Discount code, shared with the cart drawer: a code applied there arrives
   * here already applied, and is checked again against this cart.
   */
  const [codeInput, setCodeInput] = useState("")
  const {
    coupon,
    error: couponError,
    busy: couponBusy,
    apply: applyCode,
    remove: removeCode,
    clearError: clearCouponError,
  } = useCoupon(lines, true)

  const applyCoupon = async (code: string) => {
    if (await applyCode(code)) setCodeInput("")
    setResult(null)
  }

  const removeCoupon = () => {
    removeCode()
    setResult(null)
  }

  const offers = useOffers()

  const discount = Math.min(coupon?.discount ?? 0, totals.total)
  const quoted = quoteShipping(lines, details.state, rates)
  // A free-shipping milestone from the dashboard. Medusa's shipping option has
  // to carry the same rule, since its price is what is charged.
  const shipping = freeShippingReached(offers, totals.total - discount) ? { ...quoted, fee: 0 } : quoted
  const toPay = totals.total - discount + (shipping.known ? shipping.fee : 0)

  const set = (key: keyof DeliveryDetails, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setResult(null)
  }

  const setName = (first: string, last: string) => {
    setFirstName(first)
    setLastName(last)
    setErrors((e) => ({ ...e, fullName: undefined }))
    setResult(null)
  }

  /** Checks the form; returns the order to send, or null after focusing the first problem. */
  const checkForm = (): DeliveryDetails | null => {
    // The name is read from its two boxes here rather than kept in step with
    // them, so a name pre-filled from the account counts like a typed one.
    const order = { ...details, fullName: `${firstName} ${lastName}`.trim() }
    const found = validate(order)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((k) => found[k])
    if (firstInvalid) {
      // Target the field by id, not by [aria-invalid]: React has not committed
      // the new attributes yet at this point, so a DOM query finds nothing.
      document.getElementById(`f-${firstInvalid}`)?.focus()
      return null
    }
    return order
  }

  const pay = async (order: DeliveryDetails) => {
    setBusy(true)
    const outcome = await submitOrder({
      details: order,
      lines,
      total: totals.total,
      paymentMethodId: payment,
      promoCode: coupon?.code ?? null,
      // The account itself is the verification, proved server-side by the
      // httpOnly session cookie.
      verification: null,
    })
    setResult(outcome)
    if (outcome.ok) {
      // Record the number before emptying the cart: `clear()` would otherwise
      // drop this view straight into its "nothing to check out" branch and the
      // customer would never see the confirmation.
      setPlaced(outcome.orderNumber)
      clear()
      setCoupon(null)
    }
    setBusy(false)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const order = checkForm()
    if (!order) return
    if (!customer) {
      // Signing in is the gate to paying, not to the form.
      setPayAfterSignIn(true)
      setAuthOpen(true)
      return
    }
    void pay(order)
  }

  // Once the account arrives after a Pay now that asked for it, carry on to
  // payment with the account's email in place of whatever was typed.
  useEffect(() => {
    if (!customer || !payAfterSignIn) return
    setPayAfterSignIn(false)
    const order = checkForm()
    if (order) void pay({ ...order, email: customer.email })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per sign-in
  }, [customer, payAfterSignIn])

  /** The slim checkout header: the logo and the cart, nothing to wander off to. */
  const top = (
    <div className="ck__top">
      <Wordmark className="ck__logo" />
      <CartLink />
    </div>
  )

  /** Loading, empty, signed-out and thank-you states share one narrow column. */
  const plain = (body: ReactNode) => (
    <div className="ck ck--plain">
      <div className="ck__main">
        {top}
        {body}
      </div>
    </div>
  )

  if (!hydrated) {
    return plain(<p className="ck__muted" aria-busy="true">Loading your order…</p>)
  }

  if (placed) {
    return plain(
      <div className="cart__empty">
        <h1 className="cart__title">Thank you — your order is placed</h1>
        <p>
          Order <strong>{placed}</strong>. We have emailed a confirmation, and we will message you
          on WhatsApp when it ships.
        </p>
        <div className="cart__empty-actions">
          <Link className="btn-buy btn-buy--primary" href="/#collection">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return plain(
      <div className="cart__empty">
        <h1 className="cart__title">Nothing to check out</h1>
        <p>Your cart is empty, so there is nothing to order yet.</p>
        <div className="cart__empty-actions">
          <Link className="btn-buy btn-buy--primary" href="/#collection">
            Browse the collection
          </Link>
        </div>
      </div>
    )
  }

  /**
   * A Shopify-style field: the label sits inside the box and shrinks to the top
   * edge once there is a value. The placeholder is a single space so CSS can
   * tell an empty box from a filled one with :placeholder-shown.
   */
  const input = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
    opts: { error?: string; optional?: boolean; props?: InputHTMLAttributes<HTMLInputElement> } = {}
  ) => (
    <div className={`ckf ${opts.error ? "is-error" : ""}`}>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        required={!opts.optional}
        aria-required={opts.optional ? undefined : true}
        aria-invalid={opts.error ? "true" : undefined}
        aria-describedby={opts.error ? `${id}-err` : undefined}
        {...opts.props}
      />
      <label htmlFor={id}>{label}</label>
      {opts.error ? (
        <span className="ckf__err" id={`${id}-err`} role="alert">
          {opts.error}
        </span>
      ) : null}
    </div>
  )

  const field = (
    key: keyof DeliveryDetails,
    label: string,
    props: InputHTMLAttributes<HTMLInputElement> = {},
    optional = false
  ) =>
    input(`f-${key}`, label, details[key], (v) => set(key, v), {
      error: errors[key],
      optional,
      props,
    })

  const itemCount = lines.reduce((n, l) => n + l.qty, 0)

  const summary = (where: "fold" | "side") => (
    <>
      <ul className="ck__lines">
        {lines.map(({ product, variant, qty, lineTotal }) => {
          const img = product.images[0]
          return (
            <li key={`${product.slug}-${variant.size}`}>
              <span className="ck__thumb">
                {img ? <Image src={img.src} alt="" width={128} height={128} sizes="64px" /> : null}
                <b aria-label={`Quantity ${qty}`}>{qty}</b>
              </span>
              <span className="ck__name">
                {product.name}
                <em>{variant.size}</em>
              </span>
              <span className="ck__price">{formatPrice(lineTotal)}</span>
            </li>
          )
        })}
      </ul>

      <div className="ck__coupon">
        <div className="ck__coupon-row">
          <div className={`ckf ${couponError ? "is-error" : ""}`}>
            <input
              id={`coupon-${where}`}
              value={codeInput}
              onChange={(e) => { setCodeInput(e.target.value); clearCouponError() }}
              onKeyDown={(e) => {
                // Enter here applies the code; it must not submit the order.
                if (e.key === "Enter") { e.preventDefault(); void applyCoupon(codeInput) }
              }}
              placeholder=" "
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={40}
              aria-invalid={couponError ? "true" : undefined}
              aria-describedby={couponError ? `coupon-${where}-err` : undefined}
            />
            <label htmlFor={`coupon-${where}`}>Discount code</label>
          </div>
          <button
            type="button"
            className="ck__coupon-btn"
            onClick={() => void applyCoupon(codeInput)}
            disabled={couponBusy || !codeInput.trim()}
          >
            {couponBusy ? "Checking…" : "Apply"}
          </button>
        </div>
        {couponError ? (
          <p className="ck__coupon-err" id={`coupon-${where}-err`} role="alert">
            {couponError}
          </p>
        ) : null}
        {coupon ? (
          <p className="ck__coupon-tag">
            <strong>{coupon.code}</strong>
            <button type="button" onClick={removeCoupon} aria-label={`Remove discount code ${coupon.code}`}>
              ×
            </button>
          </p>
        ) : null}
      </div>

      <dl className="ck__sums">
        <div>
          <dt>
            Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}
          </dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
        {coupon ? (
          <div className="ck__disc">
            <dt>Discount · {coupon.code}</dt>
            <dd>{discount > 0 ? `−${formatPrice(discount)}` : "Applied"}</dd>
          </div>
        ) : null}
        <div>
          <dt>Shipping</dt>
          <dd className={shipping.known ? undefined : "ck__muted"}>
            {shipping.known
              ? shipping.fee === 0
                ? "Free"
                : formatPrice(shipping.fee)
              : "Enter shipping address"}
          </dd>
        </div>
        <div className="ck__total">
          <dt>Total</dt>
          <dd>
            <small>INR</small> {formatPrice(toPay)}
          </dd>
        </div>
      </dl>
      <p className="ck__tax">Including all taxes</p>
      <Link className="ck__back" href="/cart">
        ← Return to cart
      </Link>
    </>
  )

  return (
    <>
    <form className="ck" onSubmit={onSubmit} noValidate>
      <div className="ck__main">
        {top}

        {/* Phone-width only: the summary folds into a bar above the form. */}
        <div className={`ck__fold ${summaryOpen ? "is-open" : ""}`}>
          <button
            type="button"
            className="ck__fold-btn"
            aria-expanded={summaryOpen}
            aria-controls="ck-fold-body"
            onClick={() => setSummaryOpen((v) => !v)}
          >
            <span>{summaryOpen ? "Hide order summary" : "Show order summary"}</span>
            <span className="ck__chev" aria-hidden="true" />
            <strong>{formatPrice(toPay)}</strong>
          </button>
          <div className="ck__fold-body" id="ck-fold-body">
            {summary("fold")}
          </div>
        </div>

        <h1 className="sr-only">Checkout</h1>

        {/* ── Contact ───────────────────────────────────────────────── */}
        <section className="ck__sec" aria-labelledby="h-contact">
          <div className="ck__sec-head">
            <h2 id="h-contact">Contact</h2>
            {customer ? (
              <span className="ck__muted">Signed in</span>
            ) : account.loading ? null : (
              <button type="button" className="ck__link" onClick={() => setAuthOpen(true)}>
                Sign in
              </button>
            )}
          </div>
          {/* A signed-in order is sent to the account's own email, so the box
              shows it rather than offering an edit that would be ignored. */}
          {field("email", "Email", {
            type: "email",
            autoComplete: "email",
            readOnly: Boolean(customer),
          })}
        </section>

        {/* ── Delivery ──────────────────────────────────────────────── */}
        <section className="ck__sec" aria-labelledby="h-delivery">
          <h2 id="h-delivery">Delivery</h2>
          <div className="ckf ckf--select">
            <select id="f-country" value="India" disabled aria-describedby="ck-ships">
              <option>India</option>
            </select>
            <label htmlFor="f-country">Country/Region</label>
          </div>
          <p className="sr-only" id="ck-ships">
            We deliver within India only.
          </p>

          <div className="ck__row ck__row--2">
            {input("f-fullName", "First name", firstName, (v) => setName(v, lastName), {
              error: errors.fullName,
              props: { autoComplete: "given-name" },
            })}
            {input("f-lastName", "Last name (optional)", lastName, (v) => setName(firstName, v), {
              optional: true,
              props: { autoComplete: "family-name" },
            })}
          </div>
          {field("address1", "Address", { autoComplete: "address-line1" })}
          {field(
            "address2",
            "Apartment, landmark, etc. (optional)",
            { autoComplete: "address-line2" },
            true
          )}
          <div className="ck__row ck__row--3">
            {field("city", "City", { autoComplete: "address-level2" })}
            <div className={`ckf ckf--select ${errors.state ? "is-error" : ""}`}>
              <select
                id="f-state"
                value={details.state}
                onChange={(e) => set("state", e.target.value)}
                required
                aria-required
                aria-invalid={errors.state ? "true" : undefined}
                aria-describedby={errors.state ? "f-state-err" : undefined}
                autoComplete="address-level1"
              >
                <option value="">Select</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <label htmlFor="f-state">State</label>
              {errors.state ? (
                <span className="ckf__err" id="f-state-err" role="alert">
                  {errors.state}
                </span>
              ) : null}
            </div>
            {field("pincode", "PIN code", {
              inputMode: "numeric",
              autoComplete: "postal-code",
              maxLength: 6,
            })}
          </div>
          {field("phone", "Phone", {
            type: "tel",
            inputMode: "numeric",
            autoComplete: "tel",
            maxLength: 13,
          })}
          <p className="ck__hint">We use this number for delivery updates.</p>
        </section>

        {/* ── Shipping method ───────────────────────────────────────── */}
        <section className="ck__sec" aria-labelledby="h-ship">
          <h2 id="h-ship">Shipping method</h2>
          {shipping.known ? (
            <div className="ck__opt is-selected">
              <span className="ck__radio" aria-hidden="true" />
              <span className="ck__opt-text">
                <strong>Standard delivery</strong>
                <em>Dispatched within {policy.dispatchDays}</em>
              </span>
              <strong>{shipping.fee === 0 ? "Free" : formatPrice(shipping.fee)}</strong>
            </div>
          ) : (
            <p className="ck__empty">
              Enter your shipping address to view available shipping methods.
            </p>
          )}
        </section>

        {/* ── Payment ───────────────────────────────────────────────── */}
        <section className="ck__sec" aria-labelledby="h-pay">
          <h2 id="h-pay">Payment</h2>
          <p className="ck__sub">All transactions are secure and encrypted.</p>
          {commerce.paymentMethods.length > 0 ? (
            <div className="ck__pay">
              {commerce.paymentMethods.map((m) => (
                <label key={m.id} className={`ck__opt ${payment === m.id ? "is-selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="sr-only"
                  />
                  <span className="ck__radio" aria-hidden="true" />
                  <span className="ck__opt-text">
                    <strong>Razorpay Secure</strong>
                    {m.note ? <em>{m.note}</em> : null}
                  </span>
                </label>
              ))}
              <p className="ck__pay-note">
                After you click <strong>Pay now</strong>, Razorpay&apos;s secure window opens to
                complete your purchase.
              </p>
            </div>
          ) : (
            <p className="ck__empty">
              <strong>Online payment is not switched on yet.</strong> Your order cannot be placed
              until payment is set up. Nothing will be charged.
            </p>
          )}
        </section>

        <button type="submit" className="btn-buy btn-buy--primary ck__pay-btn" disabled={busy}>
          {busy ? "Processing…" : "Pay now"}
        </button>
        {customer || account.loading ? null : (
          <p className="ck__hint ck__hint--pay">
            You will be asked to sign in or create an account before paying, so your orders
            are saved where you can see them.
          </p>
        )}
        {result && !result.ok ? (
          <p className="cofail" role="alert">
            {result.message}
          </p>
        ) : null}

        <nav className="ck__policies" aria-label="Store policies">
          <Link href="/refund-policy">Refund policy</Link>
          <Link href="/shipping-policy">Shipping</Link>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of service</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      {/* ── Order summary (desktop) ─────────────────────────────────── */}
      <aside className="ck__side" aria-label="Order summary">
        <div className="ck__side-inner">{summary("side")}</div>
      </aside>
    </form>

    <dialog
      ref={authRef}
      className="ck__auth"
      aria-labelledby="ck-auth-h"
      onClose={() => { setAuthOpen(false); setPayAfterSignIn(false) }}
    >
      <div className="ck__auth-head">
        <h2 id="ck-auth-h">
          {payAfterSignIn ? "Sign in to place your order" : "Sign in"}
        </h2>
        <button type="button" className="ck__auth-x" aria-label="Back to checkout" onClick={() => setAuthOpen(false)}>
          ×
        </button>
      </div>
      <p className="ck__auth-lede">
        Sign in, or create an account if you are new. Your orders are saved to your account,
        so you can see everything you have bought.
      </p>
      {authOpen ? (
        <AuthPanel
          initialEmail={details.email.trim()}
          onSignedIn={() => {
            setAuthOpen(false)
            void account.refresh()
          }}
        />
      ) : null}
    </dialog>
    </>
  )
}
