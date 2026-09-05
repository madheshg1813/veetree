"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { OTP_LENGTH, type SendResponse, type VerifyResponse } from "./contract"

/**
 * Drives one phone-verification exchange from the browser.
 *
 * The browser is never the authority here — it holds an opaque challenge id and,
 * once the code checks out, a server-signed proof it cannot forge. All this hook
 * does is sequence the two calls and keep the countdowns honest.
 */

export type OtpPhase = "idle" | "sending" | "awaiting" | "verifying" | "verified"

export interface OtpState {
  readonly phase: OtpPhase
  readonly code: string
  readonly error: string | null
  /** Last two digits of the number the code went to. */
  readonly hint: string
  /** Seconds until a new code may be requested; 0 when it may be now. */
  readonly resendIn: number
  /** Seconds until the current code stops working; 0 when there is none. */
  readonly expiresIn: number
  /** True while a code has been sent and is still awaiting entry. */
  readonly hasChallenge: boolean
  /** Server-signed proof, present only once verified. */
  readonly proof: string | null
  /** The exact number the proof is bound to. */
  readonly phone: string | null
}

const INITIAL = {
  phase: "idle" as OtpPhase,
  code: "",
  error: null as string | null,
  hint: "",
  proof: null as string | null,
  phone: null as string | null,
  challengeId: null as string | null,
  resendAt: 0,
  expiresAt: 0,
}

const NETWORK_ERROR = "We could not reach the network. Please check your connection and try again."

export function useOtp() {
  const [s, setS] = useState(INITIAL)
  const [now, setNow] = useState(() => Date.now())

  /** Guards against a double verify when auto-submit and the button race. */
  const inFlight = useRef(false)

  /**
   * Always-current mirror of state, for the async handlers. They run long after
   * the render that started them, so closing over `s` directly would act on
   * stale values.
   */
  const latest = useRef(s)
  useEffect(() => {
    latest.current = s
  })

  // Tick only while a countdown is actually on screen, so an idle checkout page
  // is not re-rendering once a second for no reason.
  const counting = s.phase !== "idle" && s.phase !== "verified"
  useEffect(() => {
    if (!counting) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [counting])

  /** Resolves true when a code is on its way, so the caller can advance a step. */
  const send = useCallback(async (phone: string): Promise<boolean> => {
    if (inFlight.current) return false
    inFlight.current = true
    setS((p) => ({ ...p, phase: "sending", error: null, code: "" }))

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone }),
      })
      const data = (await res.json()) as SendResponse

      setS((p) =>
        data.ok
          ? {
              ...p,
              phase: "awaiting",
              error: null,
              hint: data.hint,
              challengeId: data.challengeId,
              resendAt: Date.now() + data.resendIn * 1000,
              expiresAt: Date.now() + data.expiresIn * 1000,
            }
          : // A failed send leaves any existing challenge alone: if the customer
            // already has a working code, a rate-limited resend must not strand it.
            { ...p, phase: p.challengeId ? "awaiting" : "idle", error: data.message }
      )
      return data.ok
    } catch {
      setS((p) => ({ ...p, phase: p.challengeId ? "awaiting" : "idle", error: NETWORK_ERROR }))
      return false
    } finally {
      inFlight.current = false
      setNow(Date.now())
    }
  }, [])

  /** Resolves true once the number is verified, so the caller can advance a step. */
  const verify = useCallback(async (explicitCode?: string): Promise<boolean> => {
    if (inFlight.current) return false
    inFlight.current = true

    // Read through the ref, not through a state updater: strict mode invokes
    // updaters twice, so using one to smuggle values out is unreliable.
    const challengeId = latest.current.challengeId
    const code = explicitCode ?? latest.current.code

    setS((p) => ({ ...p, phase: "verifying", error: null }))

    if (!challengeId || code.length !== OTP_LENGTH) {
      inFlight.current = false
      setS((p) => ({
        ...p,
        phase: p.challengeId ? "awaiting" : "idle",
        error: `Enter the ${OTP_LENGTH}-digit code we sent you.`,
      }))
      return false
    }

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ challengeId, code }),
      })
      const data = (await res.json()) as VerifyResponse

      setS((p) =>
        data.ok
          ? { ...p, phase: "verified", error: null, proof: data.proof, phone: data.phone,
              challengeId: null, resendAt: 0, expiresAt: 0 }
          : {
              ...p,
              // Expired or burned challenges cannot be retried — send the
              // customer back to requesting a fresh code rather than letting
              // them keep typing into a dead one.
              phase:
                data.reason === "expired" || data.reason === "too-many-attempts"
                  ? "idle"
                  : "awaiting",
              challengeId:
                data.reason === "expired" || data.reason === "too-many-attempts"
                  ? null
                  : p.challengeId,
              code: "",
              error: data.message,
            }
      )
      return data.ok
    } catch {
      setS((p) => ({ ...p, phase: "awaiting", error: NETWORK_ERROR }))
      return false
    } finally {
      inFlight.current = false
    }
  }, [])

  const setCode = useCallback((raw: string) => {
    const code = raw.replace(/\D/g, "").slice(0, OTP_LENGTH)
    setS((p) => ({ ...p, code, error: null }))
    return code
  }, [])

  /** Clears everything — used when the customer edits the number they verified. */
  const reset = useCallback(() => {
    setS(INITIAL)
  }, [])

  const state: OtpState = {
    phase: s.phase,
    code: s.code,
    error: s.error,
    hint: s.hint,
    hasChallenge: s.challengeId !== null,
    proof: s.proof,
    phone: s.phone,
    resendIn: s.resendAt ? Math.max(0, Math.ceil((s.resendAt - now) / 1000)) : 0,
    expiresIn: s.expiresAt ? Math.max(0, Math.ceil((s.expiresAt - now) / 1000)) : 0,
  }

  return { state, send, verify, setCode, reset }
}
