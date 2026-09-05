import type { Collection } from "../types"

/** Owns the broad "hair serum" search intent; products under it target brand + exact name. */
export const hairSerums: Collection = {
  slug: "hair-serums",
  heading: "Hair Serums",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Hair Serums", href: "/collections/hair-serums" },
  ],
  productSlugs: ["scalp-hair-rebirth-serum"],
  sections: [
    {
      heading: "What is a hair serum?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the hair serums?",
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
    title: "Hair Serums for Scalp & Hair | Veetree",
    description: "Lightweight leave-in hair serums applied at the scalp. How a serum differs from a hair oil, and how to use one.",
    canonical: "/collections/hair-serums",
  },
}
