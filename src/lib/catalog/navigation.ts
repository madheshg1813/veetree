/**
 * Site navigation — two levels.
 *
 * A category (Face Care) opens to "View All" plus its sub-categories, and each
 * sub-category links to its own page, where the products are listed. The
 * products themselves are deliberately not in the menu: a menu is for finding
 * the right shelf, not for reading the whole shelf.
 *
 * The product counts are generated from the collections, so a note can never
 * claim a count a collection no longer has. Regenerate after changing a
 * collection's productSlugs.
 *
 * Face Care's sub-categories group by product FORM (gel, pack, serum, cream,
 * scrub, toner) rather than by where the product is used — which is why the
 * under-eye serum and mango lip oil sit under Serum, and the lip scrubs under
 * Scrub. That follows the founder's menu sketch, as do the other four.
 */
export interface NavChild {
  readonly label: string
  readonly href: string
  readonly note?: string
}

export interface NavItem {
  readonly label: string
  readonly href: string
  readonly children?: readonly NavChild[]
}

export const navigation: readonly NavItem[] = [
  {
    label: "Face Care",
    href: "/collections/face-care",
    children: [
      { label: "View All", href: "/collections/face-care", note: "Every product in face care" },
      {
        label: "Gel",
        href: "/collections/face-gels",
        note: "3 products",
      },
      {
        label: "Pack",
        href: "/collections/face-packs",
        note: "1 product",
      },
      {
        label: "Serum",
        href: "/collections/face-serums",
        note: "4 products",
      },
      {
        label: "Cream",
        href: "/collections/face-creams",
        note: "2 products",
      },
      {
        label: "Scrub",
        href: "/collections/face-scrubs",
        note: "3 products",
      },
      {
        label: "Face Toner",
        href: "/collections/face-toners",
        note: "2 products",
      },
    ],
  },
  {
    label: "Hair Care",
    href: "/collections/hair-care",
    children: [
      { label: "View All", href: "/collections/hair-care", note: "Every product in hair care" },
      {
        label: "Hair Oil",
        href: "/collections/hair-oils",
        note: "1 product",
      },
      {
        label: "Hair Pack",
        href: "/collections/hair-packs",
        note: "1 product",
      },
      {
        label: "Serum",
        href: "/collections/hair-serums",
        note: "1 product",
      },
      {
        label: "Shampoo",
        href: "/collections/shampoos",
        note: "1 product",
      },
      {
        label: "Hair Butter",
        href: "/collections/hair-butters",
        note: "1 product",
      },
      {
        label: "Gel",
        href: "/collections/hair-gels",
        note: "1 product",
      },
      {
        label: "Hydrosol",
        href: "/collections/hair-hydrosols",
        note: "1 product",
      },
    ],
  },
  {
    label: "Body Care",
    href: "/collections/body-care",
    children: [
      { label: "View All", href: "/collections/body-care", note: "Every product in body care" },
      {
        label: "Lotion",
        href: "/collections/body-lotions",
        note: "1 product",
      },
      {
        label: "Body Oil & Lepam",
        href: "/collections/body-oils",
        note: "2 products",
      },
      {
        label: "Body Wash",
        href: "/collections/body-wash",
        note: "1 product",
      },
      {
        label: "Scrub",
        href: "/collections/body-scrubs",
        note: "1 product",
      },
      {
        label: "Butter",
        href: "/collections/body-butters",
        note: "3 products",
      },
    ],
  },
  {
    label: "Lip Care",
    href: "/collections/lip-care",
    children: [
      { label: "View All", href: "/collections/lip-care", note: "Every product in lip care" },
      {
        label: "Lip Balm",
        href: "/collections/lip-balms",
        note: "2 products",
      },
      {
        label: "Lip Scrub",
        href: "/collections/lip-scrubs",
        note: "2 products",
      },
      {
        label: "Lip Oil",
        href: "/collections/lip-oils",
        note: "1 product",
      },
    ],
  },
  {
    label: "Eye Care",
    href: "/collections/eye-care",
    children: [
      { label: "View All", href: "/collections/eye-care", note: "Every product in eye care" },
      {
        label: "Cream",
        href: "/collections/eye-creams",
        note: "1 product",
      },
      {
        label: "Oil",
        href: "/collections/eye-oils",
        note: "1 product",
      },
    ],
  },
  { label: "Our Roots", href: "/#ritual" },
  { label: "Account", href: "/account" },
]
