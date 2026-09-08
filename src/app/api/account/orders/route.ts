import { NextResponse } from "next/server"
import { listOrders } from "@/lib/account/medusa"
import { sessionToken } from "@/lib/account/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * The signed-in customer's past orders.
 *
 * Same shape as the rest of /api/account: the Medusa token stays on the
 * server, and a caller with no session gets an empty list rather than an
 * error, so the account page can render its signed-out state without
 * treating this as a failure.
 */
export async function GET() {
  const token = await sessionToken()
  if (!token) return NextResponse.json({ orders: [] })

  const orders = await listOrders(token)
  return NextResponse.json({ orders })
}
