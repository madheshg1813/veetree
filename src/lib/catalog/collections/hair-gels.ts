import type { Collection } from "../types"

/** A Hair Care sub-category, as the menu groups it: by what the product is. */
export const hairGels: Collection = {
  slug: "hair-gels",
  heading: "Hair Gels",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Hair Gels", href: "/collections/hair-gels" },
  ],
  productSlugs: ["anti-dandruff-gel"],
  sections: [
    {
      heading: "About hair gels",
      body: [
        "Scalp gels for flaking and itching.",
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
    { label: "Hair Care", href: "/collections/hair-care", note: "The full range" },
  ],
  seo: {
    title: "Hair Gels | Veetree",
    description: "Veetree hair gel \u2014 an anti-dandruff scalp treatment.",
    canonical: "/collections/hair-gels",
  },
}
