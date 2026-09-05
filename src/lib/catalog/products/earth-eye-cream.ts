import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Earth eye cream"
 */
export const earthEyeCream: Product = {
  slug: "earth-eye-cream",
  name: "Earth Eye Cream",
  brand: "Veetree",
  category: { label: "Eye Care", href: "/collections/eye-care" },

  variants: [{"size": "15 g", "sku": "VT-EARTH-EYE-CREAM", "price": 249, "mrp": 300}],

  images: [{"src": "/products/earth-eye-cream.jpg", "alt": "Veetree Earth Eye Cream in a small black jar on a wooden coaster, beside a lit brass lamp", "width": 929, "height": 1400}],

  rating: null,

  badges: [{"label": "15 g"}, {"label": "11 ingredients"}, {"label": "Eye Care"}],

  tagline: "Moisturizes, controls dark circles & reduces puffiness.",
  shortDescription: "Provides nourishing hydration to the under-eye area and helps reduce the appearance of dark, tired and dull-looking eyes.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["Provides nourishing hydration to the under-eye area and helps reduce the appearance of dark, tired and dull-looking eyes."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua", "note": "Listed in the product's ingredient list."}, {"name": "Herbs infusion", "note": "Listed in the product's ingredient list."}, {"name": "Bakuchiol oil", "note": "Listed in the product's ingredient list."}, {"name": "Kashmiri Saffron", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua", "Herbs infusion", "Bakuchiol oil", "Kashmiri Saffron", "Rosehip & Almond oil", "Shea butter", "E wax", "Xanthan gum", "Tocopherol", "neroli Oil", "ECO Preservative"],

  howToUse: [{"title": "Step 1", "detail": "Step 1: Take a pea-sized amount of Under Eye Cream & apply underneath your eye & around the brow bone."}, {"title": "Step 2", "detail": "Step 2: Gently pat as you let the cream absorb."}, {"title": "Step 3", "detail": "Do not let it close to the lids."}, {"title": "Step 4", "detail": "Make this part of your daily regime to get healthy skin under your eyes."}, {"title": "Step 5", "detail": "Disclaimer - Formulations containing natural ingredients tend to change color over time."}, {"title": "Step 6", "detail": "However, the product efficacy remains unchanged."}],

  faqs: [{"q": "What is Veetree Earth Eye Cream?", "a": "Provides nourishing hydration to the under-eye area and helps reduce the appearance of dark, tired and dull-looking eyes."}, {"q": "How do I use Earth Eye Cream?", "a": "Step 1: Take a pea-sized amount of Under Eye Cream & apply underneath your eye & around the brow bone. Step 2: Gently pat as you let the cream absorb. Do not let it close to the lids. Make this part of your daily regime to get healthy skin under your eyes."}, {"q": "What size is it?", "a": "15 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua, Herbs infusion, Bakuchiol oil, Kashmiri Saffron, Rosehip & Almond oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Earth Eye Cream | Eye Care",
    description: "Provides nourishing hydration to the under-eye area and helps reduce the appearance of dark, tired and dull-looking eyes.",
    canonical: "/products/earth-eye-cream",
  },

  inStock: true,
}
