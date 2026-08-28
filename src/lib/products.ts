export const CATEGORIES = ["skin", "hair", "body", "lips"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Product {
  /** Stable id; also the image filename in /public/products. */
  readonly slug: string;
  readonly name: string;
  readonly category: Category;
  /** Product type shown above the name, e.g. "Face Serum". */
  readonly kind: string;
  /** Net quantity as printed on the label. */
  readonly size: string;
  readonly description: string;
  /** Short ingredient / benefit chips. */
  readonly notes: readonly string[];
  readonly alt: string;
  /** Two colours sampled from the photo; drive the hover border and tint. */
  readonly accent: { readonly from: string; readonly to: string };
  /** Optional ribbon, e.g. "Bestseller". */
  readonly tag?: string;
}

export const products: readonly Product[] = [
  {
    slug: "kumkumadi-serum",
    name: "Kumkumadi Brightening Face Serum",
    category: "skin",
    kind: "Face Serum",
    size: "20 ml",
    description:
      "24k gold, goat milk and 12+ vital herbs steeped with pure saffron for a radiant, even tone.",
    notes: ["24k Gold", "Saffron", "All skin types"],
    alt: "VeeTree Kumkumadi Brightening Face Serum, 20ml amber dropper bottle beside a brass lamp and saffron threads",
    accent: { from: "#C9873E", to: "#7A2E3B" },
    tag: "Bestseller",
  },
  {
    slug: "multi-floral-gel",
    name: "Multi-Floral Gel",
    category: "skin",
    kind: "Face Gel",
    size: "30 ml",
    description:
      "Peptides, hyaluronic acid and flower acids in a weightless gel for healthy ageing and rejuvenation.",
    notes: ["Peptide", "HA", "Flower acid"],
    alt: "VeeTree Multi-Floral Gel pump bottle with hibiscus and butterfly pea flowers",
    accent: { from: "#8E6FB8", to: "#D9A93F" },
  },
  {
    slug: "aloe-vera-gel",
    name: "Aloe Vera Gel",
    category: "skin",
    kind: "Face & Body Gel",
    size: "100 g",
    description:
      "Organic, cold-pressed aloe enriched with vitamin E — the calm-everything step for stressed skin.",
    notes: ["Cold pressed", "Vitamin E", "Organic"],
    alt: "VeeTree Aloe Vera Gel jar with fresh aloe leaves",
    accent: { from: "#79B366", to: "#2F6B3E" },
  },
  {
    slug: "rose-hydrosol",
    name: "Rose Hydrosol",
    category: "skin",
    kind: "Facial Mist",
    size: "100 ml",
    description:
      "Steam-distilled rose water that tones, restores pH balance and leaves skin softly scented.",
    notes: ["Toning", "pH balance", "Steam distilled"],
    alt: "VeeTree Rose Hydrosol mist bottle surrounded by fresh pink roses and petals",
    accent: { from: "#E39CB6", to: "#B85C7E" },
  },
  {
    slug: "hair-growth-oil",
    name: "Hair Growth Oil",
    category: "hair",
    kind: "Hair Oil",
    size: "200 ml",
    description:
      "A slow-infused blend that promotes growth and controls hairfall, for all hair types.",
    notes: ["Amla", "Hibiscus", "Coconut"],
    alt: "VeeTree Hair Growth Oil bottle in a brass plate with amla, hibiscus and black seeds",
    accent: { from: "#8FA84A", to: "#33501F" },
    tag: "Loved",
  },
  {
    slug: "scalp-hair-rebirth-serum",
    name: "Scalp & Hair Rebirth Serum",
    category: "hair",
    kind: "Scalp Serum",
    size: "30 ml",
    description:
      "An 8+ botanical blend with a potent mix of seed oils, made for tired scalps and thinning lengths.",
    notes: ["8+ botanicals", "Seed oils", "All scalp types"],
    alt: "VeeTree Scalp and Hair Rebirth Serum bottle with pumpkin seeds, amla and rosemary",
    accent: { from: "#5C8A4A", to: "#C98A3C" },
  },
  {
    slug: "seed-petal-shampoo",
    name: "Seed-Petal Shampoo",
    category: "hair",
    kind: "Shampoo",
    size: "200 ml",
    description:
      "Rosemary, hibiscus and flaxseed lather gently for strength and shine without stripping.",
    notes: ["Rosemary", "Hibiscus", "Flaxseed"],
    alt: "VeeTree Seed-Petal Shampoo bottle with hibiscus flowers, rosemary and flaxseeds",
    accent: { from: "#D06A62", to: "#7E2C3A" },
  },
  {
    slug: "rosemary-hydrosol",
    name: "Rosemary Hydrosol",
    category: "hair",
    kind: "Scalp Mist",
    size: "100 ml",
    description:
      "A daily scalp mist distilled from fresh rosemary to nourish roots and strengthen hair.",
    notes: ["Scalp care", "Strengthening", "Daily use"],
    alt: "VeeTree Rosemary Hydrosol spray bottle with fresh rosemary sprigs in flower",
    accent: { from: "#6DA36A", to: "#234F2E" },
  },
  {
    slug: "nalpamaradi-body-lebam",
    name: "Nalpamaradi Body Lebam",
    category: "body",
    kind: "Body Balm",
    size: "15 g",
    description:
      "A 13+ herb blend that brightens skin and fades body pigmentation, in a travel-friendly tin.",
    notes: ["13+ herbs", "Brightening", "Pigmentation"],
    alt: "VeeTree Nalpamaradi Body Lebam tin surrounded by amla, turmeric, lotus and herbal roots",
    accent: { from: "#A99AD0", to: "#D8809E" },
    tag: "Classical",
  },
  {
    slug: "patchouli-shower-gel",
    name: "Patchouli Shower Gel",
    category: "body",
    kind: "Shower Gel",
    size: "200 ml",
    description:
      "Infused with lavender buds and grounding patchouli — a shower that smooths and resets you.",
    notes: ["Lavender buds", "Patchouli", "Smooth & refresh"],
    alt: "VeeTree Patchouli Shower Gel bottle with dried lavender buds on a yellow backdrop",
    accent: { from: "#8B6DB8", to: "#E2C04A" },
  },
  {
    slug: "mango-lip-oil",
    name: "Mango Lip Oil",
    category: "lips",
    kind: "Lip Oil",
    size: "Roll-on",
    description:
      "Hydrating and healing mango butter oil in a roll-on that lives in every pocket you own.",
    notes: ["Mango butter", "Hydrating", "Roll-on"],
    alt: "VeeTree Mango Lip Oil roller bottle on a wooden stand beside a cut mango and brass diffuser",
    accent: { from: "#F0B845", to: "#C4661F" },
  },
] as const;

/** Label used in the WhatsApp message, e.g. "Rose Hydrosol (100 ml)". */
export const productLabel = (p: Product): string => `${p.name} (${p.size})`;

export const imagePath = (p: Product): string => `/products/${p.slug}.jpg`;

export interface CategoryFilter {
  readonly id: Category | "all";
  readonly label: string;
  readonly count: number;
}

/** Filter chips, with counts derived from the data so they can never drift. */
export const categoryFilters: readonly CategoryFilter[] = [
  { id: "all", label: "All", count: products.length },
  ...CATEGORIES.map((id) => ({
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1),
    count: products.filter((p) => p.category === id).length,
  })),
];
