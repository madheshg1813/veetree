import type { Collection } from "../types"

/** Owns the broad "lip balm" search intent; products under it target brand + exact name. */
export const lipBalms: Collection = {
  slug: "lip-balms",
  heading: "Lip Balms",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Lip Care", href: "/collections/lip-care" },
    { label: "Lip Balms", href: "/collections/lip-balms" },
  ],
  productSlugs: ["sandalwood-lip-balm", "fruit-spice-lip-balm"],
  sections: [
    {
      heading: "What is a lip balm?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the lip balms?",
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
    title: "Lip Balms — Sandalwood & Fruit Spice | Veetree",
    description: "Botanical lip balms that sit as a protective layer on the lips. How a balm differs from a lip oil.",
    canonical: "/collections/lip-balms",
  },
}
