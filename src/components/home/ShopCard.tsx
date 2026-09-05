import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/catalog"
import type { ShopItem } from "@/lib/home/shopItems"

/**
 * Bestsellers card, following the client's layout: photo, name, rating, two
 * lines of copy, price, and through to the product.
 *
 * The homepage sends people to the product page rather than adding to the cart
 * from here — buying happens where the sizes, ingredients and directions are.
 * That also means this card needs no JavaScript at all, so the homepage ships
 * less of it.
 *
 * The rating row renders only when a product actually has one. No star scores
 * have been collected for any Veetree product yet, so today the row is absent
 * everywhere rather than showing an invented number.
 */
export function ShopCard({ item }: { item: ShopItem }) {
  return (
    <article className="scard">
      <Link className="scard__media" href={item.href} aria-label={`${item.brand} ${item.name}`}>
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            sizes="(max-width: 620px) 46vw, (max-width: 1000px) 31vw, 24vw"
          />
        ) : (
          <span className="scard__placeholder" aria-hidden="true">
            {item.name.charAt(0)}
          </span>
        )}
      </Link>

      <div className="scard__body">
        <h3 className="scard__name">
          <Link href={item.href}>{item.name}</Link>
        </h3>

        {item.rating ? (
          <p className="scard__rating">
            <span className="scard__stars" aria-hidden="true">
              {"★".repeat(Math.round(item.rating.value))}
              {"☆".repeat(5 - Math.round(item.rating.value))}
            </span>
            <span>{item.rating.value.toFixed(1)}</span>
            <span className="scard__reviews">({item.rating.count})</span>
          </p>
        ) : null}

        <p className="scard__blurb">{item.blurb}</p>

        <p className="scard__price">
          {item.price === null ? (
            <span className="scard__tbc">Price on request</span>
          ) : (
            <>
              {item.priceFrom ? <em>from </em> : null}
              {formatPrice(item.price)}
              {item.off !== null && item.mrp !== null ? (
                <>
                  <s>{formatPrice(item.mrp)}</s>
                  <span className="scard__off">{item.off}% off</span>
                </>
              ) : null}
            </>
          )}
        </p>

        <Link className="scard__cta" href={item.href}>
          {item.inStock ? "View product" : "Out of stock"}
        </Link>
      </div>
    </article>
  )
}
