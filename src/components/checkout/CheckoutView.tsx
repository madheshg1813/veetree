"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { commerce, formatPrice } from "@/lib/catalog"
import { useCart } from "@/lib/cart/useCart"
import { quoteShipping } from "@/lib/checkout/shipping"
import { submitOrder, type SubmitResult } from "@/lib/checkout/submitOrder"
import {
  DELIVERY_FIELDS,
  EMPTY_DETAILS,
  STATES,
  normalizePhone,
  validate,
  type DeliveryDetails,
  type FieldErrors,
} from "@/lib/checkout/types"
import { useAccount } from "@/lib/account/useAccount"
import { AuthPanel } from "@/components/account/AuthPanel"

const TRAIL = [
  { label: "Home", href: "/" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
]

/**
 * Checkout as a sequence of steps rather than one long form.
 *
 * The order — number, then code, then address, then payment — is the pattern
 * Indian shoppers now expect. It also puts the phone number in our hands before
 * the address wall, which is the point at which most carts are abandoned.
 *
 * Delivery details live in component state only. There is no backend to send
 * them to yet, so nothing is persisted — collecting a customer's address into
 * browser storage with no destination would be pointless and careless. Once
 * orders exist, saving them here is what lets a returning customer skip this
 * step entirely, which is the real payoff of asking for the number first.
 */

type Step = "contact" | "delivery" | "payment"

export function CheckoutView() {
  const { lines, totals, hydrated, clear } = useCart()
  const [step, setStep] = useState<Step>("contact")
  const [details, setDetails] = useState<DeliveryDetails>(EMPTY_DETAILS)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [payment, setPayment] = useState<string | null>(commerce.paymentMethods[0]?.id ?? null)
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [busy, setBusy] = useState(false)
  /** Set once an order exists, so the emptied cart cannot erase the receipt. */
  const [placed, setPlaced] = useState<string | null>(null)
  const account = useAccount()

  const phone = normalizePhone(details.phone)

  /**
   * Delivery charge, quoted from the same rules the server bills by. Shown as
   * soon as a state is picked — a total that jumps at the payment step is the
   * fastest way to lose an order.
   */
  const shipping = quoteShipping(lines, details.state)

  const set = (key: keyof DeliveryDetails, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setResult(null)
  }

  const goToContact = () => { setStep("contact"); setResult(null) }

  const advanceContact = () => {
    if (!phone) {
      setErrors({ phone: "Enter a valid 10-digit mobile number" })
      document.getElementById("f-phone")?.focus()
      return
    }
    setStep("delivery")
  }

  const advanceDelivery = () => {
    const found = validate(details)
    // The number was settled a step ago; only judge this step's own fields.
    const mine: FieldErrors = {}
    for (const key of DELIVERY_FIELDS) if (found[key]) mine[key] = found[key]
    setErrors(mine)
    const firstInvalid = DELIVERY_FIELDS.find((k) => mine[k])
    if (firstInvalid) {
      // Target the field by id, not by [aria-invalid]: React has not committed
      // the new attributes yet at this point, so a DOM query finds nothing.
      document.getElementById(`f-${firstInvalid}`)?.focus()
      return
    }
    setStep("payment")
  }

  const placeOrder = async () => {
    setBusy(true)
    const outcome = await submitOrder({
      details,
      lines,
      total: totals.total,
      paymentMethodId: payment,
      // Phone OTP is gone: the account itself is the verification now, and
      // it is proved by the httpOnly session cookie, server-side.
      verification: null,
    })
    setResult(outcome)
    if (outcome.ok) {
      // Record the number before emptying the cart: `clear()` would otherwise
      // drop this view straight into its "nothing to check out" branch and the
      // customer would never see the confirmation.
      setPlaced(outcome.orderNumber)
      clear()
    }
    setBusy(false)
  }

  /** One submit handler for the whole form, so Enter advances the live step. */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (step === "contact") void advanceContact()
    else if (step === "delivery") advanceDelivery()
    else void placeOrder()
  }

  if (!hydrated) {
    return (
      <div className="shell cart__loading" aria-busy="true">
        <p>Loading your order…</p>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="shell cart__empty">
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
    return (
      <div className="shell cart__empty">
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

  // Signing in is the gate: an order has to belong to a customer record, and
  // that record is what puts the address and history in the Medusa dashboard.
  if (account.loading) {
    return (
      <div className="shell cart__loading" aria-busy="true">
        <p>Checking your account…</p>
      </div>
    )
  }

  if (!account.customer) {
    return (
      <div className="shell cart__gate">
        <h1 className="cart__title">Sign in to check out</h1>
        <p className="cart__gate-lede">
          Your basket is saved. Sign in, or create an account — it takes a moment and keeps
          your order history in one place.
        </p>
        <AuthPanel onSignedIn={() => { void account.refresh() }} />
      </div>
    )
  }

  const field = (
    key: keyof DeliveryDetails,
    label: string,
    props: InputHTMLAttributes<HTMLInputElement> = {}
  ) => {
    const err = errors[key]
    const id = `f-${key}`
    // Everything is needed to deliver a parcel except the landmark. Marking
    // that explicitly is clearer than leaving people to discover it by being
    // stopped, and `required` also enables the browser's own check.
    const optional = key === "address2"
    return (
      <p className={`fld ${err ? "is-error" : ""}`}>
        <label htmlFor={id}>
          {label}
          {optional ? null : (
            <>
              <span className="fld__req" aria-hidden="true">*</span>
              <span className="sr-only"> (required)</span>
            </>
          )}
        </label>
        <input
          id={id}
          value={details[key]}
          onChange={(e) => set(key, e.target.value)}
          required={!optional}
          aria-required={optional ? undefined : true}
          aria-invalid={err ? "true" : undefined}
          aria-describedby={err ? `${id}-err` : undefined}
          {...props}
        />
        {err ? (
          <span className="fld__err" id={`${id}-err`} role="alert">
            {err}
          </span>
        ) : null}
      </p>
    )
  }

  const section = (
    id: Step,
    n: number,
    title: string,
    opts: { done: boolean; summary?: ReactNode; onEdit?: () => void; body: ReactNode }
  ) => {
    const active = step === id
    return (
      <section
        className={`cobox costep ${active ? "is-active" : opts.done ? "is-done" : "is-todo"}`}
        aria-labelledby={`h-${id}`}
      >
        <div className="costep__head">
          <span className="costep__n" aria-hidden="true">
            {opts.done && !active ? "✓" : n}
          </span>
          <h2 id={`h-${id}`}>{title}</h2>
          {opts.done && !active && opts.onEdit ? (
            <button type="button" className="otp__link" onClick={opts.onEdit}>
              Change
            </button>
          ) : null}
        </div>
        {active ? (
          <div className="costep__body">{opts.body}</div>
        ) : opts.done && opts.summary ? (
          <p className="costep__summary">{opts.summary}</p>
        ) : null}
      </section>
    )
  }

  const addressSummary = [
    details.address1,
    details.address2,
    details.city,
    details.state,
    details.pincode,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <>
      <div className="shell">
        <Breadcrumbs trail={TRAIL} />
      </div>

      <form className="shell cart checkout" onSubmit={onSubmit} noValidate>
        <div className="cart__main">
          <h1 className="cart__title">Checkout</h1>

          {/* ── 1. Mobile number ───────────────────────────────────────── */}
          {section("contact", 1, "Mobile number", {
            done: step !== "contact",
            onEdit: goToContact,
            summary: <>+91 {details.phone}</>,
            body: (
              <>
                <div className="fgrid">
                  {field("phone", "Mobile number", {
                    type: "tel",
                    inputMode: "numeric",
                    autoComplete: "tel",
                    placeholder: "10-digit number",
                    maxLength: 10,
                  })}
                </div>
                <p className="costep__note">
                  We will use this number for delivery updates.
                </p>
                <button type="submit" className="btn-buy btn-buy--primary costep__go">
                  Continue
                </button>
              </>
            ),
          })}

          {/* ── 2. Delivery ────────────────────────────────────────────── */}
          {section("delivery", 2, "Delivery address", {
            done: step === "payment",
            onEdit: () => setStep("delivery"),
            summary: (
              <>
                <strong>{details.fullName}</strong>
                <br />
                {addressSummary}
              </>
            ),
            body: (
              <>
                <div className="fgrid">
                  {field("fullName", "Full name", { autoComplete: "name" })}
                  {field("email", "Email", { type: "email", autoComplete: "email" })}
                  <div className="fgrid__wide">
                    {field("address1", "Address", {
                      autoComplete: "address-line1",
                      placeholder: "House / flat, street",
                    })}
                  </div>
                  <div className="fgrid__wide">
                    {field("address2", "Landmark (optional)", { autoComplete: "address-line2" })}
                  </div>
                  {field("city", "City", { autoComplete: "address-level2" })}
                  <p className={`fld ${errors.state ? "is-error" : ""}`}>
                    <label htmlFor="f-state">
                      State
                      <span className="fld__req" aria-hidden="true">*</span>
                      <span className="sr-only"> (required)</span>
                    </label>
                    <select
                      id="f-state"
                      value={details.state}
                      onChange={(e) => set("state", e.target.value)}
                      required
                      aria-required
                      aria-invalid={errors.state ? "true" : undefined}
                      autoComplete="address-level1"
                    >
                      <option value="">Select a state</option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.state ? (
                      <span className="fld__err" role="alert">
                        {errors.state}
                      </span>
                    ) : null}
                  </p>
                  {field("pincode", "PIN code", {
                    inputMode: "numeric",
                    autoComplete: "postal-code",
                    maxLength: 6,
                  })}
                </div>
                <button type="submit" className="btn-buy btn-buy--primary costep__go">
                  Continue to payment
                </button>
              </>
            ),
          })}

          {/* ── 3. Payment ─────────────────────────────────────────────── */}
          {section("payment", 3, "Payment", {
            done: false,
            body: (
              <>
                {commerce.paymentMethods.length > 0 ? (
                  <ul className="paylist">
                    {commerce.paymentMethods.map((m) => (
                      <li key={m.id}>
                        <label className={payment === m.id ? "is-selected" : ""}>
                          <input
                            type="radio"
                            name="payment"
                            value={m.id}
                            checked={payment === m.id}
                            onChange={() => setPayment(m.id)}
                          />
                          <span>
                            <strong>{m.label}</strong>
                            {m.note ? <em>{m.note}</em> : null}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="note note--wide">
                    <strong>Online payment is not switched on yet.</strong> You can review your
                    order below, but it cannot be placed until payment is set up. Nothing will be
                    charged.
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-buy btn-buy--primary costep__go"
                  disabled={busy}
                >
                  {busy ? "Placing order…" : `Place Order · ${formatPrice(totals.total)}`}
                </button>
                {result && !result.ok ? (
                  <p className="cofail" role="alert">
                    {result.message}
                  </p>
                ) : null}
                {result?.ok ? (
                  <p className="csum__banner" role="status">
                    Order {result.orderNumber} placed.
                  </p>
                ) : null}
              </>
            ),
          })}

          <section className="cobox" aria-labelledby="h-review">
            <h2 id="h-review">Order review</h2>
            <ul className="colines">
              {lines.map(({ product, variant, qty, lineTotal }) => {
                const img = product.images[0]
                return (
                  <li key={`${product.slug}-${variant.size}`}>
                    <span className="colines__media">
                      {img ? <Image src={img.src} alt="" width={120} height={120} sizes="60px" /> : null}
                      <b>{qty}</b>
                    </span>
                    <span className="colines__name">
                      {product.brand} {product.name}
                      <em>{variant.size}</em>
                    </span>
                    <span className="colines__total">{formatPrice(lineTotal)}</span>
                  </li>
                )
              })}
            </ul>
            <Link className="cart__continue" href="/cart">
              ← Edit cart
            </Link>
          </section>
        </div>

        <aside className="cart__summary" aria-label="Order total">
          <h2>Order Total</h2>
          <dl className="csum">
            <div>
              <dt>Item total</dt>
              <dd>{formatPrice(totals.total)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>
                {shipping.known ? (
                  formatPrice(shipping.fee)
                ) : (
                  <span className="csum__pending">Choose a state</span>
                )}
              </dd>
            </div>
            <div className="csum__total">
              <dt>To pay</dt>
              <dd>{formatPrice(totals.total + (shipping.known ? shipping.fee : 0))}</dd>
            </div>
          </dl>
          <p className="csum__tax">Price inclusive of all taxes</p>
          <p className="csum__note">
            Your details are used only to deliver this order. We never store card information.
          </p>
        </aside>
      </form>
    </>
  )
}

