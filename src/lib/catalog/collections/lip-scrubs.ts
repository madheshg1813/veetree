import type { Collection } from "../types"

/** Owns the broad "lip scrub" search intent; products under it target brand + exact name. */
export const lipScrubs: Collection = {
  slug: "lip-scrubs",
  heading: "Lip Scrubs",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Lip Care", href: "/collections/lip-care" },
    { label: "Lip Scrubs", href: "/collections/lip-scrubs" },
  ],
  productSlugs: ["orange-lip-scrub", "coffee-lip-scrub"],
  sections: [
    {
      heading: "What is a lip scrub?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the lip scrubs?",
      a: "Compare the ingredient lists and the usage instructions on each product page — they set out what each one is formulated to do.",
    },
    {
      q: "Are these suitable for everyday use?",
      a: "Follow the usage frequency printed on each pack; it is published on the product page as well.",
    },
  ],
  relatedLinks: [
    { label: "Lip Care", href: "/collections/lip-care", note: "The full range" },
  ],
  seo: {
    title: "Lip Scrubs — Orange & Coffee | Veetree",
    description: "Gentle lip scrubs to lift flaking before balm. How often to use one, and what to follow it with.",
    canonical: "/collections/lip-scrubs",
  },
}
