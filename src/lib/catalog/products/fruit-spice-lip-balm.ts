import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Fruit & spice lipbalm"
 */
export const fruitSpiceLipBalm: Product = {
  slug: "fruit-spice-lip-balm",
  name: "Fruit & Spice Lip Balm",
  brand: "Veetree",
  category: { label: "Lip Care", href: "/collections/lip-care" },
  collection: { label: "Lip Balms", href: "/collections/lip-balms" },

  variants: [{"size": "10 g", "sku": "VT-FRUIT-SPICE-LIP-BALM", "price": 129, "mrp": 150}],

  images: [{"src": "/products/fruit-spice-lip-balm.jpg", "alt": "Veetree Fruit & Spice Lip Balm in an aluminium tin with a green label, beside pineapple, lemon, cardamom and star anise", "width": 1049, "height": 1400}],

  rating: null,

  badges: [{"label": "10 g"}, {"label": "9 ingredients"}, {"label": "Lip Care"}],

  tagline: "Keeps lips moisturized, nourished & naturally soft.",
  shortDescription: "Nourishes and moisturises dry lips, helps restore softness and smoothness, and supports a naturally healthy-looking lip tone.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["Nourishes and moisturises dry lips, helps restore softness and smoothness, and supports a naturally healthy-looking lip tone.", "Step 1: Apply a thin, even layer of lip balm to clean, dry lips.", "Step 2: Reapply throughout the day as needed, especially when your lips feel dry or chapped.", "Step 3: For overnight care, apply a slightly thicker layer before bedtime to deeply nourish and soften your lips.", "Special tips:."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Shea butter", "note": "Listed in the product's ingredient list."}, {"name": "Cocoa butter", "note": "Listed in the product's ingredient list."}, {"name": "jojoba oil", "note": "Listed in the product's ingredient list."}, {"name": "Olive oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Shea butter", "Cocoa butter", "jojoba oil", "Olive oil", "almond oil", "beeswax", "clove herb infused", "Fruit & spice essential oil", "vitamin E oil"],

  howToUse: [{"title": "Step 1", "detail": "Use it before applying lipstick so that the lips don't dry out."}, {"title": "Step 2", "detail": "Can be applied to the cheeks as a highlighter."}, {"title": "Step 3", "detail": "Use it as often as you can to hydrate your lips."}],

  faqs: [{"q": "What is Veetree Fruit & Spice Lip Balm?", "a": "Nourishes and moisturises dry lips, helps restore softness and smoothness, and supports a naturally healthy-looking lip tone."}, {"q": "How do I use Fruit & Spice Lip Balm?", "a": "Use it before applying lipstick so that the lips don't dry out. Can be applied to the cheeks as a highlighter. Use it as often as you can to hydrate your lips."}, {"q": "What size is it?", "a": "10 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Shea butter, Cocoa butter, jojoba oil, Olive oil, almond oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Fruit & Spice Lip Balm | Lip Care",
    description: "Nourishes and moisturises dry lips, helps restore softness and smoothness, and supports a naturally healthy-looking lip tone.",
    canonical: "/products/fruit-spice-lip-balm",
  },

  inStock: true,
}
