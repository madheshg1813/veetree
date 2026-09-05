import type { Collection } from "../types"

/** A Eye Care sub-category, as the menu groups it: by what the product is. */
export const eyeCreams: Collection = {
  slug: "eye-creams",
  heading: "Eye Creams",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Eye Care", href: "/collections/eye-care" },
    { label: "Eye Creams", href: "/collections/eye-creams" },
  ],
  productSlugs: ["earth-eye-cream"],
  sections: [
    {
      heading: "About eye creams",
      body: [
        "Creams for the delicate skin around the eyes.",
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
    { label: "Eye Care", href: "/collections/eye-care", note: "The full range" },
  ],
  seo: {
    title: "Eye Creams | Veetree",
    description: "Veetree eye cream \u2014 for dark circles and puffiness.",
    canonical: "/collections/eye-creams",
  },
}
