import type { Variant } from "@/lib/catalog/types"

/** Below this, the number itself is the useful part. */
const LOW_STOCK = 10

/**
 * How many units are left, as Medusa reports them.
 *
 * Renders nothing when `stock` is null — that means the backend was
 * unreachable or the variant does not manage inventory, and a silent line is
 * better than inventing "in stock" for something nobody has counted.
 */
export function StockLine({ variant }: { variant: Variant }) {
  const stock = variant.stock
  if (typeof stock !== "number") return null

  if (stock <= 0) {
    return (
      <p className="stockline stockline--out" role="status">
        <span className="stockline__dot" aria-hidden="true" />
        Out of stock
      </p>
    )
  }

  return (
    <p className={`stockline ${stock <= LOW_STOCK ? "stockline--low" : "stockline--in"}`} role="status">
      <span className="stockline__dot" aria-hidden="true" />
      {stock <= LOW_STOCK ? (
        <>
          Only <strong>{stock}</strong> left in stock
        </>
      ) : (
        <>
          In stock — <strong>{stock}</strong> available
        </>
      )}
    </p>
  )
}
