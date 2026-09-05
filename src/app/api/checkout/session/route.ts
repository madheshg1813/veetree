import { NextResponse } from "next/server"
import { currentCustomer } from "@/lib/account/medusa"
import { sessionToken } from "@/lib/account/session"
import { checkoutEnabled, startPayment, type OrderLineInput } from "@/lib/checkout/medusaOrder"
import { DELIVERY_FIELDS, normalizePhone, validate, type DeliveryDetails } from "@/lib/checkout/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_LINES = 40
const MAX_QTY = 20

/**
 * Starts a payable order: builds the cart in Medusa and returns the Razorpay
 * order to pay against.
 *
 * The browser sends only what is in the cart. Prices, totals and the amount
 * charged are all computed by Medusa from the catalogue, so a tampered request
 * can change what is ordered but never what it costs.
 */
export async function POST(req: Request) {
  if (!checkoutEnabled()) {
    return NextResponse.json({ error: "Online ordering is not switched on yet." }, { status: 503 })
  }

  const token = await sessionToken()
  if (!token) {
    return NextResponse.json({ error: "Please sign in to place an order." }, { status: 401 })
  }
  const customer = await currentCustomer(token)
  if (!customer) {
    return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 })
  }

  let body: { details?: Partial<DeliveryDetails>; lines?: OrderLineInput[] }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  const lines = Array.isArray(body.lines) ? body.lines : []
  if (lines.length === 0) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 })
  if (lines.length > MAX_LINES) return NextResponse.json({ error: "That is too many items for one order." }, { status: 400 })

  const clean: OrderLineInput[] = []
  for (const line of lines) {
    const qty = Math.floor(Number(line?.qty))
    if (typeof line?.slug !== "string" || typeof line?.size !== "string") {
      return NextResponse.json({ error: "Your cart could not be read. Please reload and try again." }, { status: 400 })
    }
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) {
      return NextResponse.json({ error: "One of the quantities is not valid." }, { status: 400 })
    }
    clean.push({ slug: line.slug, size: line.size, qty })
  }

  // The address is re-checked here with the same rules the form uses: the form
  // is a convenience for the customer, not a guarantee to the server.
  const details = { ...(body.details ?? {}) } as DeliveryDetails
  for (const key of ["fullName", "phone", "email", "address1", "address2", "city", "state", "pincode"] as const) {
    details[key] = typeof details[key] === "string" ? details[key] : ""
  }
  const errors = validate(details)
  const missing = [...DELIVERY_FIELDS, "phone" as const].find((k) => errors[k])
  if (missing) return NextResponse.json({ error: errors[missing], field: missing }, { status: 400 })
  if (!normalizePhone(details.phone)) {
    return NextResponse.json({ error: "Enter a valid 10-digit mobile number.", field: "phone" }, { status: 400 })
  }

  // The order belongs to the signed-in account, so the address form cannot
  // redirect someone else's order confirmation to an attacker's inbox.
  const result = await startPayment({ token, email: customer.email, details, lines: clean })
  if (!result.ok) return NextResponse.json({ error: result.message }, { status: 502 })

  return NextResponse.json({
    ...result.payment,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
    customerName: details.fullName,
    email: customer.email,
    phone: normalizePhone(details.phone),
  })
}
