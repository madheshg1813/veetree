"use client"

import { useState } from "react"
import { PasswordField } from "./PasswordField"

type Mode = "signin" | "details" | "code"

/**
 * Sign in, or create an account with an emailed code.
 *
 * Signup is deliberately three steps rather than two: the code is requested
 * before the password is set, so a typo'd address is caught before anyone
 * invents a password for it. The code is checked on the server at registration
 * — this component cannot let anyone past by itself.
 */
export function AuthPanel({ onSignedIn }: { onSignedIn: () => void }) {
  const [mode, setMode] = useState<Mode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const post = async (path: string, body: unknown) => {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = (await res.json().catch(() => ({}))) as { error?: string; code?: string }
    return { ok: res.ok, status: res.status, data }
  }

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const { ok, data } = await post("/api/account/login", { email, password })
    setBusy(false)
    if (!ok) return setError(data.error ?? "Could not sign in.")
    onSignedIn()
  }

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null); setNotice(null)
    const { ok, data } = await post("/api/account/otp", { email })
    setBusy(false)
    if (!ok) {
      setError(data.error ?? "Could not send the code.")
      if (data.code === "exists") setMode("signin")
      return
    }
    setNotice(`We sent a 6-digit code to ${email}. It expires in 10 minutes.`)
    setMode("code")
  }

  const register = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const { ok, data } = await post("/api/account/register", {
      email, password, code, firstName, lastName,
    })
    setBusy(false)
    if (!ok) return setError(data.error ?? "Could not create the account.")
    onSignedIn()
  }

  return (
    <div className="auth">
      <div className="auth__tabs" role="tablist" aria-label="Account">
        <button
          type="button" role="tab" aria-selected={mode === "signin"}
          className={mode === "signin" ? "is-active" : ""}
          onClick={() => { setMode("signin"); setError(null); setNotice(null) }}
        >
          Sign in
        </button>
        <button
          type="button" role="tab" aria-selected={mode !== "signin"}
          className={mode !== "signin" ? "is-active" : ""}
          onClick={() => { setMode("details"); setError(null); setNotice(null) }}
        >
          Create account
        </button>
      </div>

      {notice ? <p className="auth__notice">{notice}</p> : null}
      {error ? <p className="auth__error" role="alert">{error}</p> : null}

      {mode === "signin" ? (
        <form className="auth__form" onSubmit={signIn}>
          <label>
            <span>Email</span>
            <input type="email" autoComplete="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </label>
          <PasswordField
            label="Password"
            autoComplete="current-password"
            required
            value={password}
            onChange={setPassword}
          />
          <button className="btn btn--shop auth__submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      ) : mode === "details" ? (
        <form className="auth__form" onSubmit={sendCode}>
          <p className="auth__hint">
            We will email you a code to confirm the address before the account is created.
          </p>
          <label>
            <span>Email</span>
            <input type="email" autoComplete="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button className="btn btn--shop auth__submit" disabled={busy}>
            {busy ? "Sending…" : "Email me a code"}
          </button>
        </form>
      ) : (
        <form className="auth__form" onSubmit={register}>
          <label>
            <span>6-digit code</span>
            <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} required
              value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
          </label>
          <div className="auth__row">
            <label>
              <span>First name</span>
              <input autoComplete="given-name" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
              <span>Last name</span>
              <input autoComplete="family-name" value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            </label>
          </div>
          <PasswordField
            label="Choose a password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={setPassword}
          />
          <button className="btn btn--shop auth__submit" disabled={busy}>
            {busy ? "Creating…" : "Create account"}
          </button>
          <button type="button" className="auth__link" onClick={sendCode} disabled={busy}>
            Send the code again
          </button>
        </form>
      )}
    </div>
  )
}
