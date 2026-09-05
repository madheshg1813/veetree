import type { Metadata } from "next"
import { connection } from "next/server"
import { AccountView } from "@/components/account/AccountView"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: "Your Account | Veetree",
  description: "Sign in to your Veetree account.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  // Depends on the session cookie, so it cannot be prerendered.
  await connection()
  return (
    <>
      <SiteHeader />
      <main className="pdp cartpage">
        <AccountView />
      </main>
      <SiteFooter />
    </>
  )
}
