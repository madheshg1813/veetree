import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { JsonLd } from "@/components/catalog/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { CONCERNS } from "@/lib/catalog/concerns"
import { site } from "@/lib/site"

const TITLE = "Shop by Concern | Veetree"
const DESCRIPTION =
  "Find Veetree products by what you want to treat: hydration, uneven skin tone, hairfall, dandruff, chapped lips and tired eyes. Small-batch Ayurvedic formulations."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/concerns" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/concerns", type: "website" },
}

/**
 * The Shop by Concern landing page.
 *
 * The homepage has shown this grid for a while, but there was no page behind
 * it — so the menu's "Shop by Concern" had nowhere of its own to point, and
 * the six concern pages could only be reached by scrolling the homepage. Same
 * cards as the homepage strip, with each concern's intro line added, since a
 * page reached deliberately can afford a sentence the homepage cannot.
 */
export default function ConcernsPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Shop by Concern", href: "/concerns" },
  ]

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${site.url}${c.href}`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Shop Veetree by Concern",
          itemListElement: CONCERNS.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/concerns/${c.slug}`,
            name: c.heading,
          })),
        }}
      />

      <SiteHeader />

      <main className="plp">
        <div className="shell">
          <Breadcrumbs trail={trail} />
        </div>

        <header className="shell plp__head">
          <h1 className="plp__title">Shop by Concern</h1>
          <p className="plp__intro">
            The same catalogue, routed by the problem you arrived with rather than by the type
            of product.
          </p>
        </header>

        <section className="shell plp__block" aria-label="Concerns">
          <p className="plp__count">{CONCERNS.length} concerns</p>
          <ul className="concerns__grid concerns__grid--all">
            {CONCERNS.map((c, i) => (
              <li className="concern" key={c.slug}>
                <Link href={`/concerns/${c.slug}`}>
                  <span className="concern__media">
                    <Image
                      src={c.image.src}
                      alt=""
                      width={c.image.width}
                      height={c.image.height}
                      priority={i < 3}
                      quality={88}
                      sizes="(max-width: 1000px) 46vw, 30vw"
                    />
                    <span className="concern__label">{c.label}</span>
                  </span>
                  <span className="concern__intro">{c.intro}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  )
}
