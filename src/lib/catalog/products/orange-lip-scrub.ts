import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Orange lip scrub"
 */
export const orangeLipScrub: Product = {
  slug: "orange-lip-scrub",
  name: "Orange Lip Scrub",
  brand: "Veetree",
  category: { label: "Lip Care", href: "/collections/lip-care" },
  collection: { label: "Lip Scrubs", href: "/collections/lip-scrubs" },

  variants: [{"size": "15 g", "sku": "VT-ORANGE-LIP-SCRUB", "price": 119, "mrp": 140}],

  images: [{"src": "/products/orange-lip-scrub.jpg", "alt": "Veetree Orange Lip Scrub in an aluminium tin on a wooden coaster, beside a halved orange in a brass dish", "width": 1050, "height": 1400}],

  rating: null,

  badges: [{"label": "15 g"}, {"label": "8 ingredients"}, {"label": "Lip Care"}],

  tagline: "Gently exfoliates dry, flaky lips for a smoother texture.",
  shortDescription: "Gently exfoliates dead skin cells, smooths dry lips and helps reveal softer, brighter-looking lips.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["Gently exfoliates dead skin cells, smooths dry lips and helps reveal softer, brighter-looking lips."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Organic Shea butter & Cocoa butter", "note": "Listed in the product's ingredient list."}, {"name": "Jojoba oil", "note": "Listed in the product's ingredient list."}, {"name": "grapeseed oil", "note": "Listed in the product's ingredient list."}, {"name": "orange essential oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Organic Shea butter & Cocoa butter", "Jojoba oil", "grapeseed oil", "orange essential oil", "organic sugar", "beeswax", "Honey powder", "Vitamin e oil"],

  howToUse: [{"title": "Step 1", "detail": "Step 1: Take a small pinch of Lip Scrub and gently massage it onto your lips for 2 minutes."}, {"title": "Step 2", "detail": "Step 2: Wash it off and follow up with Veetree Lip Balm."}, {"title": "Step 3", "detail": "For best results, use Twice a week."}],

  faqs: [{"q": "What is Veetree Orange Lip Scrub?", "a": "Gently exfoliates dead skin cells, smooths dry lips and helps reveal softer, brighter-looking lips."}, {"q": "How do I use Orange Lip Scrub?", "a": "Step 1: Take a small pinch of Lip Scrub and gently massage it onto your lips for 2 minutes. Step 2: Wash it off and follow up with Veetree Lip Balm. For best results, use Twice a week."}, {"q": "What size is it?", "a": "15 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Organic Shea butter & Cocoa butter, Jojoba oil, grapeseed oil, orange essential oil, organic sugar."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Orange Lip Scrub | Lip Care",
    description: "Gently exfoliates dead skin cells, smooths dry lips and helps reveal softer, brighter-looking lips.",
    canonical: "/products/orange-lip-scrub",
  },

  inStock: true,
}
