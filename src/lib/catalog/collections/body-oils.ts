import type { Collection } from "../types"

/** A Body Care sub-category, as the menu groups it: by what the product is. */
export const bodyOils: Collection = {
  slug: "body-oils",
  heading: "Body Oils & Lepam",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Body Care", href: "/collections/body-care" },
    { label: "Body Oils & Lepam", href: "/collections/body-oils" },
  ],
  productSlugs: ["ritual-body-oil", "nalpamaradi-lepam"],
  sections: [
    {
      heading: "About body oils & lepam",
      body: [
        "Massage oils and the classical Nalpamaradi lepam.",
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
    title: "Body Oils & Lepam | Veetree",
    description: "Veetree body oils and lepam \u2014 cold-pressed oils and a traditional herbal lepam.",
    canonical: "/collections/body-oils",
  },
}
