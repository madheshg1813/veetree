import type { Collection } from "../types"

/** Owns the broad "hydrosol" search intent; products under it target brand + exact name. */
export const hydrosols: Collection = {
  slug: "hydrosols",
  heading: "Hydrosols",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
    { label: "Hydrosols", href: "/collections/hydrosols" },
  ],
  productSlugs: ["rose-hydrosol", "tea-tree-hydrosol", "rosemary-hydrosol"],
  sections: [
    {
      heading: "What is a hydrosol?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the hydrosols?",
      a: "Compare the ingredient lists and the usage instructions on each product page — they set out what each one is formulated to do.",
    },
    {
      q: "Are these suitable for everyday use?",
      a: "Follow the usage frequency printed on each pack; it is published on the product page as well.",
    },
  ],
  relatedLinks: [
    { label: "Face Care", href: "/collections/face-care", note: "The full range" },
  ],
  seo: {
    title: "Hydrosols — Steam-Distilled Rose, Rosemary & Tea Tree | Veetree",
    description: "Steam-distilled hydrosols for skin and scalp. What a hydrosol is, how it differs from an essential oil, and how to use each one.",
    canonical: "/collections/hydrosols",
  },
}
