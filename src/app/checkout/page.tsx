import type { Metadata } from "next"
import { connection } from "next/server"
import { CheckoutView } from "@/components/checkout/CheckoutView"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: "Checkout | Veetree",
  description: "Complete your Veetree order.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
}

export default async function CheckoutPage() {
  // Opt out of prerendering: the page depends on the signed-in customer, which
  // is a per-request cookie.
  await connection()

  return (
    <>
      <SiteHeader />
      <main className="pdp cartpage">
        <CheckoutView />
      </main>
      <SiteFooter />
    </>
  )
}
