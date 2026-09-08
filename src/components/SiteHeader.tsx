"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { navigation } from "@/lib/catalog/navigation"
import { site } from "@/lib/site"
import { CartLink } from "./CartLink"
import { AccountCircleIcon, CartIcon, InstagramIcon, RootsIcon, UserIcon } from "./icons"
import { Wordmark } from "./Wordmark"

/**
 * Site header, in the arrangement the client's layout specifies: menu button
 * on the left, wordmark centred, cart on the right, on a plain white bar.
 *
 * The centre cell is sized by the logo and the two outer cells share the rest
 * equally, so the wordmark stays optically centred whether or not the cart is
 * showing a count.
 *
 * Navigation itself is unchanged, only moved: on phone and tablet the full
 * two-level tree is in the drawer behind the menu button; from 941px up it
 * runs as a centred row beneath the wordmark, where parent categories are real
 * links and the panel opens on hover and on focus. Escape closes it.
 */
export function SiteHeader() {
  const [stuck, setStuck] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Escape closes the open panel; a click outside does the same.
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null)
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIndex(null)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [openIndex])

  const closeAll = () => {
    setMenuOpen(false)
    setMobileOpen(null)
    setOpenIndex(null)
  }

  return (
    <header className={`site-header ${stuck ? "is-stuck" : ""}`} id="top">
      <div className="shell site-header__inner">
        <button
          className="burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobileNav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <Wordmark />

        <div className="site-header__actions">
          <CartLink />
          {/*
            Sits to the right of the cart. A plain link rather than a
            signed-in/signed-out toggle: /account already decides which of the
            two it shows, and asking who is signed in from the header would put
            a fetch on every page load to change nothing but a label.
          */}
          <Link className="accountlink" href="/account" aria-label="Your account" onClick={closeAll}>
            <AccountCircleIcon />
          </Link>
        </div>
      </div>

      <div className="shell site-header__navrow">
        <nav className="nav" aria-label="Primary" ref={navRef}>
          <ul className="nav__list">
            {navigation.map((item, i) =>
              item.children ? (
                <li
                  key={item.label}
                  className={`nav__item ${openIndex === i ? "is-open" : ""}`}
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex(null)}
                >
                  <Link className="nav__link" href={item.href} onClick={closeAll}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    className="nav__toggle"
                    aria-expanded={openIndex === i}
                    aria-label={`${openIndex === i ? "Hide" : "Show"} ${item.label} menu`}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span aria-hidden="true" />
                  </button>

                  <div className="nav__panel" onFocus={() => setOpenIndex(i)}>
                    <ul>
                      {item.children.map((child) => (
                        <li
                          key={child.href + child.label}
                          className={child.href === item.href ? "nav__panel-all" : undefined}
                        >
                          <Link href={child.href} onClick={closeAll}>
                            <strong>{child.label}</strong>
                            {child.note ? <span>{child.note}</span> : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label} className="nav__item">
                  <Link className="nav__link" href={item.href} onClick={closeAll}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      <div className="mobile-nav" id="mobileNav" hidden={!menuOpen}>
        {navigation.map((item, i) =>
          item.children ? (
            <div className="mobile-nav__group" key={item.label}>
              <button
                type="button"
                className="mobile-nav__parent"
                aria-expanded={mobileOpen === i}
                onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
              >
                {item.label}
                <span className="mobile-nav__icon" aria-hidden="true" />
              </button>
              <div className="mobile-nav__children" hidden={mobileOpen !== i}>
                {item.children.map((child) => (
                  <Link
                    key={child.href + child.label}
                    /* "View All" points at the parent collection itself — a
                       structural test, so a relabelled entry keeps working. */
                    className={child.href === item.href ? "mobile-nav__all" : undefined}
                    href={child.href}
                    onClick={closeAll}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : item.utility ? (
            <Link
              key={item.label}
              className="mobile-nav__util"
              href={item.href}
              onClick={closeAll}
            >
              {item.label === "Account" ? <UserIcon /> : <RootsIcon />}
              {item.label}
            </Link>
          ) : (
            /* A category with no sub-categories, so it reads like the ones
               above it rather than like the utility links below. */
            <Link key={item.label} href={item.href} onClick={closeAll}>
              {item.label}
            </Link>
          )
        )}
        <Link className="mobile-nav__util" href="/cart" onClick={closeAll}>
          <CartIcon />
          Cart
        </Link>
        <a
          className="mobile-nav__util"
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeAll}
        >
          <InstagramIcon className="mobile-nav__glyph" />
          Instagram
        </a>
      </div>
    </header>
  )
}
