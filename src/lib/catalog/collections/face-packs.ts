import type { Collection } from "../types"

/** A Face Care sub-category, as the menu groups it: by what the product is. */
export const facePacks: Collection = {
  slug: "face-packs",
  heading: "Face Packs",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
    { label: "Face Packs", href: "/collections/face-packs" },
  ],
  productSlugs: ["face-brightening-pack"],
  sections: [
    {
      heading: "About face packs",
      body: [
        "Herbal face packs, mixed fresh and rinsed off.",
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
    { label: "Face Care", href: "/collections/face-care", note: "The full range" },
  ],
  seo: {
    title: "Face Packs | Veetree",
    description: "Veetree face packs \u2014 herbal powders blended from the founder's own recipes.",
    canonical: "/collections/face-packs",
  },
}
