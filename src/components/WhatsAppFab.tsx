"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

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
      <WhatsAppIcon />
      <span className="fab__label">Message us</span>
    </a>
  );
}
