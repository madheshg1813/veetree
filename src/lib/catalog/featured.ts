import type { Slug } from "./types"

/**
 * Bestsellers shown on the homepage.
 *
 * Chosen from actual customer feedback rather than guesswork — every product
 * here is one a real reviewer named (see src/lib/reviews.ts), with the range
 * spread across all five categories so the grid reads as a shop rather than a
 * single aisle.
 *
 * Order is deliberate: the strongest testimonial leads.
 */
export const FEATURED_SLUGS: readonly Slug[] = [
  "kumkumadi-serum",            // "using it for 1 year, I can't go back"
  "sandalwood-lip-balm",        // named by two separate reviewers
  "hair-growth-oil",            // "suits me perfectly"
  "aqua-rose-brightening-serum",// the SRM stall combo
  "nalpamaradi-lepam",          // "I feel confident"
  "face-brightening-pack",      // "my face looks glowing"
  "scalp-hair-rebirth-serum",   // "it's my favourite"
  "jasmine-hair-butter",        // shared around an office
]

/**
 * Category cards for the homepage.
 *
 * Each card now has its own photograph in /public/categories rather than
 * borrowing a product shot: a model using the category reads as a category,
 * where a single bottle read as one product.
 */
export interface CategoryCard {
  readonly slug: Slug
  readonly label: string
  readonly blurb: string
  readonly image: {
    readonly src: string
    readonly alt: string
    readonly width: number
    readonly height: number
    /**
     * CSS object-position, for photographs whose subject is not centred. The
     * cards crop to a square on phones and 4:5 on desktop, so a wide frame
     * with the model to one side loses her to a centred crop.
     */
    readonly focus?: string
  }
}

export const CATEGORY_CARDS: readonly CategoryCard[] = [
  {
    slug: "face-care",
    label: "Face Care",
    blurb: "Serums, gels, packs & mists",
    image: {
      src: "/categories/face-care.jpg",
      alt: "Serum being patted onto the cheek, beside turmeric, sandalwood and saffron",
      width: 2048,
      height: 2048,
    },
  },
  {
    slug: "hair-care",
    label: "Hair Care",
    blurb: "Oils, serums, masks & shampoo",
    image: {
      src: "/categories/hair-care.jpg",
      alt: "Hair oil being dropped onto the scalp, beside curry leaves, pumpkin seeds and black seeds",
      width: 1254,
      height: 1254,
    },
  },
  {
    slug: "body-care",
    label: "Body Care",
    blurb: "Butters, oils, scrub & lepam",
    image: {
      src: "/categories/body-care.jpg",
      alt: "Lotion being smoothed along the forearm, beside turmeric and herbal powders",
      width: 2048,
      height: 2048,
    },
  },
  {
    slug: "lip-care",
    label: "Lip Care",
    blurb: "Balms, scrubs & lip oil",
    image: {
      src: "/categories/lip-care.jpg",
      alt: "A lip balm pot held to the lips, beside mango slices, jasmine and rose petals in oil",
      width: 2048,
      height: 1143,
      focus: "18% center",
    },
  },
  {
    slug: "eye-care",
    label: "Eye Care",
    blurb: "Serum & nourishing cream",
    image: {
      src: "/categories/eye-care.jpg",
      alt: "Under-eye serum being pressed in with a fingertip, beside almonds and jasmine",
      width: 2048,
      height: 2048,
    },
  },
]
