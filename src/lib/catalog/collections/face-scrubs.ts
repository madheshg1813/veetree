import type { Collection } from "../types"

/** A Face Care sub-category, as the menu groups it: by what the product is. */
export const faceScrubs: Collection = {
  slug: "face-scrubs",
  heading: "Face Scrubs",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
    { label: "Face Scrubs", href: "/collections/face-scrubs" },
  ],
  productSlugs: ["face-body-scrub", "orange-lip-scrub", "coffee-lip-scrub"],
  sections: [
    {
      heading: "About face scrubs",
      body: [
        "Scrubs that lift dead skin \u2014 for the face, the body and the lips.",
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
    title: "Face Scrubs | Veetree",
    description: "Veetree scrubs: a face and body scrub plus orange and coffee lip scrubs.",
    canonical: "/collections/face-scrubs",
  },
}
