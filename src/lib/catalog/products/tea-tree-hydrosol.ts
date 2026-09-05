import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Teatree Hydrosol"
 */
export const teaTreeHydrosol: Product = {
  slug: "tea-tree-hydrosol",
  name: "Tea Tree Hydrosol",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },
  collection: { label: "Hydrosols", href: "/collections/hydrosols" },

  variants: [{"size": "100 ml", "sku": "VT-TEA-TREE-HYDROSOL", "price": 318, "mrp": 380}],

  images: [{"src": "/products/tea-tree-hydrosol.jpg", "alt": "Veetree Tea Tree Hydrosol in a 100 ml amber spray bottle on a stone ledge, surrounded by fresh tea tree sprigs", "width": 932, "height": 1400}],

  rating: null,

  badges: [{"label": "100 ml"}, {"label": "Botanical blend"}, {"label": "Face Care"}],

  tagline: "Refreshes skin and helps maintain a clean, balanced feel.",
  shortDescription: "A refreshing botanical mist that helps keep the skin feeling clean, fresh and balanced while providing lightweight hydration.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A refreshing botanical mist that helps keep the skin feeling clean, fresh and balanced while providing lightweight hydration."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "100% Pure Form of Teatree Hydrosol through steam distillation process", "note": "Listed in the product's ingredient list."}, {"name": "Teatree Essential oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["100% Pure Form of Teatree Hydrosol through steam distillation process", "Teatree Essential oil"],

  howToUse: [{"title": "Step 1", "detail": "Step 1: Close your eyes and spray 2 to 4 pumps onto a clean face and neck (Acne Care), avoiding direct contact with the eyes."}, {"title": "Step 2", "detail": "For scalp use, part your hair and spray directly onto a clean scalp (Dandruff Care)."}, {"title": "Step 3", "detail": "Step 2: Let it absorb naturally after spraying."}, {"title": "Step 4", "detail": "On the scalp, gently massage with your fingertips."}, {"title": "Step 5", "detail": "Follow with Veetree Aloevera gel (Acne care) facial use."}, {"title": "Step 6", "detail": "Step 3: Use morning and night or anytime during the day to refresh, soothe and balance oily or acne-prone skin."}],

  faqs: [{"q": "What is Veetree Tea Tree Hydrosol?", "a": "A refreshing botanical mist that helps keep the skin feeling clean, fresh and balanced while providing lightweight hydration."}, {"q": "How do I use Tea Tree Hydrosol?", "a": "Step 1: Close your eyes and spray 2 to 4 pumps onto a clean face and neck (Acne Care), avoiding direct contact with the eyes. For scalp use, part your hair and spray directly onto a clean scalp (Dandruff Care). Step 2: Let it absorb naturally after spraying. On the scalp, gently massage with your fingertips."}, {"q": "What size is it?", "a": "100 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include 100% Pure Form of Teatree Hydrosol through steam distillation process, Teatree Essential oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Tea Tree Hydrosol | Face Care",
    description: "A refreshing botanical mist that helps keep the skin feeling clean, fresh and balanced while providing lightweight hydration.",
    canonical: "/products/tea-tree-hydrosol",
  },

  inStock: true,
}
