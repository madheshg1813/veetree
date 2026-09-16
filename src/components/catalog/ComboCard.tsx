import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/catalog"
import type { ComboItem } from "@/lib/home/comboItems"
import { ComboAddButton } from "./ComboAddButton"

/**
 * Combo card, used by the homepage strip and the /combos page.
 *
 * `action` decides the button: "view" links through to the combo's own page,
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
      {/*
        The photograph is a link, like the name. People click a product image
        expecting to be taken to it, and it was the one part of the card that
        did nothing. `alt=""` because the link is already labelled by the combo
        name below — a screen reader should not hear the contents twice.
      */}
      <Link className="combo__media" href={item.href} aria-label={item.name}>
        <Image
          src={item.image.src}
          alt=""
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
      </Link>

      <div className="combo__body">
        <h3 className="combo__name">
          <Link href={item.href}>{item.name}</Link>
        </h3>

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

        {/*
          Both, now. The strip used to offer only "View combo", which meant the
          homepage showed four sets and no way to buy one.
        */}
        <div className="combo__actions">
          {action === "cart" ? <ComboAddButton item={item} /> : null}
          <Link className="combo__cta combo__cta--ghost" href={item.href}>
            View combo
          </Link>
        </div>
      </div>
    </article>
  )
}
