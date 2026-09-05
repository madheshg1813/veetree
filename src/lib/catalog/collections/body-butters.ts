import type { Collection } from "../types"

/** Owns the broad "body butter" search intent; products under it target brand + exact name. */
export const bodyButters: Collection = {
  slug: "body-butters",
  heading: "Body Butters",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Body Care", href: "/collections/body-care" },
    { label: "Body Butters", href: "/collections/body-butters" },
  ],
  productSlugs: ["rose-vennila-body-butter", "tender-coconut-body-butter", "choco-body-butter"],
  sections: [
    {
      heading: "What is a body butter?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the body butters?",
      a: "Compare the ingredient lists and the usage instructions on each product page — they set out what each one is formulated to do.",
    },
    {
      q: "Are these suitable for everyday use?",
      a: "Follow the usage frequency printed on each pack; it is published on the product page as well.",
    },
  ],
  relatedLinks: [
    { label: "Body Care", href: "/collections/body-care", note: "The full range" },
  ],
  seo: {
    title: "Body Butters — Rich Everyday Moisture | Veetree",
    description: "Whipped botanical body butters in rose and vanilla, tender coconut and cocoa. Richer than a lotion, for skin that needs more.",
    canonical: "/collections/body-butters",
  },
}
