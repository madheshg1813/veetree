import { NextResponse } from "next/server"
import { fetchDeliveryRates } from "@/lib/checkout/deliveryRates"

export const runtime = "nodejs"
export const revalidate = 60

/** What the checkout form reads to quote delivery as the address is typed. */
export async function GET() {
  return NextResponse.json(await fetchDeliveryRates())
}
