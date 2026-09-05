import { createHmac, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { sessionToken } from "@/lib/account/session"
import { completeOrder } from "@/lib/checkout/medusaOrder"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Razorpay signs every successful payment as HMAC-SHA256 of
 * "<order_id>|<payment_id>" with the account's key secret. Checking it here
 * means a forged success callback from the browser cannot reach the order
 * completion step at all.
 *
 * Medusa independently asks Razorpay whether the order is paid before it will
 * convert the cart, so this is the outer of two locks rather than the only one.
 */
function signatureValid(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET?.trim()
  if (!secret) return false
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex")
  const a = Buffer.from(expected, "utf8")
  const b = Buffer.from(signature, "utf8")
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: Request) {
  const token = await sessionToken()
  if (!token) {
    return NextResponse.json({ error: "Please sign in to place an order." }, { status: 401 })
  }

  let body: {
    cartId?: string
    razorpayOrderId?: string
    razorpayPaymentId?: string
    razorpaySignature?: string
  }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  const { cartId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body
  if (!cartId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ error: "That payment could not be confirmed." }, { status: 400 })
  }

  if (!signatureValid(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
    console.warn("[checkout] rejected a payment with an invalid signature")
    return NextResponse.json(
      { error: "That payment could not be verified. If money has left your account, contact us and we will resolve it." },
      { status: 400 }
    )
  }

  const result = await completeOrder(cartId, token)
  if (!result.ok) return NextResponse.json({ error: result.message }, { status: 502 })

  return NextResponse.json({ ok: true, orderId: result.orderId, orderNumber: result.orderNumber })
}
