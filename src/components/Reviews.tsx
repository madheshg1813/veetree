import { getProduct } from "@/lib/catalog"
import { reviews } from "@/lib/reviews"
import { Reveal } from "./Reveal"
import { ReviewsSlider, type ReviewItem } from "./ReviewsSlider"

/**
 * Customer reviews, as written by the customers.
 *
 * A five-star row is shown on each, at Veetree's request. Note what it is and
 * is not: none of these customers were asked for a score, so the row is a
 * visual treatment of an unambiguously positive message, not collected data.
 * For that reason no `aggregateRating` markup is emitted here or anywhere else
 * — publishing a rating figure to search engines needs real ratings behind it,
 * and `Product.rating` stays null across the catalogue.
 *
 * Product links are resolved here, on the server, so the slider stays a small
 * client component and the catalogue never reaches the browser bundle.
 */
export function Reviews() {
  const items: ReviewItem[] = reviews.map((r) => {
    const only = r.slugs.length === 1 ? r.slugs[0] : undefined
    return {
      name: r.name,
      text: r.text,
      productLabel: r.productLabel,
      href: only && getProduct(only) ? `/products/${only}` : null,
    }
  })

  return (
    <section className="revs" aria-labelledby="revs-h">
      <div className="shell">
        <Reveal as="header" className="section-head section-head--center">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            In Their Words
          </p>
          <h2 className="section-title" id="revs-h">
            What people <em className="grad-gold">actually say</em>
          </h2>
          <p className="section-sub">
            Unedited messages from customers, reproduced as they were sent.
          </p>
        </Reveal>

        <ReviewsSlider items={items} />
      </div>
    </section>
  )
}
