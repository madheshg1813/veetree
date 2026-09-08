import type { Product } from "@/lib/catalog"
import { ShopCard } from "@/components/home/ShopCard"
import { toShopItem } from "@/lib/home/shopItems"

/**
 * One product card is used everywhere on the site — the same one the homepage
 * bestsellers show — so a product looks identical however it is reached.
 */
export function RelatedProducts({ products }: { products: readonly Product[] }) {
  if (!products.length) return null
  return (
    <div className="best__grid">
      {products.map((p) => (
        <ShopCard key={p.slug} item={toShopItem(p)} />
      ))}
    </div>
  )
}
