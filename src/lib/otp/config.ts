/**
 * Server-only configuration for phone verification.
 *
 * The 2Factor API key is a spending credential: anything holding it can burn
 * the account's SMS balance. It is therefore read from a plain (non-public)
 * environment variable so Next.js can never inline it into a browser bundle,
 * and it is never returned from an API route, logged, or put in an error
 * message.
 *
 * Read lazily, on purpose. Next.js 16 bundles `process.env` reads that happen
 * at module scope into the build output, and the production image is built
 * before Railway injects any secrets — so a top-level `const` here would freeze
 * "not configured" into the deployed app and verification would be silently
 * dead in production. Calling `otpConfig()` inside a request keeps the read at
 * runtime, where the values actually exist.
 */

if (typeof window !== "undefined") {
  throw new Error("src/lib/otp/config.ts is server-only and must not be imported by client code")
}

const env = (name: string) => {
  const value = process.env[name]?.trim()
  return value ? value : null
}

const int = (name: string, fallback: number) => {
  const value = env(name)
  if (!value) return fallback
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/**
 * How codes actually reach customers. This does NOT change the request we make
 * — 2Factor decides the channel on their side — it only controls what the
 * checkout page promises, so the page cannot say "we texted you" while a phone
 * is ringing. Set it to match reality.
 */
export type DeliveryChannel = "sms" | "call" | "auto"

export interface OtpConfig {
  readonly apiKey: string | null
  readonly template: string | null
  readonly signingSecret: string | null
  readonly deliveryChannel: DeliveryChannel
  readonly codeTtl: number
  readonly proofTtl: number
  readonly resendCooldown: number
  readonly maxAttempts: number
  readonly perPhonePerWindow: number
  readonly perPhonePerDay: number
  readonly perIpPerHour: number
  readonly attemptsPerIpPerHour: number
  readonly dailyCap: number
}

export function otpConfig(): OtpConfig {
  return {
    apiKey: env("TWOFACTOR_API_KEY"),

    /**
     * A DLT-registered template name. Optional: with it unset, 2Factor sends via
     * its own registered template, which is what a new account starts on. Once
     * Veetree registers its own sender ID and template with the DLT registry,
     * set this and the SMS goes out under the brand's own header.
     */
    template: env("TWOFACTOR_TEMPLATE_NAME"),

    /** HMAC key for the verification proof. Generate with: openssl rand -hex 32 */
    signingSecret: env("OTP_SIGNING_SECRET"),

    deliveryChannel: (["sms", "call", "auto"] as const).find(
      (c) => c === env("OTP_DELIVERY_CHANNEL")
    ) ?? "auto",

    /** How long a sent code stays valid, in seconds. */
    codeTtl: int("OTP_CODE_TTL", 10 * 60),

    /** How long a successful verification stays good for, in seconds. */
    proofTtl: int("OTP_PROOF_TTL", 30 * 60),

    /** Seconds between resends to the same number. */
    resendCooldown: int("OTP_RESEND_COOLDOWN", 45),

    /** Wrong codes allowed per challenge before it is burned. */
    maxAttempts: int("OTP_MAX_ATTEMPTS", 5),

    /** Sends allowed to one number in a rolling 15 minutes / 24 hours. */
    perPhonePerWindow: int("OTP_PER_PHONE_WINDOW", 3),
    perPhonePerDay: int("OTP_PER_PHONE_DAY", 6),

    /** Sends allowed from one IP in a rolling hour. */
    perIpPerHour: int("OTP_PER_IP_HOUR", 8),

    /**
     * Requests allowed from one IP in a rolling hour, counted whether or not a
     * message goes out. The limits above only count successful sends, so on
     * their own they leave a caller free to hammer this endpoint — and each
     * attempt is an outbound call to 2Factor. A real customer never comes close
     * to this number; a script does so immediately.
     */
    attemptsPerIpPerHour: int("OTP_ATTEMPTS_PER_IP_HOUR", 30),

    /**
     * Hard ceiling on messages sent per day across the whole site. The account
     * holds a finite prepaid balance, so a loop or a scripted attack must not be
     * able to drain it overnight. Raise this deliberately as volume grows.
     */
    dailyCap: int("OTP_DAILY_CAP", 100),
  }
}

/**
 * Verification is only offered when it can actually work end to end. A missing
 * signing secret is as disqualifying as a missing API key: without it the proof
 * could not be trusted, and a verification you cannot verify is theatre.
 */
export function otpReadiness(): { ready: boolean; missing: string[] } {
  const cfg = otpConfig()
  const missing: string[] = []
  if (!cfg.apiKey) missing.push("TWOFACTOR_API_KEY")
  if (!cfg.signingSecret) missing.push("OTP_SIGNING_SECRET")
  return { ready: missing.length === 0, missing }
}

export const otpEnabled = () => otpReadiness().ready
