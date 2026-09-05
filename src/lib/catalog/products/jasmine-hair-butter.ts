import type { Product } from "../types"

/**
 * Source: Veetree product sheet (founder-supplied).
 * Sheet name: "Jasmine Hair Butter"
 */
export const jasmineHairButter: Product = {
  slug: "jasmine-hair-butter",
  name: "Jasmine Hair Butter",
  brand: "Veetree",
  category: { label: "Hair Care", href: "/collections/hair-care" },

  variants: [{"size": "100 g", "sku": "VT-JASMINE-HAIR-BUTTER", "price": 298, "mrp": 360}],

  images: [{"src": "/products/jasmine-hair-butter.jpg", "alt": "Veetree Jasmine Hair Butter in a black 100 g jar on stone, beside jasmine flowers, argan nuts and whipped butter", "width": 1050, "height": 1400}],

  rating: null,

  badges: [{"label": "100 g"}, {"label": "14 ingredients"}, {"label": "Hair Care"}],

  tagline: "Deeply nourishes dry hair & helps reduce frizz for softer strands.",
  shortDescription: "A rich yet nourishing hair butter that deeply conditions dry, rough hair, improves softness and manageability, and leaves hair smooth, silky and beautifully nourished.",

  sections: [{"id": "description", "heading": "Product Description", "defaultOpen": true, "body": ["A rich yet nourishing hair butter that deeply conditions dry, rough hair, improves softness and manageability, and leaves hair smooth, silky and beautifully nourished."]}, {"id": "storage", "heading": "Storage & Care", "body": ["Keep the pack closed and store somewhere cool and dry, out of direct sunlight.", "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]}],

  keyIngredients: [{"name": "Aqua", "note": "Listed in the product's ingredient list."}, {"name": "Jasmine Hydrosol", "note": "Listed in the product's ingredient list."}, {"name": "Shea butter", "note": "Listed in the product's ingredient list."}, {"name": "Argan oil", "note": "Listed in the product's ingredient list."}],

  fullIngredients: ["Aqua", "Jasmine Hydrosol", "Shea butter", "Argan oil", "Jamaican black castor oil", "Flaxseed oil", "vegetable glycerine", "Panthenol", "E wax", "Natural stabilizer", "Rice protein & Hibiscus extract", "Vitamin E oil", "Jasmine E oil", "ECO-Certified Preservative"],

  howToUse: [{"title": "Step 1", "detail": "Step 1: Take a coin-sized amount of our protein-free luscious hair butter on wet hands and rub between your palms to emulsify."}, {"title": "Step 2", "detail": "Step 2: Rake the hair butter through a section of your wet hair after washing, or lightly spray your hair with water or a hydrosol if it's dry before applying."}, {"title": "Step 3", "detail": "This helps lock in moisture and revive dry, dehydrated curls."}, {"title": "Step 4", "detail": "Remember to apply it 2 inches away from the scalp and work it all the way down to the ends."}, {"title": "Step 5", "detail": "Step 3: Scrunch your hair to squeeze out excess and enhance your natural texture."}, {"title": "Step 6", "detail": "Make this your one-and-done butter for post hair wash or alternative days for defined and frizz-free results."}],

  faqs: [{"q": "What is Veetree Jasmine Hair Butter?", "a": "A rich yet nourishing hair butter that deeply conditions dry, rough hair, improves softness and manageability, and leaves hair smooth, silky and beautifully nourished."}, {"q": "How do I use Jasmine Hair Butter?", "a": "Step 1: Take a coin-sized amount of our protein-free luscious hair butter on wet hands and rub between your palms to emulsify. Step 2: Rake the hair butter through a section of your wet hair after washing, or lightly spray your hair with water or a hydrosol if it's dry before applying. This helps lock in moisture and revive dry, dehydrated curls. Remember to apply it 2 inches away from the scalp and work it all the way down to the ends."}, {"q": "What size is it?", "a": "100 g."}, {"q": "What is in it?", "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include Aqua, Jasmine Hydrosol, Shea butter, Argan oil, Jamaican black castor oil."}, {"q": "Is a patch test needed?", "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."}],

  related: [],

  seo: {
    title: "Veetree Jasmine Hair Butter | Hair Care",
    description: "A rich yet nourishing hair butter that deeply conditions dry, rough hair, improves softness and manageability, and leaves hair smooth, silky and beaut.",
    canonical: "/products/jasmine-hair-butter",
  },

  inStock: true,
}
