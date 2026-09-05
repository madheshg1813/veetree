import Image from "next/image"
import Link from "next/link"
import { CATEGORY_CARDS } from "@/lib/catalog/featured"
import { type Product } from "@/lib/catalog"
import { Reveal } from "./Reveal"

/**
 * Shop by category.
 *
 * Each card has its own photograph in /public/categories, keyed by the
 * category slug, with an optional focal point for the wide frames.
 */
export function CategoryGrid({ products }: { products: readonly Product[] }) {
  const countIn = (slug: string) =>
    products.filter((p) => p.category.href === `/collections/${slug}`).length

  return (
    <section className="cats" aria-labelledby="cats-h">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            Shop by Categories
          </p>
          <h2 className="section-title" id="cats-h">
            Start where your <em className="grad-gold">routine needs it</em>
          </h2>
        </Reveal>

        <ul className="cats__grid">
          {CATEGORY_CARDS.map((c, i) => {
            const count = countIn(c.slug)
            return (
              <Reveal as="li" key={c.slug} className="cats__item" delay={i * 0.06}>
                <Link href={`/collections/${c.slug}`}>
                  <span className="cats__media">
                    <Image
                      src={c.image.src}
                      /* Decorative: the card's own text names the category, so
                         alt text here would just be announced twice. The
                         description lives in the data for reuse elsewhere. */
                      alt=""
                      width={c.image.width}
                      height={c.image.height}
                      sizes="(max-width: 620px) 46vw, (max-width: 1000px) 32vw, 20vw"
                      /* q_auto over-compresses these smooth, evenly lit
                         photographs — skin and the blurred wall band visibly.
                         q_90 is ~48 KB instead of ~25 KB at the size a card
                         actually requests, which is worth it here. */
                      quality={90}
                      style={c.image.focus ? { objectPosition: c.image.focus } : undefined}
                    />
                  </span>
                  <span className="cats__body">
                    <strong>{c.label}</strong>
                    <span className="cats__blurb">{c.blurb}</span>
                    <span className="cats__count">
                      {count} {count === 1 ? "product" : "products"}
                    </span>
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
