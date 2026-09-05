import { bodyButters } from "./collections/body-butters"
import { bodyCare } from "./collections/body-care"
import { eyeCare } from "./collections/eye-care"
import { faceCare } from "./collections/face-care"
import { faceCreams } from "./collections/face-creams"
import { faceGels } from "./collections/face-gels"
import { facePacks } from "./collections/face-packs"
import { faceScrubs } from "./collections/face-scrubs"
import { faceToners } from "./collections/face-toners"
import { hairPacks } from "./collections/hair-packs"
import { hairButters } from "./collections/hair-butters"
import { hairGels } from "./collections/hair-gels"
import { hairHydrosols } from "./collections/hair-hydrosols"
import { bodyLotions } from "./collections/body-lotions"
import { bodyOils } from "./collections/body-oils"
import { bodyWash } from "./collections/body-wash"
import { bodyScrubs } from "./collections/body-scrubs"
import { lipOils } from "./collections/lip-oils"
import { eyeCreams } from "./collections/eye-creams"
import { eyeOils } from "./collections/eye-oils"
import { faceSerums } from "./collections/face-serums"
import { hairCare } from "./collections/hair-care"
import { hairOils } from "./collections/hair-oils"
import { hairSerums } from "./collections/hair-serums"
import { hydrosols } from "./collections/hydrosols"
import { lipBalms } from "./collections/lip-balms"
import { lipCare } from "./collections/lip-care"
import { lipScrubs } from "./collections/lip-scrubs"
import { shampoos } from "./collections/shampoos"

import { aloeVeraGel } from "./products/aloe-vera-gel"
import { antiDandruffGel } from "./products/anti-dandruff-gel"
import { aquaRoseBrighteningSerum } from "./products/aqua-rose-brightening-serum"
import { faceBodyScrub } from "./products/face-body-scrub"
import { chocoBodyButter } from "./products/choco-body-butter"
import { coffeeLipScrub } from "./products/coffee-lip-scrub"
import { earthEyeCream } from "./products/earth-eye-cream"
import { faceBrighteningPack } from "./products/face-brightening-pack"
import { fruitSpiceLipBalm } from "./products/fruit-spice-lip-balm"
import { hairGrowthOil } from "./products/hair-growth-oil"
import { jasmineHairButter } from "./products/jasmine-hair-butter"
import { kumkumayadiNightCream } from "./products/kumkumayadi-night-cream"
import { kumkumadiSerum } from "./products/kumkumadi-serum"
import { mangoLipOil } from "./products/mango-lip-oil"
import { multiFloralGel } from "./products/multi-floral-gel"
import { nalpamaradiLepam } from "./products/nalpamaradi-lepam"
import { nalpamaradiLotion } from "./products/nalpamaradi-lotion"
import { orangeLipScrub } from "./products/orange-lip-scrub"
import { patchouliShowerGel } from "./products/patchouli-shower-gel"
import { proteinHairMask } from "./products/protein-hair-mask"
import { ritualBodyOil } from "./products/ritual-body-oil"
import { roseHydrosol } from "./products/rose-hydrosol"
import { roseVennilaBodyButter } from "./products/rose-vennila-body-butter"
import { rosemaryHydrosol } from "./products/rosemary-hydrosol"
import { saffronGel } from "./products/saffron-gel"
import { sandalwoodLipBalm } from "./products/sandalwood-lip-balm"
import { scalpHairRebirthSerum } from "./products/scalp-hair-rebirth-serum"
import { seedPetalShampoo } from "./products/seed-petal-shampoo"
import { teaTreeHydrosol } from "./products/tea-tree-hydrosol"
import { tenderCoconutBodyButter } from "./products/tender-coconut-body-butter"
import { underEyeSerum } from "./products/under-eye-serum"

import type { Collection, Product, Slug } from "./types"

/**
 * Registries. Adding a product or collection is a data file plus one line
 * here — every route, sitemap entry and nav link follows automatically.
 *
 * Product data is generated from the founder's product sheet; see
 * scripts/gen-catalog.py.
 */
