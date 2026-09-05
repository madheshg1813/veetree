import type { Collection } from "../types"

/** Owns the broad "shampoo" search intent; products under it target brand + exact name. */
export const shampoos: Collection = {
  slug: "shampoos",
  heading: "Shampoos",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Shampoos", href: "/collections/shampoos" },
  ],
  productSlugs: ["seed-petal-shampoo"],
  sections: [
    {
      heading: "What is a shampoo?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the shampoos?",
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
    title: "Shampoos for Everyday Washing | Veetree",
    description: "Gentle botanical shampoo that cleanses without stripping, made to follow a pre-wash oiling routine.",
    canonical: "/collections/shampoos",
  },
}
