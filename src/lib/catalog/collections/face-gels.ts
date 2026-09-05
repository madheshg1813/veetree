import type { Collection } from "../types"

/** A Face Care sub-category, as the menu groups it: by what the product is. */
export const faceGels: Collection = {
  slug: "face-gels",
  heading: "Face Gels",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
    { label: "Face Gels", href: "/collections/face-gels" },
  ],
  productSlugs: ["aloe-vera-gel", "saffron-gel", "multi-floral-gel"],
  sections: [
    {
      heading: "About face gels",
      body: [
        "Aloe, saffron and multi-floral gels \u2014 lightweight hydration for everyday use.",
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
    title: "Face Gels | Veetree",
    description: "Veetree face gels: aloe vera, saffron and multi-floral, cold-pressed and lightweight.",
    canonical: "/collections/face-gels",
  },
}
