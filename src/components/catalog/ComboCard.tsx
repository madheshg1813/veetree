import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/catalog"
import type { ComboItem } from "@/lib/home/comboItems"
import { ComboAddButton } from "./ComboAddButton"

/**
 * Combo card, used by the homepage strip and the /combos page.
 *
 * `action` decides the button: "view" links through to the combo on /combos,
 * which is what the homepage does, and "cart" adds it, which is what the combo
 * listing and the concern pages do. Adding happens on a combo's destination
 * page, never from the homepage.
 *
 * Alt text is derived from the combo's own contents rather than stored, so it
 * can never drift out of step with what the set actually holds.
 *
 * The price is the bundle price, which is exactly what Add to Cart will charge,
 * so the card and the cart can never disagree. Struck through beside it is the
 * sum of the components' own original prices. Ratings are absent for the same
 * reason they are absent everywhere else on the site: none have been collected.
 */
export function ComboCard({
  item,
  priority = false,
  action = "cart",
}: {
  item: ComboItem
  priority?: boolean
  action?: "view" | "cart"
}) {
  const wasPrice =
    item.price !== null && item.separately !== null && item.separately > item.price
      ? item.separately
      : null

  return (
    <article className="combo" id={item.slug}>
      <div className="combo__media">
        <Image
          src={item.image.src}
          alt={`Veetree ${item.name}: ${item.contents.join(", ")}`}
          width={item.image.width}
          height={item.image.height}
          priority={priority}
          quality={88}
          sizes="(max-width: 1000px) 46vw, 24vw"
          style={item.image.focus ? { objectPosition: item.image.focus } : undefined}
        />
        {item.off !== null ? (
          <span className="combo__save">{item.off}% off</span>
        ) : null}
      </div>

      <div className="combo__body">
        <h3 className="combo__name">{item.name}</h3>

        <p className="combo__contents">{item.contents.join(", ")}</p>

        <p className="combo__price">
          {item.price === null ? (
            <span className="combo__price--tbc">Price on request</span>
          ) : (
            <>
              {formatPrice(item.price)}
              {wasPrice !== null ? <s>{formatPrice(wasPrice)}</s> : null}
            </>
          )}
        </p>

        {action === "cart" ? (
          <ComboAddButton item={item} />
        ) : (
          <Link className="combo__cta" href={item.href}>
            View combo
          </Link>
        )}
      </div>
    </article>
  )
}
