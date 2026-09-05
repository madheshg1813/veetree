import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Face Brightening Pack"
 */
export const faceBrighteningPack: Product = {
  slug: "face-brightening-pack",
  name: "Face Brightening Pack",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },

  variants: [{"size": "100 g", "sku": "VT-FACE-BRIGHTENING-PACK", "price": 239, "mrp": 290}],

  images: [{"src": "/products/face-brightening-pack.jpg", "alt": "Veetree Face Brightening Pack in a stand-up pouch beside liquorice root, turmeric powder and dried rose petals", "width": 1049, "height": 1400}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "18 ingredients"}, {"label": "Face Care"}],

  tagline: "Naturally helps detan, brighten & restore your skin's natural glow.",
  shortDescription: "A gentle herbal face pack enriched with natural botanicals to refresh, brighten and revive dull-looking skin, leaving it soft, smooth and radiant.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A gentle herbal face pack enriched with natural botanicals to refresh, brighten and revive dull-looking skin, leaving it soft, smooth and radiant."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Green gram", "note": "Listed in the product's ingredient list."}, {"name": "Raw rice", "note": "Listed in the product's ingredient list."}, {"name": "Oats", "note": "Listed in the product's ingredient list."}, {"name": "Flaxseeds", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Green gram", "Raw rice", "Oats", "Flaxseeds", "Almond", "Red mysoor dal", "chickpeas", "Fenugreek", "Wheat flour", "Licorice", "Manjista", "Nutmeg", "Avarampoo (Tanner's cassia)", "Hibiscus flower", "Damask Rose", "Potato", "papaya", "Beetroot"],

  howToUse: [{"title": "Step 1", "detail": "Cleanse your face thoroughly."}, {"title": "Step 2", "detail": "Apply an even layer to the face and neck, avoiding the eye and lip area."}, {"title": "Step 3", "detail": "Leave on for 10 to 15 minutes or until partially dry."}, {"title": "Step 4", "detail": "Rinse off with lukewarm water and pat dry."}, {"title": "Step 5", "detail": "Use 2 to 3 times a week for best results."}],

  faqs: [{"q": "What is Veetree Face Brightening Pack?", "a": "A gentle herbal face pack enriched with natural botanicals to refresh, brighten and revive dull-looking skin, leaving it soft, smooth and radiant."}, {"q": "How do I use Face Brightening Pack?", "a": "Cleanse your face thoroughly. Apply an even layer to the face and neck, avoiding the eye and lip area. Leave on for 10 to 15 minutes or until partially dry. Rinse off with lukewarm water and pat dry."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Green gram, Raw rice, Oats, Flaxseeds, Almond."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Face Brightening Pack | Face Care",
    description: "A gentle herbal face pack enriched with natural botanicals to refresh, brighten and revive dull-looking skin, leaving it soft, smooth and radiant.",
    canonical: "/products/face-brightening-pack",
  },

  inStock: true,
}
