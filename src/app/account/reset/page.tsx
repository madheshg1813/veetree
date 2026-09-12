import type { Metadata } from "next"
import { connection } from "next/server"
import { ResetPasswordView } from "@/components/account/ResetPasswordView"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: "Choose a new password | Veetree",
  description: "Set a new password for your Veetree account.",
  alternates: { canonical: "/account/reset" },
  // A page reached only from a one-time emailed link, carrying a token in the
  // URL. It has no business in an index.
  robots: { index: false, follow: false },
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>
}) {
  // The token comes from the query string, so this cannot be prerendered.
  await connection()
  const { token = "", email = "" } = await searchParams

  return (
    <>
      <SiteHeader />
      <main className="pdp cartpage">
        <ResetPasswordView token={token} email={email} />
      </main>
      <SiteFooter />
    </>
  )
}
