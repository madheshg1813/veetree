"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import type { ProductImage } from "@/lib/catalog"
import cloudinaryLoader from "@/lib/cloudinaryLoader"
import { useVariantMedia } from "./VariantMedia"

interface Props {
  images: readonly ProductImage[]
  /** Magnification factor for the desktop hover zoom. */
  zoom?: number
}

/**
 * Product gallery with a true magnifier on desktop and a tap-to-zoom lightbox
 * on touch devices.
 *
 * The desktop zoom moves a magnified region under the cursor by shifting
 * background-position — it does not scale the container, so the frame stays
 * put and nothing around it reflows.
 */
/**
 * Width to fetch for the magnifier.
 *
 * The frame is about 660 CSS px, and the magnifier enlarges 2.5x, so the pixels
 * under the cursor come from roughly 1650 CSS px of image — double that on a
 * Retina screen. Asking the loader for this width puts the AI upscale to work
 * on the one view where detail is actually being inspected.
 */
const ZOOM_WIDTH = 2400

export function ProductGallery({ images, zoom = 2.5 }: Props) {
  const [index, setIndex] = useState(0)
  const [zooming, setZooming] = useState(false)
  /**
   * The magnified file is large, and a background-image is fetched the moment
   * it is set — even at opacity 0 — so setting it up front made every visitor
   * pay for a view most never open.
   *
   * Waiting for the hover was worse: the file takes a moment to arrive, so a
   * quick hover showed nothing and the zoom read as broken. It is fetched once
   * the page has gone idle instead, which keeps it clear of the initial load
   * and still has it warm before anyone reaches for it.
   *
   * Tracked by src rather than as a flag, so switching size or thumbnail
   * re-arms it without a setState in the effect body.
   */
  const [readySrc, setReadySrc] = useState<string | null>(null)
  const [zoomWanted, setZoomWanted] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const [lightbox, setLightbox] = useState(false)
  const [coarse, setCoarse] = useState(false)

  const frameRef = useRef<HTMLDivElement>(null)

  /**
   * Follow the chosen size.
   *
   * Adjusted during render rather than in an effect: an effect would paint the
   * old image first and then correct it, and it trips
   * `react-hooks/set-state-in-effect`. Only when that image is actually in the
   * gallery — a variant image never added to the product would otherwise leave
   * the thumbnails pointing at nothing. Tracking the last value keeps the
   * customer's own thumbnail clicks from being overridden.
   */
  const { activeImage } = useVariantMedia()
  const [lastActive, setLastActive] = useState(activeImage)
  if (activeImage !== lastActive) {
    setLastActive(activeImage)
    const at = activeImage ? images.findIndex((i) => i.src === activeImage) : -1
    if (at >= 0) setIndex(at)
  }

  const active = images[index]
  const count = images.length

  /**
   * Warm the magnified rendition once the page is quiet.
   *
   * `activeSrc` rather than `active`: a product with no photography has no
   * active image, and the dependency has to be a plain value anyway.
   */
  const activeSrc = active?.src
  useEffect(() => {
    if (coarse || !activeSrc) return
    const url = cloudinaryLoader({ src: activeSrc, width: ZOOM_WIDTH })
    let cancelled = false

    const fetchIt = () => {
      const img = new window.Image()
      img.onload = () => { if (!cancelled) setReadySrc(url) }
      img.src = url
    }

    // requestIdleCallback where it exists, a timer where it does not — Safari
    // only added it recently, so the type saying otherwise is optimistic.
    const idle = typeof window.requestIdleCallback === "function"
    const handle: number = idle
      ? window.requestIdleCallback(fetchIt, { timeout: 4000 })
      : window.setTimeout(fetchIt, 1500)

    return () => {
      cancelled = true
      if (idle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [activeSrc, coarse])

  // Hover zoom is meaningless without a pointer; touch gets the lightbox.
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)")
    const sync = () => setCoarse(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count]
  )

  // Lightbox keyboard controls
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
  }, [lightbox, step])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const frame = frameRef.current
    if (!frame) return
    const r = frame.getBoundingClientRect()
    setOrigin({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }

  if (!active) {
    return (
      <div className="gallery">
        <div className="gallery__frame gallery__frame--empty" aria-hidden="true">
          <span className="gallery__placeholder">Photography coming soon</span>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery">
      <div className="gallery__stage">
        <div
          ref={frameRef}
          className={`gallery__frame ${zooming ? "is-zooming" : ""}`}
          onMouseEnter={() => { if (!coarse) { setZoomWanted(true); setZooming(true) } }}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={onMove}
        >
          <Image
            src={active.src}
            alt={active.alt}
            width={active.width}
            height={active.height}
            priority
            sizes="(max-width: 900px) 92vw, 46vw"
            className="gallery__img"
            style={active.focus ? { objectPosition: active.focus } : undefined}
          />

          {/*
            Magnified layer, shifted under the cursor.

            Built through the Cloudinary loader rather than using `src` as it
            stands: a catalogue image's src is the file in /public, 619–1100px,
            which the magnifier was enlarging 2.5x straight to pixels. The
            loader returns a far larger, upscaled rendition instead.
          */}
          {!coarse && (
            <div
              className="gallery__zoom"
              aria-hidden="true"
              style={{
                backgroundImage:
                  zoomWanted || readySrc
                    ? `url(${cloudinaryLoader({ src: active.src, width: ZOOM_WIDTH })})`
                    : undefined,
                backgroundSize: `${zoom * 100}%`,
                backgroundPosition: `${origin.x}% ${origin.y}%`,
                opacity: zooming ? 1 : 0,
              }}
            />
          )}

          <button
            type="button"
            className="gallery__expand"
            onClick={() => setLightbox(true)}
            aria-label="Enlarge image"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 3H3v6M15 3h6v6M15 21h6v-6M9 21H3v-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                className="gallery__nav gallery__nav--prev"
                onClick={() => step(-1)}
                aria-label="Previous image"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                className="gallery__nav gallery__nav--next"
                onClick={() => step(1)}
                aria-label="Next image"
              >
                <span aria-hidden="true">›</span>
              </button>
            </>
          )}
        </div>

        {!coarse && (
          <p className="gallery__hint" aria-hidden="true">
            Hover to zoom · click to enlarge
          </p>
        )}
      </div>

      {count > 1 && (
        <ul className="gallery__thumbs" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`View image ${i + 1} of ${count}`}
                className={`gallery__thumb ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
              >
                <Image
                  src={img.src}
                  alt=""
                  width={160}
                  height={160}
                  sizes="90px"
                  style={img.focus ? { objectPosition: img.focus } : undefined}
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={() => setLightbox(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="100vw"
            />
          </div>
          {count > 1 && (
            <p className="lightbox__count">
              {index + 1} / {count}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
