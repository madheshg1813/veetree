/**
 * Store-wide commerce settings.
 *
 * Everything here is a business policy, not a design decision. Nothing in this
 * file should state a promise Veetree has not actually made — set `enabled`
 * to false rather than writing a placeholder that could ship by accident.
 */

export const commerce = {
  /**
   * Payment methods offered at checkout.
   *
   * EMPTY ON PURPOSE. Razorpay is not verified and no order backend is
   * connected, so there is nothing that can actually take a payment yet.
   * Checkout shows an honest notice rather than a card form that cannot work.
   *
   * To enable one, add an entry here and implement it in
   * src/lib/checkout/submitOrder.ts — that is the only integration point.
   *
   *   { id: "cod",      label: "Cash on Delivery", note: "Pay when it arrives" }
   *   { id: "razorpay", label: "UPI, Card & Netbanking", note: "Secured by Razorpay" }
   */
  /**
   * One entry is enough: Razorpay's own modal is where the customer picks
   * between card, UPI, net banking and wallets, so listing those here would
   * only ask the same question twice.
   */
  paymentMethods: [
    { id: "razorpay", label: "Pay online", note: "Card, UPI, net banking or wallet — secured by Razorpay" },
  ] as readonly { id: string; label: string; note?: string }[],

  /**
   * No coupon system exists yet. A code box that can only ever fail is worse
   * than no code box, so the field stays hidden until there is something
   * behind it.
   */
  coupons: { enabled: false },

  /**
   * Off since delivery became chargeable: Tamil Nadu ₹50/₹99 and the rest of
   * India ₹99/₹150, by weight. Promising free delivery beside a checkout that
   * charges for it is the worst kind of surprise. Turn this back on only if a
   * genuine free-delivery threshold is introduced — and then say what it is.
   */
  freeDelivery: {
    enabled: false,
    label: "Free Delivery",
    note: "On eligible orders",
  },

  /**
   * Only list reassurances that are actually true today.
   * Two are disabled because the underlying policy does not exist yet.
   */
  trustSignals: [
    { id: "delivery", label: "Free delivery", note: "On eligible orders", enabled: false },
    { id: "batches", label: "Small-batch made", note: "Blended in limited runs", enabled: true },
    { id: "checkout", label: "Secure checkout", note: "", enabled: false },
    { id: "returns", label: "Easy returns", note: "", enabled: false },
  ],

  /**
   * Google restricted FAQ rich results to authoritative government and health
   * sites in 2023, so FAQPage markup earns a D2C store nothing. The FAQ content
   * is plain semantic HTML and fully crawlable either way. Flip this only if
   * the guidance changes.
   */
  emitFaqSchema: false,
} as const

export type TrustSignal = (typeof commerce.trustSignals)[number]
