import type { Collection } from "../types"

/** A Face Care sub-category, as the menu groups it: by what the product is. */
export const faceToners: Collection = {
  slug: "face-toners",
  heading: "Face Toners",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
    { label: "Face Toners", href: "/collections/face-toners" },
  ],
  productSlugs: ["rose-hydrosol", "tea-tree-hydrosol"],
  sections: [
    {
      heading: "About face toners",
      body: [
        "Steam-distilled hydrosols, used as a toner after cleansing.",
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
    title: "Face Toners | Veetree",
    description: "Veetree face toners \u2014 pure rose and tea tree hydrosols, steam distilled.",
    canonical: "/collections/face-toners",
  },
}
