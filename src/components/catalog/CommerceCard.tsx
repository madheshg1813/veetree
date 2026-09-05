import Image from "next/image"
import Link from "next/link"
import { cheapestVariant, discountPercent, formatPrice, priceRange, type Product } from "@/lib/catalog"

/** Product card for collection grids and the homepage. */
export function CommerceCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`
  const img = product.images[0]
  const range = priceRange(product)
  const sizes = product.variants.map((v) => v.size).join(" · ")
  // The MRP struck through is the one belonging to the size being quoted.
  const quoted = cheapestVariant(product)
  const off = quoted ? discountPercent(quoted) : null

  return (
    <article className="ccard">
      <div className="ccard__media">
        <Link href={href} aria-label={`${product.brand} ${product.name}`}>
          {img ? (
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 30vw"
            />
          ) : (
            /* Photography still outstanding — a labelled placeholder beats an empty frame. */
            <span className="ccard__placeholder" aria-hidden="true">
              <em>{product.name.charAt(0)}</em>
              <span>Photo coming soon</span>
            </span>
          )}
        </Link>
      </div>

      <div className="ccard__body">
        <p className="ccard__meta">
          {(product.collection ?? product.category).label} · {sizes}
        </p>
        <h3 className="ccard__name">
          <Link href={href}>
            {product.brand} {product.name}
          </Link>
        </h3>

        {product.rating ? (
          <p className="ccard__rating">
            ★ {product.rating.value.toFixed(1)} <span>({product.rating.count} reviews)</span>
          </p>
        ) : null}

        <div className="ccard__foot">
          <div className="price price--sm">
            {range === null ? (
              <span className="price__tbc">Price on request</span>
            ) : (
              <>
                <span className="price__now">
                  {range.min === range.max ? null : <em>from</em>}{" "}
                  {formatPrice(range.min)}
                </span>
                {off !== null && quoted?.mrp ? (
                  <>
                    <s className="price__mrp">{formatPrice(quoted.mrp)}</s>
                    <span className="price__off">{off}% off</span>
                  </>
                ) : null}
              </>
            )}
          </div>
          <Link className="btn-buy btn-buy--primary ccard__cta" href={href}>
            View Product
          </Link>
        </div>
      </div>
    </article>
  )
}
