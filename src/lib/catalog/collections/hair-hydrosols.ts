import type { Collection } from "../types"

/** A Hair Care sub-category, as the menu groups it: by what the product is. */
export const hairHydrosols: Collection = {
  slug: "hair-hydrosols",
  heading: "Hair Hydrosols",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Hair Hydrosols", href: "/collections/hair-hydrosols" },
  ],
  productSlugs: ["rosemary-hydrosol"],
  sections: [
    {
      heading: "About hair hydrosols",
      body: [
        "Steam-distilled hydrosols for the scalp.",
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
    { label: "Hair Care", href: "/collections/hair-care", note: "The full range" },
  ],
  seo: {
    title: "Hair Hydrosols | Veetree",
    description: "Veetree hair hydrosol \u2014 pure steam-distilled rosemary for the scalp.",
    canonical: "/collections/hair-hydrosols",
  },
}
