/**
 * Homepage slider.
 *
 * Veetree has no lifestyle or banner photography, so each slide uses a real
 * product photograph. Every line of copy here is either the product's own
 * label wording or the brand line already used elsewhere on the site — nothing
 * is a claim the product sheet does not support.
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
    eyebrow: "Bestseller",
    title: "Kumkumadi Serum",
    cta: { label: "Shop the serum", href: "/products/kumkumadi-serum" },
    image: {
      src: "/products/kumkumadi-serum.jpg",
      alt: "Veetree Kumkumadi Serum in a glass dropper bottle beside a brass lamp and saffron threads",
    },
    focus: "center 42%",
  },
  {
    eyebrow: "Hair Care",
    title: "Hair Growth Oil",
    cta: { label: "Shop hair care", href: "/collections/hair-care" },
    image: {
      src: "/products/hair-growth-oil.jpg",
      alt: "Veetree Hair Growth Oil in a bottle set in a brass plate with amla, hibiscus, curry leaves and black seeds",
    },
    focus: "center 45%",
  },
  {
    eyebrow: "Small Batch",
    title: "Nalpamaradi Lepam",
    cta: { label: "Shop body care", href: "/collections/body-care" },
    image: {
      src: "/products/nalpamaradi-body-lebam.jpg",
      alt: "Veetree Nalpamaradi Lepam in a metal tin, surrounded by amla, turmeric, lotus petals and herbal roots",
    },
    focus: "center 45%",
  },
]
