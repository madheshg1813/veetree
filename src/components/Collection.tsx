import Link from "next/link"
import { CommerceCard } from "@/components/catalog/CommerceCard"
import { FEATURED_SLUGS } from "@/lib/catalog/featured"
import type { Product } from "@/lib/catalog"
import { Reveal } from "./Reveal"

/**
 * Homepage bestsellers.
 *
 * A curated eight rather than the whole catalogue — 31 cards is a warehouse,
 * not a shop front. Discovery happens through the category grid above; this
 * section exists to show the range at its strongest.
 *
 * No longer a client component: with no filter chips there is no state, so
 * this renders on the server and ships no JavaScript.
 */
export function Collection({ products }: { products: readonly Product[] }) {
  const bySlug = new Map(products.map((p) => [p.slug, p]))
  const featured = FEATURED_SLUGS.map((s) => bySlug.get(s)).filter(
    (p): p is Product => p !== undefined
  )

  return (
    <section className="collection" id="collection">
      <div className="shell">
        <Reveal as="header" className="section-head section-head--split">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__line" />
              Bestsellers
            </p>
            <h2 className="section-title">
              The ones people <em className="grad-gold">come back for</em>
            </h2>
          </div>
          <Link className="btn btn--ghost btn--sm section-head__cta" href="/collections/face-care">
            View all {products.length} products
          </Link>
        </Reveal>

        <div className="cgrid" id="grid">
          {featured.map((product) => (
            <CommerceCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
