import { discountPercent, formatPrice, type Variant } from "@/lib/catalog"

/**
 * Selling price leads. MRP is struck through only when one genuinely exists —
 * the product sheet lists a single price per size, so no discount is shown
 * rather than inventing a comparison.
 */
export function PriceBlock({
  variant,
  size = "lg",
}: {
  variant: Variant
  size?: "lg" | "sm"
}) {
  if (variant.price === null) {
    return <p className={`price price--${size} price--tbc`}>Price on request</p>
  }

  const off = discountPercent(variant)

  return (
    <div className={`price price--${size}`}>
      <span className="price__now">{formatPrice(variant.price)}</span>
      {off !== null && variant.mrp ? (
        <>
          <s className="price__mrp">
            <span className="sr-only">Maximum retail price </span>
            {formatPrice(variant.mrp)}
          </s>
          <span className="price__off">{off}% OFF</span>
        </>
      ) : null}
    </div>
  )
}
