/**
 * Minimal Resend client for transactional email.
 *
 * Server-only. The API key can send mail as the brand's own domain, so it is
 * read from a non-public variable, never returned to a caller, and scrubbed
 * out of anything that could reach a log.
 *
 * Read lazily for the same reason as the 2Factor config: Next inlines
 * module-scope `process.env` reads at build time, and the production image is
 * built before Railway injects secrets — a top-level const would freeze
 * "not configured" into the deployed app.
 */
if (typeof window !== "undefined") {
  throw new Error("src/lib/email/resend.ts is server-only and must not be imported by client code")
}

const TIMEOUT_MS = 10_000

export interface EmailConfig {
  readonly apiKey: string | null
  readonly from: string
}

export function emailConfig(): EmailConfig {
  const key = process.env.RESEND_API_KEY?.trim()
  return {
    apiKey: key ? key : null,
    // Must be a verified sending domain in Resend, or delivery is rejected.
    from: process.env.EMAIL_FROM?.trim() || "Veetree <no-reply@veetree.life>",
  }
}

export const emailEnabled = () => emailConfig().apiKey !== null

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "rejected" | "network" }

/** Strips the API key from any string before it can be logged. */
const redact = (text: string, key: string | null) =>
  key ? text.split(key).join("[redacted]") : text

export async function sendEmail(to: string, subject: string, html: string, text: string): Promise<SendResult> {
  const { apiKey, from } = emailConfig()
  if (!apiKey) return { ok: false, reason: "not-configured" }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, html, text }),
      signal: controller.signal,
    })
    if (!res.ok) {
      const body = await res.text().catch(() => "")
      console.warn(`[email] send failed ${res.status}: ${redact(body.slice(0, 200), apiKey)}`)
      return { ok: false, reason: "rejected" }
    }
    return { ok: true }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn("[email] send error:", redact(msg, apiKey))
    return { ok: false, reason: "network" }
  } finally {
    clearTimeout(timer)
  }
}
