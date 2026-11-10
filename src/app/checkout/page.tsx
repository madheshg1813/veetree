import type { Metadata } from "next"
import { connection } from "next/server"
import { CheckoutView } from "@/components/checkout/CheckoutView"
import { SiteFooter } from "@/components/SiteFooter"

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
      {/* No site header: checkout gets its own slim logo bar, so there is
          nowhere to wander off to between the cart and payment. */}
      <main className="ckpage">
        <CheckoutView />
      </main>
      <SiteFooter />
    </>
  )
}
