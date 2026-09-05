import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Aloevera gel"
 */
export const aloeVeraGel: Product = {
  slug: "aloe-vera-gel",
  name: "Aloe Vera Gel",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },

  variants: [{"size": "100 g", "sku": "VT-ALOE-VERA-GEL", "price": 279, "mrp": 330}],

  images: [{"src": "/products/aloe-vera-gel.jpg", "alt": "Veetree Aloe Vera Gel in a black jar on a stone plinth, beside fresh cut aloe leaves", "width": 733, "height": 1100}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "4 ingredients"}, {"label": "Face Care"}],

  tagline: "Soothes, hydrates & refreshes dry / irritated skin.",
  shortDescription: "A soothing, lightweight gel that provides refreshing hydration and helps calm and soften the skin, making it ideal for everyday skincare.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A soothing, lightweight gel that provides refreshing hydration and helps calm and soften the skin, making it ideal for everyday skincare.", "Suitable for: Face, Body & Scalp.", "DIY:.", "Or to help calm irritated skin and hydrate the scalp."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aloe Barbadensis (Aloe vera) juice", "note": "Listed in the product's ingredient list."}, {"name": "Xanthan gum", "note": "Listed in the product's ingredient list."}, {"name": "Guar Gum", "note": "Listed in the product's ingredient list."}, {"name": "Geogard ECT (Ecocert/Cosmos approved natural preservative)", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aloe Barbadensis (Aloe vera) juice", "Xanthan gum", "Guar Gum", "Geogard ECT (Ecocert/Cosmos approved natural preservative)"],

  howToUse: [{"title": "Step 1", "detail": "Apply a small amount to clean skin or scalp."}, {"title": "Step 2", "detail": "Gently massage until fully absorbed."}, {"title": "Step 3", "detail": "Leave on—no need to rinse."}, {"title": "Step 4", "detail": "Use daily or as needed."}, {"title": "Step 5", "detail": "Can be used as a lightweight moisturizer, after-sun soothing gel."}, {"title": "Step 6", "detail": "Add Veetree Protein hair pack powder, few water and aloe vera gel and mix it into a paste to make a hair mask."}],

  faqs: [{"q": "What is Veetree Aloe Vera Gel?", "a": "A soothing, lightweight gel that provides refreshing hydration and helps calm and soften the skin, making it ideal for everyday skincare."}, {"q": "How do I use Aloe Vera Gel?", "a": "Apply a small amount to clean skin or scalp. Gently massage until fully absorbed. Leave on—no need to rinse. Use daily or as needed."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aloe Barbadensis (Aloe vera) juice, Xanthan gum, Guar Gum, Geogard ECT (Ecocert/Cosmos approved natural preservative)."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Aloe Vera Gel | Face Care",
    description: "A soothing, lightweight gel that provides refreshing hydration and helps calm and soften the skin, making it ideal for everyday skincare.",
    canonical: "/products/aloe-vera-gel",
  },

  inStock: true,
}
