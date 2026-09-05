import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Ritual body oil"
 */
export const ritualBodyOil: Product = {
  slug: "ritual-body-oil",
  name: "Ritual Body Oil",
  brand: "Veetree",
  category: { label: "Body Care", href: "/collections/body-care" },

  variants: [{"size": "50 ml", "sku": "VT-RITUAL-BODY-OIL", "price": 398, "mrp": 480}],

  images: [{"src": "/products/ritual-body-oil.jpg", "alt": "Veetree Ritual Body Oil in a 50 ml amber pump bottle on a stone slab, with almonds, carrot, beetroot, saffron and herbal roots", "width": 933, "height": 1400}],

  rating: null,

  badges: [{"label": "50 ml"}, {"label": "10 ingredients"}, {"label": "Body Care"}],

  tagline: "Deeply moisturizes the body and leaves skin soft, smooth & supple.",
  shortDescription: "A luxurious body oil that deeply nourishes and moisturises the skin, leaving it soft, supple, smooth and beautifully glowing.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A luxurious body oil that deeply nourishes and moisturises the skin, leaving it soft, supple, smooth and beautifully glowing."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Wood pressed sesame seed oil", "note": "Listed in the product's ingredient list."}, {"name": "jojoba Oil", "note": "Listed in the product's ingredient list."}, {"name": "Almond Oil", "note": "Listed in the product's ingredient list."}, {"name": "Moringa seed Oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Wood pressed sesame seed oil", "jojoba Oil", "Almond Oil", "Moringa seed Oil", "Papaya", "Carrot", "Beetroot Extracts", "Manjista & Licorice infusion", "Vitamin E Oil", "original Saffron & Lavender Essential Oil"],

  howToUse: [{"title": "Step 1", "detail": "Apply generously all over the body to dry skin 1 hour before bathing."}, {"title": "Step 2", "detail": "Gently massage in circular motions until evenly absorbed."}, {"title": "Step 3", "detail": "Rinse off during your bath or shower."}, {"title": "Step 4", "detail": "Use 2–3 times a week or as needed for soft, smooth, and nourished skin."}],

  faqs: [{"q": "What is Veetree Ritual Body Oil?", "a": "A luxurious body oil that deeply nourishes and moisturises the skin, leaving it soft, supple, smooth and beautifully glowing."}, {"q": "How do I use Ritual Body Oil?", "a": "Apply generously all over the body to dry skin 1 hour before bathing. Gently massage in circular motions until evenly absorbed. Rinse off during your bath or shower. Use 2–3 times a week or as needed for soft, smooth, and nourished skin."}, {"q": "What size is it?", "a": "50 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Wood pressed sesame seed oil, jojoba Oil, Almond Oil, Moringa seed Oil, Papaya."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Ritual Body Oil | Body Care",
    description: "A luxurious body oil that deeply nourishes and moisturises the skin, leaving it soft, supple, smooth and beautifully glowing.",
    canonical: "/products/ritual-body-oil",
  },

  inStock: true,
}
