import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Body & face scrub"
 */
export const faceBodyScrub: Product = {
  slug: "face-body-scrub",
  name: "Face & Body Scrub",
  brand: "Veetree",
  category: { label: "Body Care", href: "/collections/body-care" },

  variants: [{"size": "100 g", "sku": "VT-FACE-BODY-SCRUB", "price": 297, "mrp": 360}],

  images: [{"src": "/products/face-body-scrub.jpg", "alt": "Veetree Face & Body Scrub in a black jar beside a pink lotus, saffron, turmeric root and powdered botanicals", "width": 1050, "height": 1400}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "21 ingredients"}, {"label": "Body Care"}],

  tagline: "Gently exfoliates dead skin cells for smoother, softer-looking skin.",
  shortDescription: "A gentle exfoliating scrub that helps remove dead skin cells and surface buildup, leaving the skin smoother, softer, brighter and refreshed.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A gentle exfoliating scrub that helps remove dead skin cells and surface buildup, leaving the skin smoother, softer, brighter and refreshed.", "Special Tip: For best results, avoid oiling your hair before applying the Protein Hair Pack. Apply the pack to a clean scalp and hair."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua (Saffron infused)", "note": "Listed in the product's ingredient list."}, {"name": "Grapeseed oil", "note": "Listed in the product's ingredient list."}, {"name": "Rosehip oil", "note": "Listed in the product's ingredient list."}, {"name": "E wax", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua (Saffron infused)", "Grapeseed oil", "Rosehip oil", "E wax", "xanthan gum", "Licorice extract", "Ubtan Blend - Green gram", "mysoor dal", "wheat flour", "vetiver", "rose", "hibiscus flower", "nutmeg", "liquorice", "Manjista", "orange peel", "kasturi manjal (Herbs blend)", "walnut shell granules", "Saffron", "Vitamin E oil", "Eco certified preservative"],

  howToUse: [{"title": "Step 1", "detail": "Mix the required amount of Protein Hair Pack Powder with water, aloe vera gel, or curd to form a smooth paste."}, {"title": "Step 2", "detail": "Apply evenly to the scalp and hair from roots to ends."}, {"title": "Step 3", "detail": "Leave on for 20–30 minutes."}, {"title": "Step 4", "detail": "Rinse thoroughly with water and follow with a mild shampoo if needed."}, {"title": "Step 5", "detail": "Use 1–2 times a week for best results."}],

  faqs: [{"q": "What is Veetree Face & Body Scrub?", "a": "A gentle exfoliating scrub that helps remove dead skin cells and surface buildup, leaving the skin smoother, softer, brighter and refreshed."}, {"q": "How do I use Body & Face Scrub?", "a": "Mix the required amount of Protein Hair Pack Powder with water, aloe vera gel, or curd to form a smooth paste. Apply evenly to the scalp and hair from roots to ends. Leave on for 20–30 minutes. Rinse thoroughly with water and follow with a mild shampoo if needed."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua (Saffron infused), Grapeseed oil, Rosehip oil, E wax, xanthan gum."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Face & Body Scrub | Body Care",
    description: "A gentle exfoliating scrub that helps remove dead skin cells and surface buildup, leaving the skin smoother, softer, brighter and refreshed.",
    canonical: "/products/face-body-scrub",
  },

  inStock: true,
}
