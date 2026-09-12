"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PasswordField } from "./PasswordField"

/**
 * The page the emailed reset link lands on.
 *
 * The token stays in the URL and is posted to our own route, which hands it to
 * Medusa — the browser never talks to Medusa, and the token is never stored.
 *
 * A missing token is its own state rather than a form that will fail: someone
 * who opened the bare URL, or whose mail client mangled the link, should be
 * told what to do instead of typing a password to no purpose.
 */
export function ResetPasswordView({ token, email }: { token: string; email: string }) {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<"signed-in" | "manual" | null>(null)

  if (!token) {
    return (
      <div className="shell cart__gate">
        <h1 className="cart__title">Choose a new password</h1>
        <p className="cart__gate-lede">
          This link is incomplete. Reset links can be broken by an email app, and each one works
          only once. Please request a fresh one.
        </p>
        <Link className="btn btn--shop" href="/account">
          Back to sign in
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="shell cart__gate">
        <h1 className="cart__title">Password changed</h1>
        <p className="cart__gate-lede">
          {done === "signed-in"
            ? "You are signed in with your new password."
            : "Your password has been changed. You can sign in with it now."}
        </p>
        <Link className="btn btn--shop" href={done === "signed-in" ? "/account" : "/account"}>
          {done === "signed-in" ? "Go to your account" : "Sign in"}
        </Link>
      </div>
    )
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError("Choose a password of at least 8 characters.")
      return
    }
    if (password !== confirm) {
      setError("The two passwords do not match.")
      return
    }

    setBusy(true)
    try {
      const res = await fetch("/api/account/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      })
      const data = (await res.json()) as { ok?: boolean; signedIn?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setError(data.error ?? "We could not change your password. Please try again.")
        return
      }
      setDone(data.signedIn ? "signed-in" : "manual")
      if (data.signedIn) router.refresh()
    } catch {
      setError("We could not reach the server. Please check your connection and try again.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="shell cart__gate">
      <h1 className="cart__title">Choose a new password</h1>
      <p className="cart__gate-lede">
        {email ? `For ${email}. ` : null}Pick something you have not used here before.
      </p>

      <div className="auth">
        <form className="auth__form" onSubmit={submit}>
          {error ? <p className="auth__error" role="alert">{error}</p> : null}

          <PasswordField
            label="New password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            minLength={8}
            required
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button className="btn btn--shop auth__submit" type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save new password"}
          </button>
        </form>
      </div>
    </div>
  )
}
