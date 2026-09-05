import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Kumkumayadi night cream" — pack reads KUMKUMAYADI, so the
 * sheet spelling is correct and is kept.
 */
export const kumkumayadiNightCream: Product = {
  slug: "kumkumayadi-night-cream",
  name: "Kumkumayadi Night Cream",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },

  variants: [{"size": "30 g", "sku": "VT-KUMKUMAYADI-NIGHT-CREAM", "price": 369, "mrp": 440}],

  images: [{"src": "/products/kumkumayadi-night-cream.jpg", "alt": "Veetree Kumkumayadi Night Cream in a black glass jar on a stone plinth, beside saffron threads, rose petals and a brass lamp", "width": 788, "height": 1400}],

  rating: null,

  badges: [{"label": "30 g"}, {"label": "11 ingredients"}, {"label": "Face Care"}],

  tagline: "Nourishes skin overnight while supporting a brighter, even-looking complexion.",
  shortDescription: "A nourishing night cream that works while you sleep to improve the appearance of dullness and hyperpigmentation, leaving the skin soft, moisturised and naturally radiant.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A nourishing night cream that works while you sleep to improve the appearance of dullness and hyperpigmentation, leaving the skin soft, moisturised and naturally radiant.", "Special Tip:."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua", "note": "Listed in the product's ingredient list."}, {"name": "Rose hydrosol", "note": "Listed in the product's ingredient list."}, {"name": "Kumkumadi Thailam", "note": "Listed in the product's ingredient list."}, {"name": ":18+ Herbs blend", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua", "Rose hydrosol", "Kumkumadi Thailam", ":18+ Herbs blend", "Kashmiri Saffron", "E wax", "Manjistha & Licorice root Extracts", "24k Gold", "Vit E", "Rose Oil", "ECO Preservative"],

  howToUse: [{"title": "Step 1", "detail": "Cleanse your face and pat dry."}, {"title": "Step 2", "detail": "Apply a small amount of Kumkumayadi Night Cream to the face and neck."}, {"title": "Step 3", "detail": "Gently massage until fully absorbed."}, {"title": "Step 4", "detail": "Use every night as the last step of your skincare routine."}, {"title": "Step 5", "detail": "For dry skin - Apply 2–3 drops of Kumkumadi Serum before using the Kumkumayadi Night Cream for added nourishment."}, {"title": "Step 6", "detail": "For oily skin - use a lightweight water-based serum before the cream, if needed."}],

  faqs: [{"q": "What is Veetree Kumkumayadi Night Cream?", "a": "A nourishing night cream that works while you sleep to improve the appearance of dullness and hyperpigmentation, leaving the skin soft, moisturised and naturally radiant."}, {"q": "How do I use Kumkumadi Night Cream?", "a": "Cleanse your face and pat dry. Apply a small amount of Kumkumayadi Night Cream to the face and neck. Gently massage until fully absorbed. Use every night as the last step of your skincare routine."}, {"q": "What size is it?", "a": "30 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua, Rose hydrosol, Kumkumadi Thailam, :18+ Herbs blend, Kashmiri Saffron."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Kumkumayadi Night Cream | Face Care",
    description: "A nourishing night cream that works while you sleep to improve the appearance of dullness and hyperpigmentation, leaving the skin soft, moisturised an.",
    canonical: "/products/kumkumayadi-night-cream",
  },

  inStock: true,
}
