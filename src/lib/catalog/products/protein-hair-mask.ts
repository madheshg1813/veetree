import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Protein Hair pack"
 */
export const proteinHairMask: Product = {
  slug: "protein-hair-mask",
  name: "Protein Hair Mask",
  brand: "Veetree",
  category: { label: "Hair Care", href: "/collections/hair-care" },

  variants: [{"size": "100 g", "sku": "VT-PROTEIN-HAIR-MASK", "price": 288, "mrp": 350}],

  images: [{"src": "/products/protein-hair-mask.jpg", "alt": "Veetree Protein Hair Mask in a stand-up pouch beside amla, a red hibiscus flower, dried hibiscus and herbal powders", "width": 788, "height": 1400}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "18 ingredients"}, {"label": "Hair Care"}],

  tagline: "Deeply conditions & strengthens hair for smoother, healthier-looking strands.",
  shortDescription: "A nourishing hair treatment that helps strengthen weak, damaged hair, improve smoothness and reduce the appearance of breakage, leaving hair soft, manageable and healthier-looking.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A nourishing hair treatment that helps strengthen weak, damaged hair, improve smoothness and reduce the appearance of breakage, leaving hair soft, manageable and healthier-looking.", "Special Tip: For best results, avoid oiling your hair before applying the Protein Hair Pack. Apply the pack to a clean scalp and hair."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Arappu leaves", "note": "Listed in the product's ingredient list."}, {"name": "Curry leaves", "note": "Listed in the product's ingredient list."}, {"name": "Hibiscus flowers & leaves", "note": "Listed in the product's ingredient list."}, {"name": "Henna", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Arappu leaves", "Curry leaves", "Hibiscus flowers & leaves", "Henna", "Moringa", "karumbula", "Neem", "Bhringraj", "Indigo", "aloevera leaf", "Raw rice", "Fenugreek", "kalonji", "Flaxseed", "sesame seeds", "Rosemary", "vetiver", "Vasambu"],

  howToUse: [{"title": "Step 1", "detail": "Mix the required amount of Protein Hair Pack Powder with warm water to form a smooth paste."}, {"title": "Step 2", "detail": "Apply evenly to the scalp and hair from roots to ends."}, {"title": "Step 3", "detail": "Leave on for 20–30 minutes."}, {"title": "Step 4", "detail": "Rinse thoroughly with water and follow with a mild shampoo if needed."}, {"title": "Step 5", "detail": "Use 1–2 times a week for best results."}],

  faqs: [{"q": "What is Veetree Protein Hair Mask?", "a": "A nourishing hair treatment that helps strengthen weak, damaged hair, improve smoothness and reduce the appearance of breakage, leaving hair soft, manageable and healthier-looking."}, {"q": "How do I use Protein Hair Pack?", "a": "Mix the required amount of Protein Hair Pack Powder with warm water to form a smooth paste. Apply evenly to the scalp and hair from roots to ends. Leave on for 20–30 minutes. Rinse thoroughly with water and follow with a mild shampoo if needed."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Arappu leaves, Curry leaves, Hibiscus flowers & leaves, Henna, Moringa."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Protein Hair Mask | Hair Care",
    description: "A nourishing hair treatment that helps strengthen weak, damaged hair, improve smoothness and reduce the appearance of breakage, leaving hair soft, man.",
    canonical: "/products/protein-hair-mask",
  },

  inStock: true,
}
