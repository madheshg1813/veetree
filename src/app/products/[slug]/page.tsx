import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { BuyBox } from "@/components/catalog/BuyBox"
import { FaqList } from "@/components/catalog/FaqList"
import { InfoSections } from "@/components/catalog/InfoSections"
import { JsonLd } from "@/components/catalog/JsonLd"
import { ProductGallery } from "@/components/catalog/ProductGallery"
import { StickyBuyBar } from "@/components/catalog/StickyBuyBar"
import { ReviewForm } from "@/components/product/ReviewForm"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { RelatedProducts } from "@/components/catalog/RelatedProducts"
import {
  allProductSlugs,
  commerce,
  defaultVariant,
  getProduct,
  isPurchasable,
} from "@/lib/catalog"
import { howToAsList, howToParagraph, howToSteps } from "@/lib/catalog/howTo"
import { ingredientIcon } from "@/lib/catalog/ingredientIcon"
import { liveProduct, liveRelated } from "@/lib/catalog/live"
import { site } from "@/lib/site"

/**
 * Was false, which 404'd any slug not known at build time. Only the
 * hand-written products are prerendered; a product added in the dashboard is
 * rendered on first request and then cached like the rest, which is what lets
 * it go live without a deploy.
 */
export const dynamicParams = true

export function generateStaticParams() {
  return allProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const product = getProduct((await params).slug)
  if (!product) return {}
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: product.seo.canonical },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: product.seo.canonical,
      type: "website",
      images: product.images.map((i) => ({
        url: i.src,
        width: i.width,
        height: i.height,
      })),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const product = await liveProduct((await params).slug)
  if (!product) notFound()

  const trail = [
    { label: "Home", href: "/" },
    { label: product.category.label, href: product.category.href },
    ...(product.collection ? [product.collection] : []),
    { label: product.name, href: `/products/${product.slug}` },
  ]

  const related = await liveRelated(product)
  const variant = defaultVariant(product)
  const purchasable = isPurchasable(product)
  /** The narrowest collection page this product belongs to. */
  const home = product.collection ?? product.category

  const activeTrust = commerce.trustSignals.filter((t) => t.enabled)

  /**
   * The ingredients to show. Prefer the published full list; fall back to the
   * key ingredients when a product has no full list yet, so the section still
   * says something rather than disappearing.
   */
  const ingredientNames: readonly string[] = product.fullIngredients?.length
    ? product.fullIngredients
    : product.keyIngredients.map((i) => i.name)

  // aggregateRating is intentionally absent — no reviews have been collected.
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    sku: variant.sku,
    description: product.seo.description,
    image: product.images.map((i) => `${site.url}${i.src}`),
    brand: { "@type": "Brand", name: product.brand },
    category: product.category.label,
    // One offer per priced size. Unpriced variants are omitted rather than
    // guessed at, so the markup never states a price we do not have.
    offers: product.variants
      .filter((v) => v.price !== null)
      .map((v) => ({
        "@type": "Offer",
        url: `${site.url}${product.seo.canonical}`,
        sku: v.sku,
        name: v.size,
        price: v.price,
        priceCurrency: "INR",
        availability: purchasable
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: product.brand },
      })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href}`,
    })),
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      {commerce.emitFaqSchema && product.faqs.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: product.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      ) : null}

      <SiteHeader />

      <main className="pdp">
        <div className="shell">
          <Breadcrumbs trail={trail} />
        </div>

        {/* ── Above the fold ─────────────────────────────────────── */}
        <section className="shell pdp__hero">
          <div className="pdp__media">
            <ProductGallery images={product.images} />
          </div>

          <div className="pdp__buy">
            <p className="pdp__eyebrow">
              <Link href={home.href}>{home.label}</Link>
              <span aria-hidden="true"> · </span>
              {product.variants.map((v) => v.size).join(" · ")}
            </p>

            <h1 className="pdp__title">
              {product.brand} {product.name}
            </h1>

            {product.rating ? (
              <p className="pdp__rating">
                ★ {product.rating.value.toFixed(1)}{" "}
                <span>({product.rating.count} reviews)</span>
              </p>
            ) : null}

            {/*
              The one-line tagline, not the fuller paragraph. Directly under
              the title a customer wants to know what this is in a glance; the
              longer copy is still on the page, in Product Details.
            */}
            <p className="pdp__short">{product.tagline ?? product.shortDescription}</p>

            <ul className="badges">
              {product.badges.map((b) => (
                <li key={b.label} title={b.title}>
                  <span aria-hidden="true">✓</span> {b.label}
                </li>
              ))}
            </ul>

            {commerce.freeDelivery.enabled ? (
              <p className="delivery">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 19Zm10 0a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <strong>{commerce.freeDelivery.label}</strong>
                <span>{commerce.freeDelivery.note}</span>
              </p>
            ) : null}

            <BuyBox product={product} />

            {activeTrust.length ? (
              <ul className="trustrow">
                {activeTrust.map((t) => (
                  <li key={t.id}>
                    <strong>{t.label}</strong>
                    {t.note ? <span>{t.note}</span> : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        {/*
          ── Ingredients ───────────────────────────────────────────
          One section, not two. The old "Key Ingredients" cards were the first
          four entries of the full list repeated, each captioned with the same
          filler sentence on every product — so the page listed the same things
          twice and told the reader nothing. This shows the real list once,
          behind a chevron, with the matched illustration beside each name.
        */}
        {ingredientNames.length ? (
          <section className="shell pdp__block">
            <details className="acc acc--ingredients">
              <summary className="acc__head">
                <h2 className="pdp__h2 acc__title">Ingredients We Used</h2>
                <span className="acc__count">{ingredientNames.length}</span>
                <span className="acc__chev" aria-hidden="true" />
              </summary>
              <div className="acc__body">
                <ul className="inglist">
                  {ingredientNames.map((name) => {
                    const Icon = ingredientIcon(name)
                    return (
                      <li key={name}>
                        <span className="inglist__mark" aria-hidden="true">
                          <Icon strokeWidth={1.6} />
                        </span>
                        <span>{name}</span>
                      </li>
                    )
                  })}
                </ul>
                {product.fullIngredients?.length ? null : (
                  <p className="note inglist__note">
                    The complete ingredients list is printed on the pack.
                  </p>
                )}
              </div>
            </details>
          </section>
        ) : null}

        {/* ── How to use ─────────────────────────────────────────── */}
        {product.howToUse.length ? (
          <section className="shell pdp__block">
            <h2 className="pdp__h2">How to Use</h2>
            {howToAsList(product.howToUse) ? (
              <ol className="howto__list">
                {howToSteps(product.howToUse).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            ) : (
              <p className="howto">{howToParagraph(product.howToUse)}</p>
            )}
          </section>
        ) : null}

        {/* ── Details ────────────────────────────────────────────── */}
        <section className="shell pdp__block">
          <h2 className="pdp__h2">Product Details</h2>
          <InfoSections sections={product.sections} />
        </section>

        {/* ── FAQ ────────────────────────────────────────────────── */}
        {product.faqs.length ? (
          <section className="shell pdp__block" id="faq">
            <h2 className="pdp__h2">Questions About This Serum</h2>
            <FaqList faqs={product.faqs} idPrefix={product.slug} />
          </section>
        ) : null}

        {/* ── Related ────────────────────────────────────────────── */}
        {related.length ? (
          <section className="shell pdp__block">
            <h2 className="pdp__h2">You May Also Like</h2>
            <RelatedProducts products={related} />
          </section>
        ) : null}

        {/* ── Internal links ─────────────────────────────────────── */}
        <section className="shell pdp__block">
          <div className="crosslinks">
            <p>
              {product.collection ? (
                <>
                  This product sits in our{" "}
                  <Link href={product.collection.href}>
                    {product.collection.label.toLowerCase()}
                  </Link>{" "}
                  range, alongside everything else in{" "}
                  <Link href={product.category.href}>
                    {product.category.label.toLowerCase()}
                  </Link>
                  .
                </>
              ) : (
                <>
                  Browse the rest of our{" "}
                  <Link href={product.category.href}>
                    {product.category.label.toLowerCase()}
                  </Link>{" "}
                  range.
                </>
              )}
            </p>
          </div>
        </section>
        {/* ── Write a review ─────────────────────────────────────── */}
        <section className="shell pdp__block" aria-labelledby="wr-h">
          <h2 className="pdp__h2" id="wr-h">Write a Review</h2>
          <p className="pdp__lede">
            Used this? Tell other people what it did for you. We publish reviews as they
            are written.
          </p>
          <ReviewForm slug={product.slug} productName={product.name} />
        </section>
      </main>

      <SiteFooter />
      <StickyBuyBar product={product} />
    </>
  )
}
