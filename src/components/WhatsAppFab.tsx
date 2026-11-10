"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Floating support link. Ordering happens on the site — this is for questions,
 * so the label must not read as a purchase route.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`fab ${visible ? "is-visible" : ""}`}
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Veetree on WhatsApp"
    >
      {/* The official full-colour mark, as in the footer. Plain <img>: the
          Cloudinary loader would rewrite a next/image src. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="fab__ico" src="/social/whatsapp.svg" alt="" width={34} height={34} />
      <span className="fab__label">Message us</span>
    </a>
  );
}
