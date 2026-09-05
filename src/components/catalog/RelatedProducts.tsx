import type { Product } from "@/lib/catalog"
import { CommerceCard } from "./CommerceCard"

export function RelatedProducts({ products }: { products: readonly Product[] }) {
  if (!products.length) return null
  return (
    <div className="cgrid cgrid--related">
      {products.map((p) => (
        <CommerceCard key={p.slug} product={p} />
      ))}
    </div>
  )
}
