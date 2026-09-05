import type { Collection } from "../types"

/** Owns the broad "hair oil" search intent; products under it target brand + exact name. */
export const hairOils: Collection = {
  slug: "hair-oils",
  heading: "Hair Oils",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Hair Oils", href: "/collections/hair-oils" },
  ],
  productSlugs: ["hair-growth-oil"],
  sections: [
    {
      heading: "What is a hair oil?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the hair oils?",
      a: "Compare the ingredient lists and the usage instructions on each product page — they set out what each one is formulated to do.",
    },
    {
      q: "Are these suitable for everyday use?",
      a: "Follow the usage frequency printed on each pack; it is published on the product page as well.",
    },
  ],
  relatedLinks: [
    { label: "Hair Care", href: "/collections/hair-care", note: "The full range" },
  ],
  seo: {
    title: "Hair Oils for Scalp & Hair | Veetree",
    description: "Slow-infused botanical hair oil for the pre-wash oiling ritual. How to choose one, how long to leave it in, and how it differs from a serum.",
    canonical: "/collections/hair-oils",
  },
}
