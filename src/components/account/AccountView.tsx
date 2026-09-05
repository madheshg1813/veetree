"use client"

import Link from "next/link"
import { AuthPanel } from "./AuthPanel"
import { useAccount } from "@/lib/account/useAccount"

/** The standalone account page: sign in, or see who you are signed in as. */
export function AccountView() {
  const { customer, loading, refresh, signOut } = useAccount()

  if (loading) {
    return (
      <div className="shell cart__loading" aria-busy="true">
        <p>Loading your account…</p>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="shell cart__gate">
        <h1 className="cart__title">Your account</h1>
        <p className="cart__gate-lede">
          Sign in to see your details, or create an account — we will email you a code to
          confirm your address.
        </p>
        <AuthPanel onSignedIn={() => { void refresh() }} />
      </div>
    )
  }

  const name = [customer.first_name, customer.last_name].filter(Boolean).join(" ")

  return (
    <div className="shell cart__gate">
      <h1 className="cart__title">Your account</h1>
      <div className="auth">
        <div className="auth__form">
          {name ? (
            <p style={{ margin: 0 }}>
              Signed in as <strong>{name}</strong>
            </p>
          ) : null}
          <p style={{ margin: 0, color: "var(--ink-70)" }}>{customer.email}</p>
          <Link className="btn btn--shop auth__submit" href="/#collection">
            Continue shopping
          </Link>
          <button type="button" className="auth__link" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