const productList: readonly Product[] = [
  faceBrighteningPack,
  kumkumadiSerum,
  aquaRoseBrighteningSerum,
  aloeVeraGel,
  saffronGel,
  multiFloralGel,
  kumkumayadiNightCream,
  roseHydrosol,
  teaTreeHydrosol,
  hairGrowthOil,
  scalpHairRebirthSerum,
  proteinHairMask,
  seedPetalShampoo,
  jasmineHairButter,
  antiDandruffGel,
  rosemaryHydrosol,
  nalpamaradiLotion,
  ritualBodyOil,
  nalpamaradiLepam,
  patchouliShowerGel,
  faceBodyScrub,
  roseVennilaBodyButter,
  tenderCoconutBodyButter,
  chocoBodyButter,
  sandalwoodLipBalm,
  fruitSpiceLipBalm,
  orangeLipScrub,
  coffeeLipScrub,
  mangoLipOil,
  underEyeSerum,
  earthEyeCream,
]

const collectionList: readonly Collection[] = [
  faceCare,
  hairCare,
  bodyCare,
  lipCare,
  eyeCare,
  faceSerums,
  faceGels,
  facePacks,
  faceCreams,
  faceScrubs,
  faceToners,
  hairPacks,
  hairButters,
  hairGels,
  hairHydrosols,
  bodyLotions,
  bodyOils,
  bodyWash,
  bodyScrubs,
  lipOils,
  eyeCreams,
  eyeOils,
  hydrosols,
  hairOils,
  hairSerums,
  shampoos,
  bodyButters,
  lipBalms,
  lipScrubs,
]

export const products: Record<Slug, Product> = Object.fromEntries(
  productList.map((p) => [p.slug, p])
)

export const collections: Record<Slug, Collection> = Object.fromEntries(
  collectionList.map((c) => [c.slug, c])
)

export const allProducts = (): readonly Product[] => productList
export const allCollections = (): readonly Collection[] => collectionList

export const getProduct = (slug: Slug): Product | undefined => products[slug]
export const getCollection = (slug: Slug): Collection | undefined => collections[slug]

export const allProductSlugs = (): Slug[] => productList.map((p) => p.slug)
export const allCollectionSlugs = (): Slug[] => collectionList.map((c) => c.slug)

/** Products in a collection, in the order the collection lists them. */
export const productsIn = (collection: Collection): Product[] =>
  collection.productSlugs
    .map((slug) => products[slug])
    .filter((p): p is Product => p !== undefined)

/** The five top-level categories, in menu order. */
export const PARENT_CATEGORY_SLUGS = ["face-care", "hair-care", "body-care", "lip-care", "eye-care"] as const

export const parentCategories = (): Collection[] =>
  PARENT_CATEGORY_SLUGS.map((slug) => collections[slug]).filter(
    (c): c is Collection => c !== undefined
  )

/** True when a product sits under the given parent category collection. */
export const inParent = (product: Product, parent: Collection): boolean =>
  product.category.href === `/collections/${parent.slug}`

/**
 * Related products: explicit `related` slugs when set, otherwise the nearest
 * siblings — same sub-collection first, then same category.
 */
export const relatedTo = (product: Product): Product[] => {
  const explicit = product.related
    .map((slug) => products[slug])
    .filter((p): p is Product => p !== undefined && p.slug !== product.slug)
  if (explicit.length) return explicit.slice(0, 3)

  const sameSub = productList.filter(
    (p) => p.slug !== product.slug && p.collection?.href === product.collection?.href && product.collection
  )
  const sameCat = productList.filter(
    (p) => p.slug !== product.slug && p.category.href === product.category.href
  )
  const seen = new Set<string>()
  return [...sameSub, ...sameCat]
    .filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)))
    .slice(0, 3)
}

export * from "./types"
export { commerce } from "./config"
export { cheapestVariant, defaultVariant, discountPercent, formatPrice, isPurchasable, priceRange } from "./pricing"
