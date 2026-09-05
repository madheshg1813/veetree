"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useAccount } from "@/lib/account/useAccount"

const STARS = [1, 2, 3, 4, 5] as const

/**
 * "Write a review" for a product page.
 *
 * The rating is a radio group, not a row of buttons, so it works from the
 * keyboard and announces itself as one choice out of five. Hovering previews
 * the score without committing it, which is what people expect from stars.
 *
 * Nothing is published straight to the site: the review is emailed to Veetree
 * and added by hand. The form says so plainly rather than implying the review
 * will appear in a moment and leaving the customer to wonder where it went.
 */
export function ReviewForm({ slug, productName }: { slug: string; productName: string }) {
  const account = useAccount()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [text, setText] = useState("")
  const [website, setWebsite] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  // Prefilled once the account loads, and still editable — someone may want a
  // review to appear under a different name from the one on their account.
  const customer = account.customer
  const shownName = name || [customer?.first_name, customer?.last_name].filter(Boolean).join(" ")
  const shownEmail = email || customer?.email || ""

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!rating) {
      setError("Please choose a rating.")
      return
    }
    setBusy(true)
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, rating, name: shownName, email: shownEmail, text, website }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) setError(data.error ?? "Something went wrong. Please try again.")
      else setSent(true)
    } catch {
      setError("We could not reach the server. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div className="wr wr--done" role="status">
        <p className="wr__thanks">Thank you — your review has reached us.</p>
        <p className="wr__note">
          We read every one. Reviews are added to the site by hand, so it may be a few days
          before yours appears.
        </p>
      </div>
    )
  }

  const active = hover || rating

  return (
    <form className="wr" onSubmit={submit}>
      <div className="wr__rate">
        <span className="wr__label" id={`rate-${slug}`}>
          Your rating
        </span>
        <div
          className="wr__stars"
          role="radiogroup"
          aria-labelledby={`rate-${slug}`}
          onMouseLeave={() => setHover(0)}
        >
          {STARS.map((n) => (
            <label
              key={n}
              className={`wr__star ${n <= active ? "is-on" : ""}`}
              onMouseEnter={() => setHover(n)}
            >
              <input
                type="radio"
                name={`rating-${slug}`}
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
              />
              <Star aria-hidden="true" />
              <span className="sr-only">{n} star{n === 1 ? "" : "s"}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="wr__row">
        <label>
          <span className="wr__label">Your name</span>
          <input
            required
            maxLength={80}
            autoComplete="name"
            value={shownName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span className="wr__label">Email</span>
          <input
            required
            type="email"
            autoComplete="email"
            value={shownEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <label>
        <span className="wr__label">Your review of {productName}</span>
        <textarea
          required
          rows={5}
          maxLength={2000}
          value={text}
          placeholder="How did you use it, and what did you notice?"
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      {/* Honeypot. Hidden from people and from screen readers; bots fill it in. */}
      <div className="wr__hp" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      {error ? (
        <p className="wr__error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="wr__foot">
        <button className="btn btn--shop" disabled={busy}>
          {busy ? "Sending…" : "Submit review"}
        </button>
        <p className="wr__note">
          Your email is only so we can reach you about the review — it is never published.
        </p>
      </div>
    </form>
  )
}
