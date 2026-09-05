import type { CartLine } from "@/lib/cart/useCart"
import type { DeliveryDetails } from "./types"

/**
 * Retained so the type of `OrderDraft` does not churn while phone verification
 * is off. The account itself is the verification now — proved server-side by
 * the httpOnly session cookie, not by anything the browser hands over.
 */
export interface PhoneVerification {
  readonly proof: string
  readonly phone: string
}

export interface OrderDraft {
  readonly details: DeliveryDetails
  readonly lines: readonly CartLine[]
  readonly total: number
  readonly paymentMethodId: string | null
  readonly verification: PhoneVerification | null
}

export type SubmitResult =
  | { ok: true; orderNumber: string }
  | {
      ok: false
      reason: "no-backend" | "payment-failed" | "cancelled" | "signed-out" | "invalid"
      message: string
    }

interface SessionResponse {
  cartId: string
  razorpayOrderId: string
  amount: number
  currency: string
  keyId: string
  customerName: string
  email: string
  phone: string | null
}

/** Razorpay's Checkout global, narrowed to the parts used here. */
interface RazorpaySuccess {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}
interface RazorpayInstance {
  open(): void
  on(event: "payment.failed", handler: (e: { error?: { description?: string } }) => void): void
}
type RazorpayCtor = new (options: Record<string, unknown>) => RazorpayInstance

declare global {
  interface Window { Razorpay?: RazorpayCtor }
}

const CHECKOUT_JS = "https://checkout.razorpay.com/v1/checkout.js"

/** Loads Razorpay's script once; later calls reuse the same tag. */
function loadRazorpay(): Promise<RazorpayCtor | null> {
  if (typeof window === "undefined") return Promise.resolve(null)
  if (window.Razorpay) return Promise.resolve(window.Razorpay)

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_JS}"]`)
    const script = existing ?? document.createElement("script")
    const done = () => resolve(window.Razorpay ?? null)
    script.addEventListener("load", done, { once: true })
    script.addEventListener("error", () => resolve(null), { once: true })
    if (!existing) {
      script.src = CHECKOUT_JS
      script.async = true
      document.head.appendChild(script)
    }
  })
}

const failed = (reason: Extract<SubmitResult, { ok: false }>["reason"], message: string): SubmitResult =>
  ({ ok: false, reason, message })

/**
 * THE ONLY INTEGRATION POINT FOR PLACING AN ORDER.
 *
 * Three steps, and the money never passes through this file: the server builds
 * a cart in Medusa and returns a Razorpay order to pay against, Razorpay's own
 * modal takes the payment, and the server verifies the signature before asking
 * Medusa to convert the paid cart into an order.
 *
 * What the browser sends is only ever *what* was ordered — never the price. The
 * amount charged is computed by Medusa from the catalogue, so editing this
 * request can change the contents of an order but not its cost.
 */
export async function submitOrder(draft: OrderDraft): Promise<SubmitResult> {
  const lines = draft.lines.map((l) => ({
    slug: l.product.slug,
    size: l.variant.size,
    qty: l.qty,
  }))

  let session: SessionResponse
  try {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details: draft.details, lines }),
    })
    const data = (await res.json()) as Partial<SessionResponse> & { error?: string }
    if (res.status === 401) return failed("signed-out", data.error ?? "Please sign in to place your order.")
    if (res.status === 503) return failed("no-backend", data.error ?? "Online ordering is not switched on yet.")
    if (res.status === 400) return failed("invalid", data.error ?? "Please check your details and try again.")
    if (!res.ok || !data.razorpayOrderId || !data.cartId) {
      return failed("payment-failed", data.error ?? "We could not start the payment. Nothing has been charged.")
    }
    session = data as SessionResponse
  } catch {
    return failed("payment-failed", "We could not reach the payment service. Nothing has been charged.")
  }

  const Razorpay = await loadRazorpay()
  if (!Razorpay) {
    return failed("payment-failed", "The payment window could not load. Check your connection and try again.")
  }

  const paid = await new Promise<RazorpaySuccess | { cancelled: true } | { error: string }>((resolve) => {
    // `modal.ondismiss` and `handler` are mutually exclusive in practice, but
    // resolving twice is harmless — a settled promise ignores the second call.
    const rzp = new Razorpay({
      key: session.keyId,
      order_id: session.razorpayOrderId,
      amount: session.amount,
      currency: session.currency,
      name: "Veetree",
      description: "Ayurvedic skin, hair and body care",
      // Razorpay's modal is served over https and would refuse an http logo as
      // mixed content, so the mark is offered only when the page is secure —
      // which is always the case in production and never on plain localhost.
      ...(window.location.protocol === "https:"
        ? { image: `${window.location.origin}/veetree-logo.png` }
        : {}),
      prefill: {
        name: session.customerName,
        email: session.email,
        // Bare ten digits: the modal shows its own +91 country selector, so a
        // prefixed value lands in the field twice and fails its validation.
        contact: session.phone ?? "",
      },
      theme: { color: "#283618" },
      modal: { ondismiss: () => resolve({ cancelled: true }) },
      handler: (r: RazorpaySuccess) => resolve(r),
    })
    rzp.on("payment.failed", (e) =>
      resolve({ error: e.error?.description ?? "The payment did not go through." })
    )
    rzp.open()
  })

  if ("cancelled" in paid) {
    return failed("cancelled", "Payment was cancelled. Nothing has been charged and your cart is unchanged.")
  }
  if ("error" in paid) {
    return failed("payment-failed", `${paid.error} Nothing has been charged.`)
  }

  try {
    const res = await fetch("/api/checkout/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartId: session.cartId,
        razorpayOrderId: paid.razorpay_order_id,
        razorpayPaymentId: paid.razorpay_payment_id,
        razorpaySignature: paid.razorpay_signature,
      }),
    })
    const data = (await res.json()) as { ok?: boolean; orderNumber?: string; error?: string }
    if (!res.ok || !data.orderNumber) {
      return failed("payment-failed", data.error ?? "Your payment went through but the order did not record. Please contact us.")
    }
    return { ok: true, orderNumber: data.orderNumber }
  } catch {
    return failed(
      "payment-failed",
      "Your payment went through but we lost contact before the order was recorded. Please contact us before paying again."
    )
  }
}
