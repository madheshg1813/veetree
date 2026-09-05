import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Seed Petal shampoo"
 */
export const seedPetalShampoo: Product = {
  slug: "seed-petal-shampoo",
  name: "Seed-Petal Shampoo",
  brand: "Veetree",
  category: { label: "Hair Care", href: "/collections/hair-care" },
  collection: { label: "Shampoos", href: "/collections/shampoos" },

  variants: [{"size": "100 ml", "sku": "VT-SEED-PETAL-SHAMPOO-100ML", "price": 249, "mrp": 300}, {"size": "200 ml", "sku": "VT-SEED-PETAL-SHAMPOO-200ML", "price": 489, "mrp": 590}],

  images: [{"src": "/products/seed-petal-shampoo.jpg", "alt": "Veetree Seed-Petal Shampoo in an amber bottle beside hibiscus flowers, rosemary sprigs and flaxseeds", "width": 732, "height": 1100}],

  rating: null,

  badges: [{"label": "100 ml / 200 ml"}, {"label": "12 ingredients"}, {"label": "Hair Care"}],

  tagline: "Gently cleanses the scalp while keeping hair soft & nourished.",
  shortDescription: "A gentle cleansing shampoo that effectively cleanses the scalp and hair while helping maintain softness, freshness and healthy-looking hair.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A gentle cleansing shampoo that effectively cleanses the scalp and hair while helping maintain softness, freshness and healthy-looking hair."]}, {"id": "sizes", "heading": "Sizes", "bullets": ["100 ml — price on request", "200 ml — price on request"]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua", "note": "Listed in the product's ingredient list."}, {"name": "Real- Flaxseed", "note": "Listed in the product's ingredient list."}, {"name": "Hibiscus", "note": "Listed in the product's ingredient list."}, {"name": "Rosemary leaves blend", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua", "Real- Flaxseed", "Hibiscus", "Rosemary leaves blend", "Decyl glucoside", "Coco glucoside", "Cocamido-propyl betaine- Coconut Derived Surfactants", "Panthenol", "Hibiscus & rosemary Extract", "Glycerine", "Xanthan gum", "Preservative ECT"],

  howToUse: [{"title": "Step 1", "detail": "Apply to wet hair Massage for 1 - 2 minutes Rinse Off Repeat if needed."}],

  faqs: [{"q": "What is Veetree Seed-Petal Shampoo?", "a": "A gentle cleansing shampoo that effectively cleanses the scalp and hair while helping maintain softness, freshness and healthy-looking hair."}, {"q": "How do I use Seed-Petal Shampoo?", "a": "Apply to wet hair Massage for 1 - 2 minutes Rinse Off Repeat if needed."}, {"q": "What sizes does it come in?", "a": "It is available in 100 ml and 200 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua, Real- Flaxseed, Hibiscus, Rosemary leaves blend, Decyl glucoside."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Seed-Petal Shampoo | Hair Care",
    description: "A gentle cleansing shampoo that effectively cleanses the scalp and hair while helping maintain softness, freshness and healthy-looking hair.",
    canonical: "/products/seed-petal-shampoo",
  },

  inStock: true,
}
