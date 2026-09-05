/**
 * Types shared between the OTP API routes and the browser.
 *
 * Nothing secret lives here: this module is imported by client code, so it must
 * never touch the 2Factor API key or the 2Factor session id. The browser only
 * ever holds our own opaque challenge id and, once verified, a signed proof.
 */

/** What the browser sends to /api/otp/send. */
export interface SendRequest {
  readonly phone: string
}

export type SendResponse =
  | {
      readonly ok: true
      /** Our own id. NOT the 2Factor session id, which never leaves the server. */
      readonly challengeId: string
      /** Seconds until the code stops being accepted. */
      readonly expiresIn: number
      /** Seconds the user must wait before another code can be sent. */
      readonly resendIn: number
      /** Last two digits, so the UI can say "…ending 42" without echoing the number. */
      readonly hint: string
    }
  | { readonly ok: false; readonly reason: SendFailure; readonly message: string }

export type SendFailure =
  | "disabled"
  | "bad-phone"
  | "cooldown"
  | "rate-limited"
  | "quota"
  | "provider"

/** What the browser sends to /api/otp/verify. */
export interface VerifyRequest {
  readonly challengeId: string
  readonly code: string
}

export type VerifyResponse =
  | {
      readonly ok: true
      /**
       * Signed, short-lived, and bound to this exact phone number. The order
       * backend re-checks this server-side; a client cannot mint one.
       */
      readonly proof: string
      readonly phone: string
    }
  | {
      readonly ok: false
      readonly reason: VerifyFailure
      readonly message: string
      /** Remaining attempts on this challenge, when the challenge is still alive. */
      readonly attemptsLeft?: number
    }

export type VerifyFailure =
  | "disabled"
  | "bad-code"
  | "expired"
  | "mismatch"
  | "too-many-attempts"
  | "provider"

/** Length of the code we ask the user for. 2Factor's default template sends 6 digits. */
export const OTP_LENGTH = 6
