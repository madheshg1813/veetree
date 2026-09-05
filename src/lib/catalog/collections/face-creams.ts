import type { Collection } from "../types"

/** A Face Care sub-category, as the menu groups it: by what the product is. */
export const faceCreams: Collection = {
  slug: "face-creams",
  heading: "Face Creams",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
    { label: "Face Creams", href: "/collections/face-creams" },
  ],
  productSlugs: ["kumkumayadi-night-cream", "earth-eye-cream"],
  sections: [
    {
      heading: "About face creams",
      body: [
        "Night and under-eye creams for richer, slower-absorbing care.",
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
    title: "Face Creams | Veetree",
    description: "Veetree face creams \u2014 a Kumkumayadi night cream and an under-eye cream.",
    canonical: "/collections/face-creams",
  },
}
