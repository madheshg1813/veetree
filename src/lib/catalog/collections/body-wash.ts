import type { Collection } from "../types"

/** A Body Care sub-category, as the menu groups it: by what the product is. */
export const bodyWash: Collection = {
  slug: "body-wash",
  heading: "Body Wash",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Body Care", href: "/collections/body-care" },
    { label: "Body Wash", href: "/collections/body-wash" },
  ],
  productSlugs: ["patchouli-shower-gel"],
  sections: [
    {
      heading: "About body wash",
      body: [
        "Shower gels that clean without stripping.",
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
    title: "Body Wash | Veetree",
    description: "Veetree body wash \u2014 a patchouli shower gel for everyday washing.",
    canonical: "/collections/body-wash",
  },
}
