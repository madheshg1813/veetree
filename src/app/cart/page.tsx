import type { Metadata } from "next"
import { CartPanel } from "@/components/cart/CartDrawer"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: "Your Cart | Veetree",
  description: "Review the items in your Veetree cart before checking out.",
  alternates: { canonical: "/cart" },
  // A personal cart has nothing to index.
  robots: { index: false, follow: true },
}

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="pdp cartpage">
        <div className="shell cartpage__wrap">
          <CartPanel mode="page" />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
