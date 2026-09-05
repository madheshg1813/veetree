"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Slide } from "@/lib/home/slides"

const ADVANCE_MS = 6000

/**
 * Homepage slider — the band the client's layout puts directly under the
 * search bar, about a third of the phone screen tall.
 *
 * The track is a scroll-snap row rather than a transform carousel: swiping is
 * then the browser's own gesture, which is smoother on a phone than anything
 * re-implemented in JS, and the dots read the real scroll position so they can
 * never disagree with what is on screen.
 */
export function HeroSlider({ slides }: { slides: readonly Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: track.clientWidth * i, behavior: "smooth" })
  }, [])

  // Dots follow the scroll position, not the other way round.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth
        if (width > 0) setIndex(Math.round(track.scrollLeft / width))
      })
    }
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
    }
  }, [])

  // Auto-advance, unless the visitor is interacting or asked for less motion.
  useEffect(() => {
    if (paused || slides.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(
      () => goTo((index + 1) % slides.length),
      ADVANCE_MS
    )
    return () => window.clearInterval(timer)
  }, [index, paused, slides.length, goTo])

  if (slides.length === 0) return null

  return (
    <section
      className="slider"
      aria-roledescription="carousel"
      aria-label="Featured"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slider__track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div
            className="slider__slide"
            key={slide.image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              style={slide.focus ? { objectPosition: slide.focus } : undefined}
            />
            <div className="slider__scrim" aria-hidden="true" />
            <div className="slider__copy">
              <p className="slider__eyebrow">{slide.eyebrow}</p>
              <p className="slider__title">{slide.title}</p>
              <Link className="btn btn--shop btn--sm" href={slide.cta.href}>
                {slide.cta.label}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="slider__dots">
        {slides.map((slide, i) => (
          <button
            key={slide.image.src}
            type="button"
            className={`slider__dot ${i === index ? "is-active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
