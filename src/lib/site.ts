/**
 * Single source of truth for brand-level configuration.
 * Change the WhatsApp number or Instagram handle here and it updates everywhere.
 */
export const site = {
  name: "VeeTree",
  domain: "veetree.life",
  url: "https://veetree.life",
  tagline: "Rooted in Ayurveda. Made for modern skin.",
  description:
    "VeeTree crafts small-batch Ayurvedic skin, hair and body care — Kumkumadi serum, Nalpamaradi lebam, cold-pressed oils and pure hydrosols. Rooted in tradition, made for modern skin. Order on WhatsApp.",

  /** Country code + number, digits only — no "+", no spaces. */
  whatsappNumber: "916382525233",
  /** Same number, formatted for display. */
  whatsappDisplay: "+91 63825 25233",

  instagramHandle: "veetree.life",
  instagramUrl: "https://www.instagram.com/veetree.life/",
} as const;

export type Site = typeof site;
