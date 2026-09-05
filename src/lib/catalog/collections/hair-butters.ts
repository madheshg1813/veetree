import type { Collection } from "../types"

/** A Hair Care sub-category, as the menu groups it: by what the product is. */
export const hairButters: Collection = {
  slug: "hair-butters",
  heading: "Hair Butters",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Hair Butters", href: "/collections/hair-butters" },
  ],
  productSlugs: ["jasmine-hair-butter"],
  sections: [
    {
      heading: "About hair butters",
      body: [
        "Leave-in butters for dry hair and frizz.",
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
    title: "Hair Butters | Veetree",
    description: "Veetree hair butter \u2014 a protein-free leave-in for dry, frizz-prone hair.",
    canonical: "/collections/hair-butters",
  },
}
