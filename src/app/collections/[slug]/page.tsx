import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { CommerceCard } from "@/components/catalog/CommerceCard"
import { FaqList } from "@/components/catalog/FaqList"
import { JsonLd } from "@/components/catalog/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { allCollectionSlugs, commerce, getCollection } from "@/lib/catalog"
import { liveProductsIn } from "@/lib/catalog/live"
import { site } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return allCollectionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const collection = getCollection((await params).slug)
  if (!collection) return {}
  return {
    title: collection.seo.title,
    description: collection.seo.description,
    alternates: { canonical: collection.seo.canonical },
    openGraph: {
      title: collection.seo.title,
      description: collection.seo.description,
      url: collection.seo.canonical,
      type: "website",
    },
  }
}

/** Turns "What is a hair serum?" into "what-is-a-hair-serum" for anchor links. */
const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const collection = getCollection((await params).slug)
  if (!collection) notFound()

  const items = await liveProductsIn(collection)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: collection.breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href}`,
    })),
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.heading,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/products/${p.slug}`,
      name: `${p.brand} ${p.name}`,
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      {commerce.emitFaqSchema && collection.faqs.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: collection.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      ) : null}

      <SiteHeader />

      <main className="plp">
        <div className="shell">
          <Breadcrumbs trail={collection.breadcrumbs} />
        </div>

        <header className="shell plp__head">
          <h1 className="plp__title">{collection.heading}</h1>
        </header>

        <section className="shell plp__block" aria-label="Products">
          <p className="plp__count">
            {items.length} {items.length === 1 ? "product" : "products"}
          </p>
          <div className="cgrid">
            {items.map((p) => (
              <CommerceCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* ── Category content ───────────────────────────────────── */}
        <section className="shell plp__block plp__content">
          {collection.sections.map((s) => (
            <article key={s.heading} id={anchor(s.heading)}>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </article>
          ))}
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        {collection.faqs.length ? (
          <section className="shell plp__block" id="faq">
            <h2 className="pdp__h2">Common Questions</h2>
            <FaqList faqs={collection.faqs} idPrefix={collection.slug} />
          </section>
        ) : null}

        {/* ── Internal links ─────────────────────────────────────── */}
        {collection.relatedLinks.length ? (
          <section className="shell plp__block">
            <h2 className="pdp__h2">Explore More</h2>
            <ul className="related">
              {collection.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <strong>{l.label}</strong>
                    {l.note ? <span>{l.note}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  )
}
