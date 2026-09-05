import type { Collection } from "../types"

/** Owns the broad "face serum" search intent; products under it target brand + exact name. */
export const faceSerums: Collection = {
  slug: "face-serums",
  heading: "Face Serums",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Face Care", href: "/collections/face-care" },
    { label: "Face Serums", href: "/collections/face-serums" },
  ],
  // Per the menu sketch, Serum groups by product form — so the under-eye
  // serum and the mango lip oil sit here too, not only the face serums.
  productSlugs: ["kumkumadi-serum", "aqua-rose-brightening-serum", "under-eye-serum", "mango-lip-oil"],
  sections: [
    {
      heading: "What is a face serum?",
      body: [
        "Each product page sets out exactly what the formulation contains, what it is for, and how to use it, using the details printed on the pack.",
        "If you are deciding between products in this range, the ingredient lists are the fastest way to tell them apart.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I choose between the face serums?",
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
    title: "Face Serums for Radiance & Even Tone | Veetree",
    description: "Botanical face serums including a classical Kumkumadi preparation and a lightweight Aqua Rose serum.",
    canonical: "/collections/face-serums",
  },
}
