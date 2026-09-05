import type { Collection } from "../types"

export const hairCare: Collection = {
  slug: "hair-care",
  heading: "Hair Care",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
  ],
  productSlugs: ["hair-growth-oil", "scalp-hair-rebirth-serum", "protein-hair-mask", "seed-petal-shampoo", "jasmine-hair-butter", "anti-dandruff-gel", "rosemary-hydrosol"],
  sections: [
    {
      heading: "About Veetree hair care",
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
  relatedLinks: [{"label": "Hair Oils", "href": "/collections/hair-oils"}, {"label": "Hair Serums", "href": "/collections/hair-serums"}, {"label": "Shampoos", "href": "/collections/shampoos"}, {"label": "Face Care", "href": "/collections/face-care"}, {"label": "Body Care", "href": "/collections/body-care"}],
  seo: {
    title: "Hair Care — Oils, Serums, Shampoo & Packs | Veetree",
    description: "Botanical hair care from Veetree: slow-infused hair oil, a scalp serum, protein pack, gentle shampoo, hair butter and a rosemary mist.",
    canonical: "/collections/hair-care",
  },
}
