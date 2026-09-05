import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Paucholi shower gel"
 */
export const patchouliShowerGel: Product = {
  slug: "patchouli-shower-gel",
  name: "Patchouli Shower Gel",
  brand: "Veetree",
  category: { label: "Body Care", href: "/collections/body-care" },

  variants: [{"size": "100 ml", "sku": "VT-PATCHOULI-SHOWER-GEL-100ML", "price": 198, "mrp": 240}, {"size": "200 ml", "sku": "VT-PATCHOULI-SHOWER-GEL-200ML", "price": 386, "mrp": 460}],

  images: [{"src": "/products/patchouli-shower-gel.jpg", "alt": "Veetree Patchouli Shower Gel in an amber bottle on a stone slab with dried lavender buds and sprigs", "width": 619, "height": 1100}],

  rating: null,

  badges: [{"label": "100 ml / 200 ml"}, {"label": "10 ingredients"}, {"label": "Body Care"}],

  tagline: "Gently cleanses the body while leaving skin refreshed and fragrant.",
  shortDescription: "A refreshing shower gel that gently cleanses away impurities while leaving the skin feeling fresh, soft, clean and beautifully refreshed.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A refreshing shower gel that gently cleanses away impurities while leaving the skin feeling fresh, soft, clean and beautifully refreshed."]}, {"id": "sizes", "heading": "Sizes", "bullets": ["100 ml — price on request", "200 ml — price on request"]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua", "note": "Listed in the product's ingredient list."}, {"name": "Lavender buds infused", "note": "Listed in the product's ingredient list."}, {"name": "Decyl glucoside", "note": "Listed in the product's ingredient list."}, {"name": "Coco glucoside", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua", "Lavender buds infused", "Decyl glucoside", "Coco glucoside", "Cocamido-propyl betaine- Coconut Derived Surfactants", "Panthenol", "Glycerine", "Xanthan gum", "patchouli essential oil", "Preservative ECO"],

  howToUse: [{"title": "Step 1", "detail": "Squeeze the required amount Lather & Gently Cleanse Rinse Off."}],

  faqs: [{"q": "What is Veetree Patchouli Shower Gel?", "a": "A refreshing shower gel that gently cleanses away impurities while leaving the skin feeling fresh, soft, clean and beautifully refreshed."}, {"q": "How do I use Patchouli Shower Gel?", "a": "Squeeze the required amount Lather & Gently Cleanse Rinse Off."}, {"q": "What sizes does it come in?", "a": "It is available in 100 ml and 200 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua, Lavender buds infused, Decyl glucoside, Coco glucoside, Cocamido-propyl betaine- Coconut Derived Surfactants."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Patchouli Shower Gel | Body Care",
    description: "A refreshing shower gel that gently cleanses away impurities while leaving the skin feeling fresh, soft, clean and beautifully refreshed.",
    canonical: "/products/patchouli-shower-gel",
  },

  inStock: true,
}
