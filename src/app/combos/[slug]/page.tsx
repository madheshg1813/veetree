import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { ComboAddButton } from "@/components/catalog/ComboAddButton"
import { JsonLd } from "@/components/catalog/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { formatPrice } from "@/lib/catalog"
import { COMBOS } from "@/lib/catalog/combos"
import { liveProducts } from "@/lib/catalog/live"
import { toComboItem } from "@/lib/home/comboItems"
import { site } from "@/lib/site"

/**
 * A combo's own page.
 *
 * Combos previously existed only as cards on /combos, so clicking one led to an
 * anchor on the page you were already on. This is where a combo can be read
 * properly: what is in it, at which sizes, what each part costs on its own, and
 * what the set saves.
 *
 * The contents are the real product cards, so the components stay clickable and
 * cannot drift from the catalogue.
 */
export function generateStaticParams() {
  return COMBOS.map((c) => ({ slug: c.slug }))
}

async function load(slug: string) {
  const combo = COMBOS.find((c) => c.slug === slug)
  if (!combo) return null
  const products = await liveProducts()
  const item = toComboItem(combo, products)
  const parts = combo.components.flatMap((c) => {
    const product = products.find((p) => p.slug === c.slug)
    if (!product) return []
    // The variant the combo is actually costed on — not the product's
    // default, which may be a different size at a different price.
    const variant = product.variants.find((v) => v.size === c.size) ?? null
    return [{ product, size: c.size, variant }]
  })
  return { item, parts }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const data = await load((await params).slug)
  if (!data) return {}
  const { item } = data
  const description = `${item.name} — ${item.contents.join(", ")}. A Veetree set, priced together.`
  return {
    title: `Veetree ${item.name} | Combos`,
    description,
    alternates: { canonical: `/combos/${item.slug}` },
    openGraph: {
      title: `Veetree ${item.name}`,
      description,
      url: `/combos/${item.slug}`,
      type: "website",
      images: [{ url: item.image.src, width: item.image.width, height: item.image.height }],
    },
  }
}

export default async function ComboPage({ params }: { params: Promise<{ slug: string }> }) {
  const data = await load((await params).slug)
  if (!data) notFound()
  const { item, parts } = data

  const wasPrice =
    item.price !== null && item.separately !== null && item.separately > item.price
      ? item.separately
      : null

  const trail = [
    { label: "Home", href: "/" },
    { label: "Combos", href: "/combos" },
    { label: item.name, href: `/combos/${item.slug}` },
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

      <SiteHeader />

      <main className="pdp">
        <div className="shell">
          <Breadcrumbs trail={trail} />
        </div>

        <section className="shell pdp__hero">
          <div className="pdp__media">
            <div className="combopage__frame">
              <Image
                src={item.image.src}
                alt={`Veetree ${item.name}: ${item.contents.join(", ")}`}
                width={item.image.width}
                height={item.image.height}
                priority
                quality={90}
                sizes="(max-width: 1000px) 92vw, 46vw"
                style={item.image.focus ? { objectPosition: item.image.focus } : undefined}
              />
            </div>
          </div>

          <div className="pdp__buy">
            <p className="pdp__eyebrow">
              <Link href="/combos">Combos</Link>
              <span aria-hidden="true"> · </span>
              {parts.length} products
            </p>

            <h1 className="pdp__title">Veetree {item.name}</h1>
            <p className="pdp__short">{item.contents.join(", ")}</p>

            <div className="pdp__pricing">
              {item.price === null ? (
                <p className="price price--lg price--tbc">Price on request</p>
              ) : (
                <div className="price price--lg">
                  <span className="price__now">{formatPrice(item.price)}</span>
                  {wasPrice !== null ? (
                    <>
                      <s className="price__mrp">
                        <span className="sr-only">Total maximum retail price </span>
                        {formatPrice(wasPrice)}
                      </s>
                      <span className="price__off">{item.off}% OFF</span>
                    </>
                  ) : null}
                </div>
              )}
              <p className="pdp__tax">Inclusive of all taxes</p>
              {wasPrice !== null && item.price !== null ? (
                <p className="combopage__save">
                  Saves {formatPrice(wasPrice - item.price)} against the total MRP of{" "}
                  {formatPrice(wasPrice)}.
                </p>
              ) : null}
            </div>

            <div className="combopage__cta">
              <ComboAddButton item={item} />
            </div>
          </div>
        </section>

        <section className="shell pdp__block">
          <h2 className="pdp__h2">What is in this set</h2>
          <p className="pdp__lede">
            These are the exact sizes the set is priced on. Open any of them to read the full
            ingredients and how to use it.
          </p>
          <ul className="parts">
            {parts.map(({ product, size, variant }) => (
              <li className="parts__row" key={`${product.slug}-${size}`}>
                <Link className="parts__media" href={`/products/${product.slug}`} aria-hidden="true" tabIndex={-1}>
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].src}
                      alt=""
                      width={product.images[0].width}
                      height={product.images[0].height}
                      sizes="120px"
                    />
                  ) : null}
                </Link>
                <div className="parts__text">
                  <h3 className="parts__name">
                    <Link href={`/products/${product.slug}`}>
                      {product.brand} {product.name}
                    </Link>
                  </h3>
                  <p className="parts__size">{size}</p>
                </div>
                <p className="parts__price">
                  {variant?.price != null ? formatPrice(variant.price) : "—"}
                  {variant?.mrp != null && variant.mrp > (variant.price ?? 0) ? (
                    <s>{formatPrice(variant.mrp)}</s>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
          {item.separately !== null ? (
            <p className="parts__total">
              Total MRP <s>{formatPrice(item.separately)}</s>
              {item.price !== null ? (
                <>
                  {" "}
                  · This set <strong>{formatPrice(item.price)}</strong>
                </>
              ) : null}
            </p>
          ) : null}
        </section>

        <section className="shell pdp__block">
          <div className="crosslinks">
            <p>
              See <Link href="/combos">all Veetree combos</Link>, or browse the{" "}
              <Link href="/#collection">full collection</Link>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  )
}
