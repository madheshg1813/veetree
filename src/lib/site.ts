/**
 * Single source of truth for brand-level configuration.
 * Change the WhatsApp number or Instagram handle here and it updates everywhere.
 */
export const site = {
  name: "Veetree",
  /**
   * www is the canonical host. The apex still resolves and is 308-redirected
   * to it in next.config.ts, so a link to either works and only one is
   * indexed — both served 200 before, which is duplicate content.
   */
  domain: "www.veetree.life",
  url: "https://www.veetree.life",
  tagline: "Rooted in Tradition, Backed by Science.",
  description:
    "Veetree crafts small-batch Ayurvedic skin, hair and body care — Kumkumadi serum, Nalpamaradi lebam, cold-pressed oils and pure hydrosols. Rooted in tradition, made for modern skin. Order on WhatsApp.",

  /** Country code + number, digits only — no "+", no spaces. */
  whatsappNumber: "916382525233",
  /** Same number, formatted for display. */
  whatsappDisplay: "+91 63825 25233",

  instagramHandle: "veetree.life",
  instagramUrl: "https://www.instagram.com/veetree.life/",

  youtubeHandle: "VeetreeLife",
  youtubeUrl: "https://www.youtube.com/@VeetreeLife",

  facebookName: "Veetree Life",
  /** Facebook's profile URLs are id-based; the numeric id is the stable part. */
  facebookUrl: "https://www.facebook.com/people/Veetree-Life/61574733663939/",
} as const;

export type Site = typeof site;
