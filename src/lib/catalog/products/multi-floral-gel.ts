import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Multi floral gel"
 */
export const multiFloralGel: Product = {
  slug: "multi-floral-gel",
  name: "Multi-Floral Gel",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },

  variants: [{"size": "30 ml", "sku": "VT-MULTI-FLORAL-GEL", "price": 318, "mrp": 380}],

  images: [{"src": "/products/multi-floral-gel.jpg", "alt": "Veetree Multi-Floral Gel in a pump bottle beside a red hibiscus flower and blue butterfly pea blooms", "width": 1100, "height": 1100}],

  rating: null,

  badges: [{"label": "30 ml"}, {"label": "13 ingredients"}, {"label": "Face Care"}],

  tagline: "Provides lightweight hydration while refreshing & soothing skin.",
  shortDescription: "A delicate floral-infused gel that refreshes and hydrates the skin while leaving it soft, supple and naturally radiant.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A delicate floral-infused gel that refreshes and hydrates the skin while leaving it soft, supple and naturally radiant."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua", "note": "Listed in the product's ingredient list."}, {"name": "Aloevera leaf", "note": "Listed in the product's ingredient list."}, {"name": "Floral Extracts", "note": "Listed in the product's ingredient list."}, {"name": "Panthenol", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua", "Aloevera leaf", "Floral Extracts", "Panthenol", "Glycerine", "Pomegranate & Bakuchiol oil", "Blue pea", "& Hibiscus extract", "Vit E", "Hyaluronic acid", "Copper tripeptide", "Xanthan gum", "Ecocert preservative"],

  howToUse: [{"title": "Step 1", "detail": "Cleanse your face thoroughly."}, {"title": "Step 2", "detail": "Apply a thin layer of Multi Floral Gel to the face and neck."}, {"title": "Step 3", "detail": "Gently massage until fully absorbed."}, {"title": "Step 4", "detail": "Use morning and night for best results."}, {"title": "Step 5", "detail": "Follow with a moisturizer if needed."}, {"title": "Step 6", "detail": "Apply sunscreen during the daytime."}],

  faqs: [{"q": "What is Veetree Multi-Floral Gel?", "a": "A delicate floral-infused gel that refreshes and hydrates the skin while leaving it soft, supple and naturally radiant."}, {"q": "How do I use Multi-Floral Gel?", "a": "Cleanse your face thoroughly. Apply a thin layer of Multi Floral Gel to the face and neck. Gently massage until fully absorbed. Use morning and night for best results."}, {"q": "What size is it?", "a": "30 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua, Aloevera leaf, Floral Extracts, Panthenol, Glycerine."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Multi-Floral Gel | Face Care",
    description: "A delicate floral-infused gel that refreshes and hydrates the skin while leaving it soft, supple and naturally radiant.",
    canonical: "/products/multi-floral-gel",
  },

  inStock: true,
}
