import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "under-eye serum"
 */
export const underEyeSerum: Product = {
  slug: "under-eye-serum",
  name: "Under-Eye Serum",
  brand: "Veetree",
  category: { label: "Eye Care", href: "/collections/eye-care" },

  variants: [{"size": "10 ml", "sku": "VT-UNDER-EYE-SERUM", "price": 188, "mrp": 230}],

  images: [{"src": "/products/under-eye-serum.jpg", "alt": "Veetree Under-Eye Serum in an amber roll-on bottle on a stone plinth, beside almonds, green olives and a halved pomegranate", "width": 934, "height": 1400}],

  rating: null,

  badges: [{"label": "10 ml"}, {"label": "8 ingredients"}, {"label": "Eye Care"}],

  tagline: "Nourish the delicate under-eye area & helps it look refreshed.",
  shortDescription: "Helps hydrate and refresh the delicate under-eye area while improving the appearance of dullness, fine lines and tired-looking eyes.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["Helps hydrate and refresh the delicate under-eye area while improving the appearance of dullness, fine lines and tired-looking eyes."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Pomegranate seed oil", "note": "Listed in the product's ingredient list."}, {"name": "Almond oil", "note": "Listed in the product's ingredient list."}, {"name": "Rosehip oil", "note": "Listed in the product's ingredient list."}, {"name": "Olive oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Pomegranate seed oil", "Almond oil", "Rosehip oil", "Olive oil", "Castor seed oil", "Nutmeg & Vit E oil", "Tamanu oil", "Sandalwood & Neroli E Oil"],

  howToUse: [{"title": "Step 1", "detail": "Apply to clean, dry skin around the under-eye area using the roll-on applicator."}, {"title": "Step 2", "detail": "Gently pat with your fingertips until fully absorbed."}, {"title": "Step 3", "detail": "At night, apply before any serum or moisturizer."}, {"title": "Step 4", "detail": "Use daily for best results."}],

  faqs: [{"q": "What is Veetree Under-Eye Serum?", "a": "Helps hydrate and refresh the delicate under-eye area while improving the appearance of dullness, fine lines and tired-looking eyes."}, {"q": "How do I use Under-Eye Serum?", "a": "Apply to clean, dry skin around the under-eye area using the roll-on applicator. Gently pat with your fingertips until fully absorbed. At night, apply before any serum or moisturizer. Use daily for best results."}, {"q": "What size is it?", "a": "10 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Pomegranate seed oil, Almond oil, Rosehip oil, Olive oil, Castor seed oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Under-Eye Serum | Eye Care",
    description: "Helps hydrate and refresh the delicate under-eye area while improving the appearance of dullness, fine lines and tired-looking eyes.",
    canonical: "/products/under-eye-serum",
  },

  inStock: true,
}
