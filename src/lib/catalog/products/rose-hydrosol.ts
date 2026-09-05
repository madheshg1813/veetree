import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Rose hydrosol"
 */
export const roseHydrosol: Product = {
  slug: "rose-hydrosol",
  name: "Rose Hydrosol",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },
  collection: { label: "Hydrosols", href: "/collections/hydrosols" },

  variants: [{"size": "100 ml", "sku": "VT-ROSE-HYDROSOL", "price": 217, "mrp": 260}],

  images: [{"src": "/products/rose-hydrosol.jpg", "alt": "Veetree Rose Hydrosol in an amber spray bottle on a stone slab, surrounded by fresh pink garden roses and petals", "width": 732, "height": 1100}],

  rating: null,

  badges: [{"label": "100 ml"}, {"label": "Botanical blend"}, {"label": "Face Care"}],

  tagline: "Refreshes, hydrates & soothes skin with a gentle floral mist.",
  shortDescription: "A refreshing floral mist that instantly refreshes and hydrates the skin, leaving it soft, fresh and beautifully rejuvenated.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A refreshing floral mist that instantly refreshes and hydrates the skin, leaving it soft, fresh and beautifully rejuvenated."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "100% Pure Form of Rose Hydrosol through steam distillation process", "note": "Listed in the product's ingredient list."}, {"name": "Rose Essential oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["100% Pure Form of Rose Hydrosol through steam distillation process", "Rose Essential oil"],

  howToUse: [{"title": "Step 1", "detail": "Step 1: Close your eyes and spray 2 to 4 pumps onto a clean face and neck."}, {"title": "Step 2", "detail": "Step 2: Let it absorb naturally or gently pat into the skin with clean hands."}, {"title": "Step 3", "detail": "Follow with your serum or moisturizer."}, {"title": "Step 4", "detail": "Step 3: Use morning and night, or anytime during the day to refresh, hydrate, and soothe your skin."}, {"title": "Step 5", "detail": "Pro Tip: Use before applying your serum, facial oil, or moisturizer to help lock in hydration."}],

  faqs: [{"q": "What is Veetree Rose Hydrosol?", "a": "A refreshing floral mist that instantly refreshes and hydrates the skin, leaving it soft, fresh and beautifully rejuvenated."}, {"q": "How do I use Rose Hydrosol?", "a": "Step 1: Close your eyes and spray 2 to 4 pumps onto a clean face and neck. Step 2: Let it absorb naturally or gently pat into the skin with clean hands. Follow with your serum or moisturizer. Step 3: Use morning and night, or anytime during the day to refresh, hydrate, and soothe your skin."}, {"q": "What size is it?", "a": "100 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include 100% Pure Form of Rose Hydrosol through steam distillation process, Rose Essential oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Rose Hydrosol | Face Care",
    description: "A refreshing floral mist that instantly refreshes and hydrates the skin, leaving it soft, fresh and beautifully rejuvenated.",
    canonical: "/products/rose-hydrosol",
  },

  inStock: true,
}
