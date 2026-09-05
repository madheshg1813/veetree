import type { Slug } from "./types"

/**
 * Combos — sets sold together, supplied by the founder.
 *
 * A combo is not a product in its own right: it is a named grouping of
 * catalogue variants plus its own photograph. Names and prices are read from
 * the catalogue at render, so a rename or a reprice propagates with no edit.
 *
 * Each component names its SIZE explicitly, because a combo is not always built
 * on the smallest pack — the three hair sets use the 200 ml bottles, and the
 * teenage set uses the 15 ml Kumkumadi. Every combo price on the founder's list
 * is the exact sum of its components at these sizes, so the cart total always
 * matches the price on the card.
 */

export interface ComboComponent {
  readonly slug: Slug
  /** As printed on the label, matching a variant of that product. */
  readonly size: string
}
export interface Combo {
  readonly slug: Slug
  readonly name: string
  readonly components: readonly ComboComponent[]
  readonly image: {
    readonly src: string
    readonly width: number
    readonly height: number
    /** CSS object-position, for a frame whose products are not centred. */
    readonly focus?: string
  }
  /** Bundle price in whole rupees, from the founder's list. */
  readonly price: number | null
}

const img = (slug: string, width: number, height: number, focus?: string) => ({
  src: `/combos/${slug}.jpg`,
  width,
  height,
  ...(focus ? { focus } : {}),
})

export const COMBOS: readonly Combo[] = [
  {
    slug: "hydration-even-tone",
    name: "Hydration & Even Tone Combo",
    components: [
      { slug: "aloe-vera-gel", size: "100 g" },
      { slug: "aqua-rose-brightening-serum", size: "30 ml" },
      { slug: "rose-hydrosol", size: "100 ml" },
    ],
    image: img("hydration-even-tone", 1350, 1800),
    price: 835,
  },
  {
    slug: "good-glow-skin",
    name: "Good Glow Skin Combo",
    components: [
      { slug: "saffron-gel", size: "100 g" },
      { slug: "kumkumayadi-night-cream", size: "30 g" },
      { slug: "face-body-scrub", size: "100 g" },
    ],
    image: img("good-glow-skin", 1350, 1800),
    price: 955,
  },
  {
    slug: "healthy-hair-care",
    name: "Healthy Hair Care Combo",
    components: [
      { slug: "hair-growth-oil", size: "200 ml" },
      { slug: "protein-hair-mask", size: "100 g" },
      { slug: "seed-petal-shampoo", size: "200 ml" },
    ],
    image: img("healthy-hair-care", 1350, 1800),
    price: 1116,
  },
  {
    slug: "hair-growth",
    name: "Hair Growth Combo",
    components: [
      { slug: "hair-growth-oil", size: "200 ml" },
      { slug: "scalp-hair-rebirth-serum", size: "50 ml" },
      { slug: "rosemary-hydrosol", size: "100 ml" },
    ],
    // Taller frame than the rest, with the bottles low in it.
    image: img("hair-growth", 1013, 1800, "center 68%"),
    price: 1105,
  },
  {
    slug: "frizz-control",
    name: "Frizz Hair Control Combo",
    components: [
      { slug: "protein-hair-mask", size: "100 g" },
      { slug: "seed-petal-shampoo", size: "200 ml" },
      { slug: "jasmine-hair-butter", size: "100 g" },
    ],
    image: img("frizz-control", 1350, 1800),
    price: 1075,
  },
  {
    slug: "dandruff-cure",
    name: "Dandruff Care Combo",
    components: [
      { slug: "protein-hair-mask", size: "100 g" },
      { slug: "anti-dandruff-gel", size: "100 g" },
      { slug: "rosemary-hydrosol", size: "100 ml" },
    ],
    image: img("dandruff-cure", 1350, 1800),
    price: 856,
  },
  {
    slug: "teenage-care",
    name: "Teenage Care Combo",
    components: [
      { slug: "face-brightening-pack", size: "100 g" },
      { slug: "kumkumadi-serum", size: "15 ml" },
      { slug: "sandalwood-lip-balm", size: "10 g" },
    ],
    image: img("teenage-care", 1350, 1800),
    price: 655,
  },
  {
    slug: "anti-acne-control",
    name: "Anti Acne Control Combo",
    components: [
      { slug: "aloe-vera-gel", size: "100 g" },
      { slug: "face-brightening-pack", size: "100 g" },
      { slug: "tea-tree-hydrosol", size: "100 ml" },
    ],
    image: img("anti-acne-control", 1350, 1800),
    price: 836,
  },
  {
    slug: "lovely-lips",
    name: "Lovely Lips Combo",
    components: [
      { slug: "sandalwood-lip-balm", size: "10 g" },
      { slug: "orange-lip-scrub", size: "15 g" },
      { slug: "mango-lip-oil", size: "10 ml" },
    ],
    image: img("lovely-lips", 1350, 1800),
    price: 417,
  },
]

/** How many combos the homepage strip shows before "View All Combos". */
export const HOME_COMBO_COUNT = 4

export const getCombo = (slug: Slug): Combo | undefined =>
  COMBOS.find((c) => c.slug === slug)
