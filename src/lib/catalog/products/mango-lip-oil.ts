import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Mango Lip Oil"
 */
export const mangoLipOil: Product = {
  slug: "mango-lip-oil",
  name: "Mango Lip Oil",
  brand: "Veetree",
  category: { label: "Lip Care", href: "/collections/lip-care" },

  variants: [{"size": "10 ml", "sku": "VT-MANGO-LIP-OIL", "price": 159, "mrp": 190}],

  images: [{"src": "/products/mango-lip-oil.jpg", "alt": "Veetree Mango Lip Oil in an amber roll-on bottle on a wooden stand, beside a cut mango and a brass diffuser", "width": 880, "height": 1100}],

  rating: null,

  badges: [{"label": "10 ml"}, {"label": "7 ingredients"}, {"label": "Lip Care"}],

  tagline: "Nourishes and hydrates lips for a soft, glossy finish.",
  shortDescription: "Deeply nourishes and softens dry lips while giving them a smooth, healthy-looking finish.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["Deeply nourishes and softens dry lips while giving them a smooth, healthy-looking finish."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Mango Butter", "note": "Listed in the product's ingredient list."}, {"name": "Almond oil", "note": "Listed in the product's ingredient list."}, {"name": "Rosehip oil", "note": "Listed in the product's ingredient list."}, {"name": "Flaxseed oil Rich in Omega-3 fatty acids", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Mango Butter", "Almond oil", "Rosehip oil", "Flaxseed oil Rich in Omega-3 fatty acids", "Olive oil", "Vitamin E oil", "Saffron pure grade"],

  howToUse: [{"title": "Step 1", "detail": "Apply to clean, dry lips."}, {"title": "Step 2", "detail": "Press or rub your lips together gently to distribute the oil evenly."}, {"title": "Step 3", "detail": "Reapply whenever needed to lock in moisture and help improve the appearance of dry, dull & pigmented lips."}, {"title": "Step 4", "detail": "Suitable for daily use."}],

  faqs: [{"q": "What is Veetree Mango Lip Oil?", "a": "Deeply nourishes and softens dry lips while giving them a smooth, healthy-looking finish."}, {"q": "How do I use Mango Lip Oil?", "a": "Apply to clean, dry lips. Press or rub your lips together gently to distribute the oil evenly. Reapply whenever needed to lock in moisture and help improve the appearance of dry, dull & pigmented lips. Suitable for daily use."}, {"q": "What size is it?", "a": "10 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Mango Butter, Almond oil, Rosehip oil, Flaxseed oil Rich in Omega-3 fatty acids, Olive oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Mango Lip Oil | Lip Care",
    description: "Deeply nourishes and softens dry lips while giving them a smooth, healthy-looking finish.",
    canonical: "/products/mango-lip-oil",
  },

  inStock: true,
}
