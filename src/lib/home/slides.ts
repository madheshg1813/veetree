/**
 * Homepage slider.
 *
 * Each slide is one of the client's banner photographs (public/banners), wide
 * shots with the product right of centre and open space on the left for the
 * copy. `focus` keeps the bottle in frame when a phone crops the sides.
 */
export interface Slide {
  readonly eyebrow: string
  readonly title: string
  readonly cta: { readonly label: string; readonly href: string }
  readonly image: { readonly src: string; readonly alt: string }
  /** Where the crop should hold as the frame gets wider. */
  readonly focus?: string
}

export const SLIDES: readonly Slide[] = [
  {
    eyebrow: "Hair Care",
    title: "Hair Growth Oil",
    cta: { label: "Shop hair care", href: "/collections/hair-care" },
    image: {
      src: "/banners/hair-growth-oil.jpg",
      alt: "Veetree Hair Growth Oil bottle on a stone ledge with moss, against a warm beige wall",
    },
    focus: "64% 50%",
  },
  {
    eyebrow: "Body Care",
    title: "Ritual Body Oil",
    cta: { label: "Shop the body oil", href: "/products/ritual-body-oil" },
    image: {
      src: "/banners/ritual-body-oil.jpg",
      alt: "Veetree Ritual Body Oil spray bottle on a moss-covered rock in a sunlit forest",
    },
    focus: "63% 55%",
  },
  {
    eyebrow: "Bestseller",
    title: "Kumkumadi Serum",
    cta: { label: "Shop the serum", href: "/products/kumkumadi-serum" },
    image: {
      src: "/banners/kumkumadi-serum.jpg",
      alt: "Veetree Kumkumadi Brightening Face Serum dropper bottle on moss beside a fern and a smooth stone",
    },
    focus: "64% 58%",
  },
]
