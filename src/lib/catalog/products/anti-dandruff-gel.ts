import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Anti Dandruff gel"
 */
export const antiDandruffGel: Product = {
  slug: "anti-dandruff-gel",
  name: "Anti-Dandruff Gel",
  brand: "Veetree",
  category: { label: "Hair Care", href: "/collections/hair-care" },

  variants: [{"size": "100 g", "sku": "VT-ANTI-DANDRUFF-GEL", "price": 289, "mrp": 350}],

  images: [{"src": "/products/anti-dandruff-gel.jpg", "alt": "Veetree Anti-Dandruff Gel in a black jar with a lilac label, beside neem and tea tree sprigs and a bowl of clear gel", "width": 933, "height": 1400}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "5 ingredients"}, {"label": "Hair Care"}],

  tagline: "Helps soothe the scalp & reduce the appearance of dandruff and flakes.",
  shortDescription: "A refreshing scalp gel that helps control visible dandruff, soothe an uncomfortable scalp and maintain a clean, fresh and balanced-feeling scalp.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A refreshing scalp gel that helps control visible dandruff, soothe an uncomfortable scalp and maintain a clean, fresh and balanced-feeling scalp."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aloe vera gel", "note": "Listed in the product's ingredient list."}, {"name": "Teatree essential oil", "note": "Listed in the product's ingredient list."}, {"name": "Neem seed oil", "note": "Listed in the product's ingredient list."}, {"name": "Jojoba oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aloe vera gel", "Teatree essential oil", "Neem seed oil", "Jojoba oil", "Moringa seed oil"],

  howToUse: [{"title": "Step 1", "detail": "Apply On scalp At night or evening and Leave overnight."}, {"title": "Step 2", "detail": "You can also leave on scalp for few hours."}, {"title": "Step 3", "detail": "Then Rinse with shampoo."}],

  faqs: [{"q": "What is Veetree Anti-Dandruff Gel?", "a": "A refreshing scalp gel that helps control visible dandruff, soothe an uncomfortable scalp and maintain a clean, fresh and balanced-feeling scalp."}, {"q": "How do I use Anti-Dandruff Gel?", "a": "Apply On scalp At night or evening and Leave overnight. You can also leave on scalp for few hours. Then Rinse with shampoo."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aloe vera gel, Teatree essential oil, Neem seed oil, Jojoba oil, Moringa seed oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Anti-Dandruff Gel | Hair Care",
    description: "A refreshing scalp gel that helps control visible dandruff, soothe an uncomfortable scalp and maintain a clean, fresh and balanced-feeling scalp.",
    canonical: "/products/anti-dandruff-gel",
  },

  inStock: true,
}
