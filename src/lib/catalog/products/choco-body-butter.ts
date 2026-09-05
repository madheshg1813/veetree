import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Choco Body butter"
 */
export const chocoBodyButter: Product = {
  slug: "choco-body-butter",
  name: "Choco Body Butter",
  brand: "Veetree",
  category: { label: "Body Care", href: "/collections/body-care" },
  collection: { label: "Body Butters", href: "/collections/body-butters" },

  variants: [{"size": "100 g", "sku": "VT-CHOCO-BODY-BUTTER", "price": 409, "mrp": 490}],

  images: [{"src": "/products/choco-body-butter.jpg", "alt": "Veetree Choco Body Butter in a black 100 g jar on a stone slab, beside cocoa powder, cacao beans and chocolate pieces", "width": 1050, "height": 1400}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "4 ingredients"}, {"label": "Body Care"}],

  tagline: "Provides rich moisture for soft, smooth, nourished skin.",
  shortDescription: "A decadent body butter with a delicious chocolate-inspired fragrance that turns everyday moisturising into a luxurious treat. It melts into the skin, leaving it feeling soft, smooth and pampered with a rich, comforting aroma.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A decadent body butter with a delicious chocolate-inspired fragrance that turns everyday moisturising into a luxurious treat. It melts into the skin, leaving it feeling soft, smooth and pampered with a rich, comforting aroma."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Shea butter", "note": "Listed in the product's ingredient list."}, {"name": "Cocoa butter", "note": "Listed in the product's ingredient list."}, {"name": "Jojoba Oil", "note": "Listed in the product's ingredient list."}, {"name": "Cocoa Powder Geranium essential oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Shea butter", "Cocoa butter", "Jojoba Oil", "Cocoa Powder Geranium essential oil"],

  howToUse: [{"title": "Step 1", "detail": "Same as rose body butter."}],

  faqs: [{"q": "What is Veetree Choco Body Butter?", "a": "A decadent body butter with a delicious chocolate-inspired fragrance that turns everyday moisturising into a luxurious treat. It melts into the skin, leaving it feeling soft, smooth and pampered with a rich, comforting aroma."}, {"q": "How do I use Choco Body Butter?", "a": "Same as rose body butter."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Shea butter, Cocoa butter, Jojoba Oil, Cocoa Powder Geranium essential oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Choco Body Butter | Body Care",
    description: "A decadent body butter with a delicious chocolate-inspired fragrance that turns everyday moisturising into a luxurious treat. It melts into the skin,.",
    canonical: "/products/choco-body-butter",
  },

  inStock: true,
}
