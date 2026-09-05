import type { Collection } from "../types"

/** A Hair Care sub-category, as the menu groups it: by what the product is. */
export const hairPacks: Collection = {
  slug: "hair-packs",
  heading: "Hair Packs",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Hair Packs", href: "/collections/hair-packs" },
  ],
  productSlugs: ["protein-hair-mask"],
  sections: [
    {
      heading: "About hair packs",
      body: [
        "Protein hair packs, mixed and applied before washing.",
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
    title: "Hair Packs | Veetree",
    description: "Veetree hair packs \u2014 a protein-rich treatment for weak or damaged hair.",
    canonical: "/collections/hair-packs",
  },
}
