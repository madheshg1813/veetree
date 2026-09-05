import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Saffron gel"
 */
export const saffronGel: Product = {
  slug: "saffron-gel",
  name: "Saffron Gel",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },

  variants: [{"size": "100 g", "sku": "VT-SAFFRON-GEL", "price": 289, "mrp": 350}],

  images: [{"src": "/products/saffron-gel.jpg", "alt": "Veetree Saffron Gel in a black jar with a lilac label, beside saffron crocus flowers, saffron threads and rosehips", "width": 933, "height": 1400}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "5 ingredients"}, {"label": "Face Care"}],

  tagline: "Helps brighten the skin & enhance its natural glow.",
  shortDescription: "A refreshing gel enriched with the goodness of saffron to hydrate, revitalise and enhance the skin’s natural-looking radiance.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A refreshing gel enriched with the goodness of saffron to hydrate, revitalise and enhance the skin’s natural-looking radiance."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua (kashmiri Saffron infused)", "note": "Listed in the product's ingredient list."}, {"name": "Rosehip oil", "note": "Listed in the product's ingredient list."}, {"name": "Xanthan gum", "note": "Listed in the product's ingredient list."}, {"name": "Guar Gum", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua (kashmiri Saffron infused)", "Rosehip oil", "Xanthan gum", "Guar Gum", "Geogard ECT (Ecocert/Cosmos approved natural preservative)"],

  howToUse: [{"title": "Step 1", "detail": "Apply a small amount to clean face and neck."}, {"title": "Step 2", "detail": "Gently massage until fully absorbed."}, {"title": "Step 3", "detail": "Leave on—no need to rinse."}, {"title": "Step 4", "detail": "Use morning and night for best results."}, {"title": "Step 5", "detail": "Suitable for: All Skin Types."}, {"title": "Step 6", "detail": "Tip: Follow with sunscreen during the day for best results."}],

  faqs: [{"q": "What is Veetree Saffron Gel?", "a": "A refreshing gel enriched with the goodness of saffron to hydrate, revitalise and enhance the skin’s natural-looking radiance."}, {"q": "How do I use Saffron Gel?", "a": "Apply a small amount to clean face and neck. Gently massage until fully absorbed. Leave on—no need to rinse. Use morning and night for best results."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua (kashmiri Saffron infused), Rosehip oil, Xanthan gum, Guar Gum, Geogard ECT (Ecocert/Cosmos approved natural preservative)."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Saffron Gel | Face Care",
    description: "A refreshing gel enriched with the goodness of saffron to hydrate, revitalise and enhance the skin’s natural-looking radiance.",
    canonical: "/products/saffron-gel",
  },

  inStock: true,
}
