import type { Collection } from "../types"

/** A Lip Care sub-category, as the menu groups it: by what the product is. */
export const lipOils: Collection = {
  slug: "lip-oils",
  heading: "Lip Oils",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Lip Care", href: "/collections/lip-care" },
    { label: "Lip Oils", href: "/collections/lip-oils" },
  ],
  productSlugs: ["mango-lip-oil"],
  sections: [
    {
      heading: "About lip oils",
      body: [
        "Lip oils for a soft, glossy finish.",
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
    { label: "Lip Care", href: "/collections/lip-care", note: "The full range" },
  ],
  seo: {
    title: "Lip Oils | Veetree",
    description: "Veetree lip oil \u2014 mango, for soft and hydrated lips.",
    canonical: "/collections/lip-oils",
  },
}
