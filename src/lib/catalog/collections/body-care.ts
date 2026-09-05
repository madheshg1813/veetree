import type { Collection } from "../types"

export const bodyCare: Collection = {
  slug: "body-care",
  heading: "Body Care",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Body Care", href: "/collections/body-care" },
  ],
  productSlugs: ["nalpamaradi-lotion", "ritual-body-oil", "nalpamaradi-lepam", "patchouli-shower-gel", "face-body-scrub", "rose-vennila-body-butter", "tender-coconut-body-butter", "choco-body-butter"],
  sections: [
    {
      heading: "About Veetree body care",
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
  relatedLinks: [{"label": "Body Butters", "href": "/collections/body-butters"}, {"label": "Face Care", "href": "/collections/face-care"}, {"label": "Hair Care", "href": "/collections/hair-care"}],
  seo: {
    title: "Body Care — Butters, Oils, Scrub & Lepam | Veetree",
    description: "Botanical body care from Veetree: Nalpamaradi lotion and lepam, ritual body oil, a body scrub and three body butters.",
    canonical: "/collections/body-care",
  },
}
