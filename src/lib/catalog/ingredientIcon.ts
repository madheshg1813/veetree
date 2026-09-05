import {
  Bean,
  Citrus,
  Coffee,
  Droplet,
  Droplets,
  FlaskConical,
  Flower,
  Flower2,
  Leaf,
  Milk,
  Pipette,
  Sparkles,
  SprayCan,
  Sprout,
  TreeDeciduous,
  Wheat,
  type LucideIcon,
} from "lucide-react"

/**
 * A small illustration for each key ingredient.
 *
 * Matched on what the ingredient actually is, longest-specific rule first —
 * "rose hydrosol" has to beat both "rose" and "hydrosol", and "cocoa butter"
 * has to beat "cocoa". The rows are ordered, and the first hit wins.
 *
 * This replaces a first-letter monogram, which produced a card headed "(" for
 * "(10 Herbs powder blend)" and told a reader nothing about the ingredient.
 */
const RULES: readonly [RegExp, LucideIcon][] = [
  // Steam-distilled waters — a mist, not an oil.
  [/hydrosol|distillation/i, SprayCan],

  // Butters, waxes and the emulsifiers that hold a cream together.
  [/butter/i, Milk],
  [/wax|glucoside|xanthan|guar gum|panthenol|betaine|geogard|preservative|glycerine/i, FlaskConical],

  // Essential oils are dosed by the drop; carrier and seed oils by the spoon.
  [/essential oil/i, Pipette],
  [/oil|thailam/i, Droplet],

  // Saffron first: it is the one ingredient the brand leads on.
  [/saffron|kumkuma|kesar/i, Sparkles],

  [/coffee/i, Coffee],
  [/cocoa|green gram|bean/i, Bean],
  [/orange|citrus|lemon/i, Citrus],

  // Barks and tree herbs of the Nalpamaradi group.
  [/nalpamara|ashwattha|udumbara|plaksha|banyan|bark|sandal/i, TreeDeciduous],

  // \brose\b, not /rose/: the loose form claimed "Rosemary leaves blend".
  [/flower|hibiscus|jasmine|lotus|\brose\b|lavender|floral|geranium/i, Flower],
  [/leaf|leaves|neem|curry|arappu|henna|aloe|rosemary|mint|tulsi|basil/i, Leaf],
  [/seed|flaxseed|oats|rice|wheat|gram|powder|herbs|dashmoola|churna/i, Wheat],
  [/aqua|water/i, Droplets],
  [/turmeric|manjista|licorice|yashtimadhu|vetiver|root/i, Sprout],
  [/extract|infusion|infused|blend/i, Flower2],
]

/** The illustration for an ingredient name. Falls back to a leaf. */
export function ingredientIcon(name: string): LucideIcon {
  for (const [pattern, Icon] of RULES) {
    if (pattern.test(name)) return Icon
  }
  return Leaf
}
