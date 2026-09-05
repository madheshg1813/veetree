import type { Collection } from "../types"

export const faceCare: Collection = {
  slug: "face-care",
  heading: "Face Care",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
  ],
  productSlugs: ["face-brightening-pack", "kumkumadi-serum", "aqua-rose-brightening-serum", "aloe-vera-gel", "saffron-gel", "multi-floral-gel", "kumkumayadi-night-cream", "rose-hydrosol", "tea-tree-hydrosol"],
  sections: [
    {
      heading: "About Veetree face care",
      body: [
        "Every formulation here is built ingredient-up and blended in small batches. The full ingredient list is published on each product page and printed on the pack.",
        "Products are grouped by what they do rather than by marketing category, so you can build a routine from the step you actually need.",
      ],
    },
  ],
  faqs: [
    {
      q: "Where should I start?",
      a: "Pick the one step your routine is missing rather than buying several at once — it is the only way to tell what is working.",
    },
    {
      q: "Are the full ingredients listed?",
      a: "Yes. Every product page publishes the complete ingredient list exactly as it appears on the pack.",
    },
    {
      q: "Do I need to patch test?",
      a: "Patch test on a small area before first use, as with any new topical product.",
    },
  ],
  relatedLinks: [{"label": "Face Serums", "href": "/collections/face-serums"}, {"label": "Hydrosols", "href": "/collections/hydrosols"}, {"label": "Hair Care", "href": "/collections/hair-care"}, {"label": "Body Care", "href": "/collections/body-care"}],
  seo: {
    title: "Face Care — Serums, Gels, Packs & Mists | Veetree",
    description: "Botanical face care from Veetree: Kumkumadi and Aqua Rose serums, aloe and saffron gels, a brightening pack and steam-distilled hydrosols.",
    canonical: "/collections/face-care",
  },
}
