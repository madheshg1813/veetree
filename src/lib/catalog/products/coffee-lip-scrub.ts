import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Coffee lip scrub"
 */
export const coffeeLipScrub: Product = {
  slug: "coffee-lip-scrub",
  name: "Coffee Lip Scrub",
  brand: "Veetree",
  category: { label: "Lip Care", href: "/collections/lip-care" },
  collection: { label: "Lip Scrubs", href: "/collections/lip-scrubs" },

  variants: [{"size": "15 g", "sku": "VT-COFFEE-LIP-SCRUB", "price": 119, "mrp": 140}],

  images: [{"src": "/products/coffee-lip-scrub.jpg", "alt": "Veetree Coffee Lip Scrub in an aluminium tin on a wooden coaster, beside a brass bowl of coffee beans", "width": 1051, "height": 1400}],

  rating: null,

  badges: [{"label": "15 g"}, {"label": "9 ingredients"}, {"label": "Lip Care"}],

  tagline: "Buffs away dead skin and leaves lips soft and smooth.",
  shortDescription: "Buffs away dry, flaky skin, smooths the lips and helps improve their overall appearance.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["Buffs away dry, flaky skin, smooths the lips and helps improve their overall appearance."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Organic Shea butter & Cocoa butter", "note": "Listed in the product's ingredient list."}, {"name": "Jojoba oil", "note": "Listed in the product's ingredient list."}, {"name": "grapeseed oil", "note": "Listed in the product's ingredient list."}, {"name": "Coffee essential oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Organic Shea butter & Cocoa butter", "Jojoba oil", "grapeseed oil", "Coffee essential oil", "organic sugar", "Coffee bean granules", "beeswax", "Honey powder", "Vitamin E oil"],

  howToUse: [{"title": "Step 1", "detail": "Step 1: Take a small pinch of Lip Scrub and gently massage it onto your lips for 2 minutes."}, {"title": "Step 2", "detail": "Step 2: Wash it off and follow up with Veetree Lip Balm."}, {"title": "Step 3", "detail": "For best results, use Twice a week."}],

  faqs: [{"q": "What is Veetree Coffee Lip Scrub?", "a": "Buffs away dry, flaky skin, smooths the lips and helps improve their overall appearance."}, {"q": "How do I use Coffee Lip Scrub?", "a": "Step 1: Take a small pinch of Lip Scrub and gently massage it onto your lips for 2 minutes. Step 2: Wash it off and follow up with Veetree Lip Balm. For best results, use Twice a week."}, {"q": "What size is it?", "a": "15 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Organic Shea butter & Cocoa butter, Jojoba oil, grapeseed oil, Coffee essential oil, organic sugar."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Coffee Lip Scrub | Lip Care",
    description: "Buffs away dry, flaky skin, smooths the lips and helps improve their overall appearance.",
    canonical: "/products/coffee-lip-scrub",
  },

  inStock: true,
}
