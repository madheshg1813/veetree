"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Reel } from "@/lib/home/reels"

/**
 * The reels, as a scroll-snap row with arrows.
 *
 * The arrows appear only when the track actually overflows — with three reels
 * they all fit on a desktop, and an arrow that cannot go anywhere is worse
 * than no arrow. Nothing autoplays: these are videos, and moving one out from
 * under someone watching it would be hostile.
 */
export function ReelsSlider({ reels }: { reels: readonly Reel[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [scrollable, setScrollable] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const read = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setScrollable(max > 4)
    setAtStart(track.scrollLeft <= 1)
    setAtEnd(track.scrollLeft >= max - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(read)
    }
    read()
    track.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", read)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", read)
    }
  }, [read])

  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>("li")
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0
    const step = card ? card.offsetWidth + gap : track.clientWidth
    track.scrollBy({ left: step * direction, behavior: "smooth" })
  }

  return (
    <div className={`reels__slider ${scrollable ? "is-scrollable" : ""}`}>
      <button
        type="button"
        className="revs__arrow reels__arrow reels__arrow--prev"
        onClick={() => nudge(-1)}
        disabled={atStart}
        aria-label="Previous reel"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <ul className="reels__track" ref={trackRef} tabIndex={0} role="group" aria-label="Instagram reels">
        {reels.map((reel) => (
          <li key={reel.code} className="reels__item">
            <iframe
              src={`https://www.instagram.com/reel/${reel.code}/embed/`}
              title="Instagram reel"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              scrolling="no"
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="revs__arrow reels__arrow reels__arrow--next"
        onClick={() => nudge(1)}
        disabled={atEnd}
        aria-label="Next reel"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  )
}
