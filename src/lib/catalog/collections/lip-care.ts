import type { Collection } from "../types"

export const lipCare: Collection = {
  slug: "lip-care",
  heading: "Lip Care",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Lip Care", href: "/collections/lip-care" },
  ],
  productSlugs: ["sandalwood-lip-balm", "fruit-spice-lip-balm", "orange-lip-scrub", "coffee-lip-scrub", "mango-lip-oil"],
  sections: [
    {
      heading: "About Veetree lip care",
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
  relatedLinks: [{"label": "Lip Balms", "href": "/collections/lip-balms"}, {"label": "Lip Scrubs", "href": "/collections/lip-scrubs"}, {"label": "Face Care", "href": "/collections/face-care"}, {"label": "Hair Care", "href": "/collections/hair-care"}],
  seo: {
    title: "Lip Care — Balms, Scrubs & Lip Oil | Veetree",
    description: "Botanical lip care from Veetree: sandalwood and fruit-and-spice balms, orange and coffee lip scrubs, and a mango lip oil.",
    canonical: "/collections/lip-care",
  },
}
