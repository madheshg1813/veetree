import { NextResponse } from "next/server"
import { currentCustomer } from "@/lib/account/medusa"
import { sessionToken } from "@/lib/account/session"
import { getProduct } from "@/lib/catalog"
import type { Slug } from "@/lib/catalog/types"
import { emailEnabled, sendEmail } from "@/lib/email/resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const HOUR_MS = 60 * 60 * 1000
const PER_IP_HOUR = 5
const MAX_TEXT = 2000
const MIN_TEXT = 10

// On globalThis so a dev hot reload does not quietly reset the limit.
const g = globalThis as unknown as { __veetreeReviews?: Map<string, number[]> }
const sends: Map<string, number[]> = (g.__veetreeReviews ??= new Map())

function allowed(ip: string): boolean {
  const now = Date.now()
  for (const [k, times] of sends) {
    const recent = times.filter((t) => now - t < HOUR_MS)
    if (recent.length) sends.set(k, recent)
    else sends.delete(k)
  }
  const mine = sends.get(ip) ?? []
  if (mine.length >= PER_IP_HOUR) return false
  sends.set(ip, [...mine, now])
  return true
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/**
 * Collects a product review and emails it to Veetree.
 *
 * Reviews are not published automatically. They arrive as email, get read, and
 * are added to the site by hand — which is the point: unmoderated customer text
 * on a cosmetics site invites spam and, worse, medical claims the brand would
 * then be publishing as its own. Moderation is a feature here, not a shortcut.
 */
export async function POST(req: Request) {
  let body: {
    slug?: string
    rating?: number
    name?: string
    email?: string
    text?: string
    // Honeypot: a real person never sees this field, so anything in it is a bot.
    website?: string
  }
  try { body = await req.json() } catch { return NextResponse.json({ error: "Bad request." }, { status: 400 }) }

  // Answer the bot exactly as we answer a person, so it learns nothing.
  if (body.website) return NextResponse.json({ ok: true })

  const product = getProduct((body.slug ?? "") as Slug)
  if (!product) return NextResponse.json({ error: "Unknown product." }, { status: 400 })

  const rating = Math.round(Number(body.rating))
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Please choose a rating from 1 to 5 stars." }, { status: 400 })
  }

  const name = (body.name ?? "").trim()
  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 })
  }

  const email = (body.email ?? "").trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  const text = (body.text ?? "").trim()
  if (text.length < MIN_TEXT) {
    return NextResponse.json({ error: "Please tell us a little more — at least a sentence." }, { status: 400 })
  }
  if (text.length > MAX_TEXT) {
    return NextResponse.json({ error: "That review is too long. Please keep it under 2000 characters." }, { status: 400 })
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  if (!allowed(ip)) {
    return NextResponse.json(
      { error: "That is a lot of reviews at once. Please try again a little later." },
      { status: 429 }
    )
  }

  if (!emailEnabled()) {
    return NextResponse.json({ error: "Reviews are not switched on yet." }, { status: 503 })
  }

  // Whether the reviewer was signed in, and as whom — the one signal that
  // separates a review from an anonymous form fill.
  const token = await sessionToken()
  const account = token ? await currentCustomer(token) : null
  const signedIn = account
    ? `Signed in as ${account.email}${account.email === email ? "" : " (different from the address given)"}`
    : "Not signed in"

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating)
  const subject = `Review · ${rating}/5 · ${product.name} · ${name}`
  const plain = [
    `${stars}  (${rating}/5)`,
    `Product: ${product.name} (${product.slug})`,
    `From: ${name} <${email}>`,
    signedIn,
    "",
    text,
  ].join("\n")

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#14190C">
      <p style="font-size:22px;letter-spacing:2px;color:#C07A38;margin:0">${stars}</p>
      <p style="margin:.3rem 0 1rem"><strong>${rating}/5</strong> for
        <strong>${escape(product.name)}</strong></p>
      <p style="margin:0">From: <strong>${escape(name)}</strong>
        &lt;${escape(email)}&gt;</p>
      <p style="margin:.2rem 0 1rem;color:#6b705c;font-size:13px">${escape(signedIn)}</p>
      <blockquote style="margin:0;padding:.9rem 1.1rem;border-left:3px solid #C07A38;
        background:#faf7f0;white-space:pre-wrap">${escape(text)}</blockquote>
      <p style="margin-top:1.4rem;color:#6b705c;font-size:13px">
        Nothing is published automatically. Add it to the site if you want it shown.</p>
    </div>`

  const sent = await sendEmail(process.env.REVIEWS_TO?.trim() || "veetreework@gmail.com", subject, html, plain)
  if (!sent.ok) {
    return NextResponse.json(
      { error: "We could not send your review just now. Please try again shortly." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
