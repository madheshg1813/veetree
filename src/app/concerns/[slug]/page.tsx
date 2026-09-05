import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { CommerceCard } from "@/components/catalog/CommerceCard"
import { ComboCard } from "@/components/catalog/ComboCard"
import { JsonLd } from "@/components/catalog/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { allConcernSlugs, getConcern, type Concern } from "@/lib/catalog/concerns"
import { COMBOS } from "@/lib/catalog/combos"
import { getCollection, type Product } from "@/lib/catalog"
import { liveProducts } from "@/lib/catalog/live"
import { toComboItem } from "@/lib/home/comboItems"
import { site } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return allConcernSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const concern = getConcern((await params).slug)
  if (!concern) return {}
  const title = `${concern.heading} — Ayurvedic Care | Veetree`
  return {
    title,
    description: concern.intro,
    alternates: { canonical: `/concerns/${concern.slug}` },
    openGraph: {
      title,
      description: concern.intro,
      url: `/concerns/${concern.slug}`,
      type: "website",
    },
  }
}

/**
 * The products for a concern: the explicit list first, then the rest of a named
 * collection when the concern says "all of these". Duplicates are dropped, so a
 * product listed by hand and also present in the collection appears once.
 */
function productsFor(concern: Concern, all: readonly Product[]): Product[] {
  const bySlug = new Map(all.map((p) => [p.slug, p]))
  const picked: Product[] = []
  const seen = new Set<string>()

  const push = (p: Product | undefined) => {
    if (!p || seen.has(p.slug)) return
    seen.add(p.slug)
    picked.push(p)
  }

  for (const slug of concern.productSlugs ?? []) push(bySlug.get(slug))

  if (concern.fromCollection) {
    const collection = getCollection(concern.fromCollection)
    for (const slug of collection?.productSlugs ?? []) push(bySlug.get(slug))
  }

  return picked
}

export default async function ConcernPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const concern = getConcern((await params).slug)
  if (!concern) notFound()

  const all = await liveProducts()
  const products = productsFor(concern, all)
  const combos = (concern.comboSlugs ?? [])
    .map((slug) => COMBOS.find((c) => c.slug === slug))
    .filter((c): c is (typeof COMBOS)[number] => c !== undefined)
    .map((c) => toComboItem(c, all))

  const trail = [
    { label: "Home", href: "/" },
    { label: "Shop by Concern", href: "/#concerns-h" },
    { label: concern.label, href: `/concerns/${concern.slug}` },
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
          name: `${concern.heading} — Veetree`,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/products/${p.slug}`,
            name: `${p.brand} ${p.name}`,
          })),
        }}
      />

      <SiteHeader />

      <main className="plp">
        <div className="shell">
          <Breadcrumbs trail={trail} />
        </div>

        <header className="shell plp__head">
          <h1 className="plp__title">{concern.heading}</h1>
          <p className="plp__intro">{concern.intro}</p>
        </header>

        <section className="shell plp__block" aria-label="Products">
          <p className="plp__count">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
          <div className="cgrid">
            {products.map((p) => (
              <CommerceCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {combos.length ? (
          <section className="shell plp__block" aria-labelledby="concern-combo-h">
            <h2 className="pdp__h2" id="concern-combo-h">
              {combos.length === 1 ? "The combo for this" : "Combos for this"}
            </h2>
            <div className="combos__grid combos__grid--all">
              {combos.map((item) => (
                <ComboCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  )
}
