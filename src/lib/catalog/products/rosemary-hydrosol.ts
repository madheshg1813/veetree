import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Rosemary Hydrosol"
 */
export const rosemaryHydrosol: Product = {
  slug: "rosemary-hydrosol",
  name: "Rosemary Hydrosol",
  brand: "Veetree",
  category: { label: "Hair Care", href: "/collections/hair-care" },
  collection: { label: "Hydrosols", href: "/collections/hydrosols" },

  variants: [{"size": "100 ml", "sku": "VT-ROSEMARY-HYDROSOL", "price": 279, "mrp": 330}],

  images: [{"src": "/products/rosemary-hydrosol.jpg", "alt": "Veetree Rosemary Hydrosol in an amber spray bottle beside fresh flowering rosemary sprigs", "width": 732, "height": 1100}],

  rating: null,

  badges: [{"label": "100 ml"}, {"label": "Botanical blend"}, {"label": "Hair Care"}],

  tagline: "Refreshes the scalp & supports a healthy hair-care routine.",
  shortDescription: "A refreshing scalp mist that helps revitalise the scalp, keep it feeling fresh and support a healthy-looking scalp and hair care routine.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A refreshing scalp mist that helps revitalise the scalp, keep it feeling fresh and support a healthy-looking scalp and hair care routine."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "100% Pure Form of Rosemary Hydrosol through steam distillation process", "note": "Listed in the product's ingredient list."}, {"name": "Rosemary Essential oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["100% Pure Form of Rosemary Hydrosol through steam distillation process", "Rosemary Essential oil"],

  howToUse: [{"title": "Step 1", "detail": "Spray directly onto the scalp and hair roots."}, {"title": "Step 2", "detail": "Gently massage for 1–2 minutes."}, {"title": "Step 3", "detail": "Use every morning and night on clean scalp and hair."}, {"title": "Step 4", "detail": "Do not rinse. Style as usual."}],

  faqs: [{"q": "What is Veetree Rosemary Hydrosol?", "a": "A refreshing scalp mist that helps revitalise the scalp, keep it feeling fresh and support a healthy-looking scalp and hair care routine."}, {"q": "How do I use Rosemary Hydrosol?", "a": "Spray directly onto the scalp and hair roots. Gently massage for 1–2 minutes. Use every morning and night on clean scalp and hair. Do not rinse. Style as usual."}, {"q": "What size is it?", "a": "100 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include 100% Pure Form of Rosemary Hydrosol through steam distillation process, Rosemary Essential oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Rosemary Hydrosol | Hair Care",
    description: "A refreshing scalp mist that helps revitalise the scalp, keep it feeling fresh and support a healthy-looking scalp and hair care routine.",
    canonical: "/products/rosemary-hydrosol",
  },

  inStock: true,
}
