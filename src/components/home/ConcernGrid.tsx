import Image from "next/image"
import Link from "next/link"
import { CONCERNS } from "@/lib/catalog/concerns"
import { Reveal } from "@/components/Reveal"

/**
 * Shop by Concern.
 *
 * Routes the catalogue by the problem someone arrives with rather than by
 * product type — the same products as the category grid, reached the way a
 * customer actually asks for them.
 */
export function ConcernGrid() {
  return (
    <section className="concerns" aria-labelledby="concerns-h">
      <div className="shell">
        <h2 className="best__title" id="concerns-h">
          <span>Shop by Concern</span>
        </h2>
        <p className="concerns__sub">Find Your Perfect Match</p>

        <ul className="concerns__grid">
          {CONCERNS.map((c, i) => (
            <Reveal as="li" key={c.slug} className="concern" delay={i * 0.05}>
              <Link href={`/concerns/${c.slug}`}>
                <span className="concern__media">
                  <Image
                    src={c.image.src}
                    alt=""
                    width={c.image.width}
                    height={c.image.height}
                    quality={88}
                    sizes="(max-width: 1000px) 46vw, 24vw"
                  />
                  {/* The label sits inside the frame, over a dark tone, so the
                      card is one object rather than a picture plus a caption. */}
                  <span className="concern__label">{c.label}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
