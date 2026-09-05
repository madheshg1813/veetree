import type { Collection } from "../types"

/** A Body Care sub-category, as the menu groups it: by what the product is. */
export const bodyLotions: Collection = {
  slug: "body-lotions",
  heading: "Body Lotions",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Body Care", href: "/collections/body-care" },
    { label: "Body Lotions", href: "/collections/body-lotions" },
  ],
  productSlugs: ["nalpamaradi-lotion"],
  sections: [
    {
      heading: "About body lotions",
      body: [
        "Everyday lotions for the whole body.",
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
    title: "Body Lotions | Veetree",
    description: "Veetree body lotion \u2014 a Nalpamaradi preparation for uneven-looking skin.",
    canonical: "/collections/body-lotions",
  },
}
