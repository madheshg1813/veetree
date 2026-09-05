"use client"

import Link from "next/link"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

/** Long enough to read a short review before it moves on. */
const ADVANCE_MS = 5500

const STARS = [0, 1, 2, 3, 4]

export interface ReviewItem {
  readonly name: string
  readonly text: string
  readonly productLabel: string
  /** Resolved on the server; null when the mention maps to no single product. */
  readonly href: string | null
}

/**
 * The reviews, as a horizontal scroller with arrows.
 *
 * A scroll-snap row rather than a transform carousel, matching HeroSlider: the
 * swipe is then the browser's own gesture, and the arrow state is read back
 * from real scroll position so it can never disagree with what is on screen.
 *
 * Note there is no `Reveal` on the cards. Reveal fades a card in when it
 * intersects the viewport, and cards parked off to the right of a horizontal
 * scroller never do — they would stay invisible until scrolled to, and then
 * pop. The header keeps its reveal; the cards are simply present.
 */
export function ReviewsSlider({ items }: { items: readonly ReviewItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)

  const readPosition = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    // A pixel of slack: sub-pixel layout means scrollLeft rarely lands exactly
    // on 0 or on max, and an arrow stuck enabled at the end looks broken.
    setAtStart(track.scrollLeft <= 1)
    setAtEnd(track.scrollLeft >= max - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(readPosition)
    }
    readPosition()
    track.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", readPosition)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", readPosition)
    }
  }, [readPosition])

  /** One card per step — measured from the DOM so it follows the breakpoint. */
  const nudge = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>("li")
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0
    const step = card ? card.offsetWidth + gap : track.clientWidth
    track.scrollBy({ left: step * direction, behavior: "smooth" })
  }, [])

  /**
   * Advance on its own, and wrap round at the end.
   *
   * Three things stop it: the visitor interacting with the slider, the section
   * being off screen, and `prefers-reduced-motion`. The off-screen check
   * matters most — without it the reviews would have quietly run to the end
   * while nobody was looking, so arriving at the section would show its last
   * card rather than its first.
   */
  useEffect(() => {
    if (paused || !onScreen || items.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = window.setInterval(() => {
      const track = trackRef.current
      if (!track) return
      const max = track.scrollWidth - track.clientWidth
      if (track.scrollLeft >= max - 1) track.scrollTo({ left: 0, behavior: "smooth" })
      else nudge(1)
    }, ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [paused, onScreen, items.length, nudge])

  // Only run while the section is actually in view.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (items.length === 0) return null

  return (
    <div
      className="revs__slider"
      ref={rootRef}
      aria-roledescription="carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <button
        type="button"
        className="revs__arrow revs__arrow--prev"
        onClick={() => nudge(-1)}
        disabled={atStart}
        aria-label="Previous reviews"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <ul
        className="revs__track"
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Customer reviews"
      >
        {items.map((r, i) => (
          <li className="rev" key={r.name + i}>
            <p className="rev__stars" aria-hidden="true">
              {STARS.map((n) => (
                <Star key={n} strokeWidth={0} />
              ))}
            </p>
            <blockquote className="rev__quote">
              <p>{r.text}</p>
            </blockquote>
            <footer className="rev__foot">
              <span className="rev__who">
                <span className="rev__avatar" aria-hidden="true">
                  {r.name.charAt(0)}
                </span>
                <cite>{r.name}</cite>
              </span>
              <span className="rev__product">
                {r.href ? <Link href={r.href}>{r.productLabel}</Link> : r.productLabel}
              </span>
            </footer>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="revs__arrow revs__arrow--next"
        onClick={() => nudge(1)}
        disabled={atEnd}
        aria-label="More reviews"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  )
}
