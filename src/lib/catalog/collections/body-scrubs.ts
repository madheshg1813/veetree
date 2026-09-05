import type { Collection } from "../types"

/** A Body Care sub-category, as the menu groups it: by what the product is. */
export const bodyScrubs: Collection = {
  slug: "body-scrubs",
  heading: "Body Scrubs",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Body Care", href: "/collections/body-care" },
    { label: "Body Scrubs", href: "/collections/body-scrubs" },
  ],
  productSlugs: ["face-body-scrub"],
  sections: [
    {
      heading: "About body scrubs",
      body: [
        "Scrubs for smoother skin, face and body.",
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
    { label: "Body Care", href: "/collections/body-care", note: "The full range" },
  ],
  seo: {
    title: "Body Scrubs | Veetree",
    description: "Veetree body scrub \u2014 a gentle exfoliant for face and body.",
    canonical: "/collections/body-scrubs",
  },
}
