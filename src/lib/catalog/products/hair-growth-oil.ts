import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Hair Growth Oil"
 */
export const hairGrowthOil: Product = {
  slug: "hair-growth-oil",
  name: "Hair Growth Oil",
  brand: "Veetree",
  category: { label: "Hair Care", href: "/collections/hair-care" },
  collection: { label: "Hair Oils", href: "/collections/hair-oils" },

  variants: [{"size": "100 ml", "sku": "VT-HAIR-GROWTH-OIL-100ML", "price": 179, "mrp": 210}, {"size": "200 ml", "sku": "VT-HAIR-GROWTH-OIL-200ML", "price": 339, "mrp": 410}],

  images: [{"src": "/products/hair-growth-oil.jpg", "alt": "Veetree Hair Growth Oil in a bottle set in a brass plate with amla, hibiscus, curry leaves and black seeds", "width": 735, "height": 1100}],

  rating: null,

  badges: [{"label": "100 ml / 200 ml"}, {"label": "11 ingredients"}, {"label": "Hair Care"}],

  tagline: "Nourishes the scalp & hair to support healthy-looking hair growth.",
  shortDescription: "A nourishing hair oil that supports healthy hair growth, strengthens the roots and helps reduce the appearance of hair fall, leaving hair thicker, stronger and healthier-looking.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A nourishing hair oil that supports healthy hair growth, strengthens the roots and helps reduce the appearance of hair fall, leaving hair thicker, stronger and healthier-looking."]}, {"id": "sizes", "heading": "Sizes", "bullets": ["100 ml — ₹179", "200 ml — ₹339"]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "wood pressed coconut oil", "note": "Listed in the product's ingredient list."}, {"name": "Kalonji seed oil", "note": "Listed in the product's ingredient list."}, {"name": "sesame oil", "note": "Listed in the product's ingredient list."}, {"name": "Almond oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["wood pressed coconut oil", "Kalonji seed oil", "sesame oil", "Almond oil", "Fenugreek", "country Amla", "Bhringraj", "Hibiscus flowers & leaves", "Rosemary", "Clove", "Vitamin E oil"],

  howToUse: [{"title": "Step 1", "detail": "Step 1: Pour the desired amount of Hair Regrowth Oil into your palm and gently massage it into your hair and scalp."}, {"title": "Step 2", "detail": "Step 2: To boost blood circulation at the roots, flip your hair forward and massage."}, {"title": "Step 3", "detail": "This technique is known as the inversion method."}, {"title": "Step 4", "detail": "Step 3: Leave the oil on for 1 hour or overnight before washing your hair."}, {"title": "Step 5", "detail": "For best results, use the Hair Regrowth Oil twice a week / Before hair wash day."}],

  faqs: [{"q": "What is Veetree Hair Growth Oil?", "a": "A nourishing hair oil that supports healthy hair growth, strengthens the roots and helps reduce the appearance of hair fall, leaving hair thicker, stronger and healthier-looking."}, {"q": "How do I use Hair Growth Oil?", "a": "Step 1: Pour the desired amount of Hair Regrowth Oil into your palm and gently massage it into your hair and scalp. Step 2: To boost blood circulation at the roots, flip your hair forward and massage. This technique is known as the inversion method. Step 3: Leave the oil on for 1 hour or overnight before washing your hair."}, {"q": "What sizes does it come in?", "a": "It is available in 100 ml and 200 ml."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include wood pressed coconut oil, Kalonji seed oil, sesame oil, Almond oil, Fenugreek."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Hair Growth Oil | Hair Care",
    description: "A nourishing hair oil that supports healthy hair growth, strengthens the roots and helps reduce the appearance of hair fall, leaving hair thicker, str.",
    canonical: "/products/hair-growth-oil",
  },

  inStock: true,
}
