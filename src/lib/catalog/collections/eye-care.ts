import type { Collection } from "../types"

export const eyeCare: Collection = {
  slug: "eye-care",
  heading: "Eye Care",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Eye Care", href: "/collections/eye-care" },
  ],
  productSlugs: ["under-eye-serum", "earth-eye-cream"],
  sections: [
    {
      heading: "About Veetree eye care",
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
  relatedLinks: [{"label": "Face Care", "href": "/collections/face-care"}, {"label": "Hair Care", "href": "/collections/hair-care"}],
  seo: {
    title: "Eye Care — Under-Eye Serum & Cream | Veetree",
    description: "Botanical eye care from Veetree: an under-eye serum and a nourishing eye cream for the delicate skin around the eyes.",
    canonical: "/collections/eye-care",
  },
}
