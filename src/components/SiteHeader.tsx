"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { WhatsAppButton } from "./WhatsAppButton";
import { Wordmark } from "./Wordmark";

const NAV_LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#story", label: "Our Roots" },
  { href: "#ritual", label: "The Promise" },
] as const;

export function SiteHeader() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${stuck ? "is-stuck" : ""}`} id="top">
      <div className="shell site-header__inner">
        <Wordmark />

        <nav className="nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <WhatsAppButton className="btn--sm header-cta">Order Now</WhatsAppButton>

        <button
          className="burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobileNav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="mobile-nav" id="mobileNav" hidden={!menuOpen}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Instagram
        </a>
      </div>
    </header>
  );
}
