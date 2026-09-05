import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Kumkumadi serum"
 */
export const kumkumadiSerum: Product = {
  slug: "kumkumadi-serum",
  name: "Kumkumadi Serum",
  brand: "Veetree",
  category: { label: "Face Care", href: "/collections/face-care" },
  collection: { label: "Face Serums", href: "/collections/face-serums" },

  variants: [{"size": "15 ml", "sku": "VT-KUMKUMADI-SERUM-15ML", "price": 277, "mrp": 330}, {"size": "20 ml", "sku": "VT-KUMKUMADI-SERUM-20ML", "price": 356, "mrp": 430}],

  images: [{"src": "/products/kumkumadi-serum.jpg", "alt": "Veetree Kumkumadi Serum in a glass dropper bottle with a gold cap, beside a brass lamp and saffron threads", "width": 1100, "height": 1100}],

  rating: null,

  badges: [{"label": "15 ml / 20 ml"}, {"label": "19 ingredients"}, {"label": "Face Care"}],

  tagline: "Helps improve skin radiance, uneven tone & dullness.",
  shortDescription: "A luxurious Ayurvedic-inspired facial serum infused with traditional botanicals to nourish the skin, enhance its natural glow and support a more even-looking complexion.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A luxurious Ayurvedic-inspired facial serum infused with traditional botanicals to nourish the skin, enhance its natural glow and support a more even-looking complexion."]}, {"id": "sizes", "heading": "Sizes", "bullets": ["15 ml — ₹277", "20 ml — ₹356"]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Purest grade of Sesame seed oil from organic farming", "note": "Listed in the product's ingredient list."}, {"name": "Dashmoola powder", "note": "Listed in the product's ingredient list."}, {"name": "(10 Herbs powder blend)", "note": "Listed in the product's ingredient list."}, {"name": "Saffron (Kumkuma/Kesar)", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Purest grade of Sesame seed oil from organic farming", "Dashmoola powder", "(10 Herbs powder blend)", "Saffron (Kumkuma/Kesar)", "Sandalwood (Chandana)", "Manjista", "Licorice (Yashtimadhu)", "Vetiver (Ushira)", "Indian Madder", "Lotus (Kamal)", "Banyan Bark (Vata)", "Sacred Fig Bark (Ashwattha)", "Plaksha Bark", "Lodhra", "Turmeric (Haridra)", "Country Rose", "Daruharidra", "Blue Water Lily (Neelotpala)", "Goat's Milk (used during traditional preparation)"],

  howToUse: [{"title": "Step 1", "detail": "Cleanse and dry your face."}, {"title": "Step 2", "detail": "Apply 2–3 drops to the face and neck."}, {"title": "Step 3", "detail": "Gently massage or pat until fully absorbed."}, {"title": "Step 4", "detail": "Leave overnight for best results (or) use 1hr before Face wash."}],

  faqs: [{"q": "What is Veetree Kumkumadi Serum?", "a": "A luxurious Ayurvedic-inspired facial serum infused with traditional botanicals to nourish the skin, enhance its natural glow and support a more even-looking complexion."}, {"q": "How do I use Kumkumadi Serum?", "a": "Cleanse and dry your face. Apply 2–3 drops to the face and neck. Gently massage or pat until fully absorbed. Leave overnight for best results (or) use 1hr before Face wash."}, {"q": "What sizes does it come in?", "a": "It is available in 15 ml and 20 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Purest grade of Sesame seed oil from organic farming, Dashmoola powder, (10 Herbs powder blend), Saffron (Kumkuma/Kesar), Sandalwood (Chandana)."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Kumkumadi Serum | Face Care",
    description: "A luxurious Ayurvedic-inspired facial serum infused with traditional botanicals to nourish the skin, enhance its natural glow and support a more even-.",
    canonical: "/products/kumkumadi-serum",
  },

  inStock: true,
}
