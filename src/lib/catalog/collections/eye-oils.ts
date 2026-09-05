import type { Collection } from "../types"

/** A Eye Care sub-category, as the menu groups it: by what the product is. */
export const eyeOils: Collection = {
  slug: "eye-oils",
  heading: "Eye Oils",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Eye Care", href: "/collections/eye-care" },
    { label: "Eye Oils", href: "/collections/eye-oils" },
  ],
  productSlugs: ["under-eye-serum"],
  sections: [
    {
      heading: "About eye oils",
      body: [
        "Roll-on serums for the under-eye area.",
        "Every product page sets out the full ingredient list, the sizes and how to use it, taken from what is printed on the pack.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between these?",
      a: "Compare the ingredient lists and the usage instructions on each product page — they set out what each one is formulated to do.",
    },
  ],
  relatedLinks: [
    { label: "Eye Care", href: "/collections/eye-care", note: "The full range" },
  ],
  seo: {
    title: "Eye Oils | Veetree",
    description: "Veetree under-eye serum \u2014 a roll-on for the delicate under-eye area.",
    canonical: "/collections/eye-oils",
  },
}
