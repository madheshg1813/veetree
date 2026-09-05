import type { Slug } from "./types"

/**
 * Shop by Concern — the founder's own routing of the catalogue by the problem
 * a customer arrives with, rather than by product type.
 *
 * Two ways to name the products in a concern:
 *   productSlugs  — an explicit, ordered list
 *   fromCollection — every product in a collection, so "all lip care products"
 *                    stays true when a new lip product is added
 * A concern may use either or both. Combos are named separately and rendered
 * after the individual products.
 */
export interface Concern {
  readonly slug: Slug
  /** Card label, as the client's layout writes it. */
  readonly label: string
  /** H1 on the concern's own page. */
  readonly heading: string
  readonly intro: string
  readonly image: {
    readonly src: string
    readonly alt: string
    readonly width: number
    readonly height: number
  }
  readonly productSlugs?: readonly Slug[]
  readonly fromCollection?: Slug
  readonly comboSlugs?: readonly Slug[]
}

const img = (slug: string, alt: string) => ({
  src: `/concerns/${slug}.jpg`,
  alt,
  width: 1400,
  height: 1011,
})

export const CONCERNS: readonly Concern[] = [
  {
    slug: "hydration",
    label: "Hydration",
    heading: "Hydration",
    intro: "Gels, a brightening serum and a rose hydrosol for skin that drinks it in.",
    image: img("hydration", "A woman resting her hands on her cheeks, beside aloe leaves, neem and herbal roots"),
    productSlugs: [
      "aloe-vera-gel",
      "saffron-gel",
      "multi-floral-gel",
      "aqua-rose-brightening-serum",
    ],
    comboSlugs: ["hydration-even-tone"],
  },
  {
    slug: "uneven-skin",
    label: "Uneven Skin",
    heading: "Uneven Skin Tone",
    intro: "Serums, a night cream and a face pack for dark spots, tan and patchiness.",
    image: img("uneven-skin", "A woman's face in close-up with one hand resting against her cheek"),
    productSlugs: [
      "aqua-rose-brightening-serum",
      "kumkumayadi-night-cream",
      "face-brightening-pack",
      "saffron-gel",
    ],
    comboSlugs: ["good-glow-skin"],
  },
  {
    slug: "hairfall",
    label: "Hairfall",
    heading: "Hairfall",
    intro: "Oils, a scalp serum, a protein mask and a shampoo for hair that is thinning or shedding.",
    image: img("hairfall", "A woman combing long hair, with strands caught in the comb"),
    productSlugs: [
      "hair-growth-oil",
      "scalp-hair-rebirth-serum",
      "protein-hair-mask",
      "seed-petal-shampoo",
      "rosemary-hydrosol",
    ],
    comboSlugs: ["hair-growth"],
  },
  {
    slug: "dandruff",
    label: "Dandruff",
    heading: "Dandruff",
    intro: "A treatment gel, a hydrosol, a protein mask and a shampoo for a flaking, itchy scalp.",
    image: img("dandruff", "Hands parting hair to work a treatment into the scalp"),
    productSlugs: [
      "anti-dandruff-gel",
      "rosemary-hydrosol",
      "protein-hair-mask",
      "seed-petal-shampoo",
    ],
    comboSlugs: ["dandruff-cure"],
  },
  {
    slug: "chapped-lips",
    label: "Chapped Lips",
    heading: "Chapped Lips",
    intro: "The whole lip range — balms, scrubs and a lip oil — for dryness, flaking and pigmentation.",
    image: img("chapped-lips", "A woman touching her lower lip with a fingertip"),
    fromCollection: "lip-care",
    comboSlugs: ["lovely-lips"],
  },
  {
    slug: "tired-eyes",
    label: "Tired Eyes",
    heading: "Tired Eyes",
    intro: "Both eye-care formulations, for dark circles, puffiness and fine lines.",
    image: img("tired-eyes", "A woman pressing her fingertips gently beneath both eyes"),
    fromCollection: "eye-care",
  },
]

export const getConcern = (slug: Slug): Concern | undefined =>
  CONCERNS.find((c) => c.slug === slug)

export const allConcernSlugs = (): Slug[] => CONCERNS.map((c) => c.slug)
