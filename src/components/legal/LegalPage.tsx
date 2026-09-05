import { Fragment } from "react"
import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { JsonLd } from "@/components/catalog/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { business, policy } from "@/lib/legal/business"
import { site } from "@/lib/site"

/**
 * Shared shell for the policy pages.
 *
 * The documents are written as data rather than JSX so the prose stays free of
 * markup escaping, and so every page renders with identical structure — which
 * matters when a customer or a payment gateway is comparing them.
 */
export type Block = string | { list: string[] } | { note: string }

export interface Section {
  heading: string
  blocks: Block[]
}

export interface LegalDoc {
  title: string
  href: string
  intro: string
  metaDescription: string
  sections: Section[]
}

/**
 * Values the documents interpolate, as `{{token}}`.
 *
 * A null value renders as a visible marker instead of an empty gap, so an
 * unconfirmed business detail is impossible to miss on the page.
 */
const TOKENS: Record<string, string | null> = {
  brand: site.name,
  domain: site.domain,
  url: site.url,
  phone: site.whatsappDisplay,
  instagram: `@${site.instagramHandle}`,

  entityName: business.entityName,
  entityType: business.entityType,
  address: business.address?.join(", ") ?? null,
  gstin: business.gstin,
  jurisdiction: business.jurisdictionCity,
  supportEmail: business.supportEmail,
  grievanceName: business.grievanceOfficer.name,
  grievanceEmail: business.grievanceOfficer.email,
  grievancePhone: business.grievanceOfficer.phone,

  dispatchDays: policy.dispatchDays,
  deliveryDays: policy.deliveryDays,
  reportWindow: policy.reportWindow,
  returnWindow: policy.returnWindow,
  refundDays: policy.refundDays,
  shipsTo: policy.shipsTo,
}

/** Splits "…{{token}}…" into text and resolved token nodes. */
function interpolate(text: string, keyPrefix: string) {
  return text.split(/(\{\{\w+\}\})/g).map((part, i) => {
    const match = /^\{\{(\w+)\}\}$/.exec(part)
    if (!match) return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>

    const name = match[1] as string
    const value = TOKENS[name]
    if (value) return <Fragment key={`${keyPrefix}-${i}`}>{value}</Fragment>
    return (
      <mark key={`${keyPrefix}-${i}`} className="legal__tbd" title={`Business detail "${name}" is not filled in yet`}>
        [{name} — to be confirmed]
      </mark>
    )
  })
}

function renderBlock(block: Block, key: string) {
  if (typeof block === "string") return <p key={key}>{interpolate(block, key)}</p>
  if ("list" in block) {
    return (
      <ul key={key} className="legal__list">
        {block.list.map((item, i) => (
          <li key={`${key}-${i}`}>{interpolate(item, `${key}-${i}`)}</li>
        ))}
      </ul>
    )
  }
  return (
    <p key={key} className="legal__note">
      {interpolate(block.note, key)}
    </p>
  )
}

export function legalMetadata(doc: LegalDoc): Metadata {
  const title = `${doc.title} | ${site.name}`
  return {
    title,
    description: doc.metaDescription,
    alternates: { canonical: doc.href },
    openGraph: { title, description: doc.metaDescription, url: doc.href, type: "website" },
  }
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const trail = [
    { label: "Home", href: "/" },
    { label: doc.title, href: doc.href },
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

      <main className="plp legal">
        <div className="shell">
          <Breadcrumbs trail={trail} />
        </div>

        <header className="shell plp__head">
          <h1 className="plp__title">{doc.title}</h1>
          <p className="plp__intro">{doc.intro}</p>
          <p className="legal__updated">Last updated {business.lastUpdated}</p>
        </header>

        <div className="shell legal__body">
          {doc.sections.map((section, si) => (
            <section key={section.heading} className="legal__section" aria-labelledby={`s-${si}`}>
              <h2 id={`s-${si}`}>{section.heading}</h2>
              {section.blocks.map((block, bi) => renderBlock(block, `${si}-${bi}`))}
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  )
}
