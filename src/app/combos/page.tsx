import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { ComboCard } from "@/components/catalog/ComboCard"
import { JsonLd } from "@/components/catalog/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { comboItems } from "@/lib/home/comboItems"
import { liveProducts } from "@/lib/catalog/live"
import { site } from "@/lib/site"

const TITLE = "Combos — Skin & Hair Care Sets | Veetree"
const DESCRIPTION =
  "Veetree combos: skin and hair care sets built around one concern — hydration, glow, hair growth, frizz, dandruff, acne and lip care. Small-batch Ayurvedic formulations."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/combos" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/combos", type: "website" },
}

export default async function CombosPage() {
  const products = await liveProducts()
  const items = comboItems(products)

  const trail = [
    { label: "Home", href: "/" },
    { label: "Combos", href: "/combos" },
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
          name: "Veetree Combos",
          itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/combos#${c.slug}`,
            name: c.name,
          })),
        }}
      />

      <SiteHeader />

      <main className="plp">
        <div className="shell">
          <Breadcrumbs trail={trail} />
        </div>

        <header className="shell plp__head">
          <h1 className="plp__title">Combos</h1>
          <p className="plp__intro">
            Sets built around one concern, so the products in them are made to be used together.
          </p>
        </header>

        <section className="shell plp__block" aria-label="Combos">
          <p className="plp__count">
            {items.length} {items.length === 1 ? "combo" : "combos"}
          </p>
          <div className="combos__grid combos__grid--all">
            {items.map((item, i) => (
              <ComboCard key={item.slug} item={item} priority={i < 2} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  )
}
