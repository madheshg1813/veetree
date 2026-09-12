import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs"
import { JsonLd } from "@/components/catalog/JsonLd"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { business, policy } from "@/lib/legal/business"
import { site } from "@/lib/site"
import { whatsappLink } from "@/lib/whatsapp"

const TITLE = "Contact Us | Veetree"
const DESCRIPTION =
  "Reach Veetree on WhatsApp or by email for help with an order, a product question, or an exchange. Our address, hours and grievance officer."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact", type: "website" },
}

/**
 * Contact Us.
 *
 * Google was already listing this page and it was a 404 — someone following
 * that link reached a dead end. It is also the page a customer looks for when
 * something has gone wrong, and one a payment gateway expects to find.
 *
 * Every detail comes from the same source the policies use, so an address or
 * an email cannot say one thing here and another on the Terms.
 */
export default function ContactPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
  ]

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: business.entityName ?? site.name,
          url: site.url,
          email: business.supportEmail,
          telephone: site.whatsappDisplay,
          address: business.address
            ? {
                "@type": "PostalAddress",
                streetAddress: business.address[0],
                addressLocality: business.address[1],
                addressRegion: "Tamil Nadu",
                postalCode: "603202",
                addressCountry: "IN",
              }
            : undefined,
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: business.supportEmail,
            telephone: site.whatsappDisplay,
            areaServed: "IN",
            availableLanguage: ["English", "Tamil"],
          },
        }}
      />

      <SiteHeader />

      <main className="plp">
        <div className="shell">
          <Breadcrumbs trail={trail} />
        </div>

        <header className="shell plp__head">
          <h1 className="plp__title">Contact Us</h1>
          <p className="plp__intro">
            A real person reads every message. WhatsApp is quickest; email is best when you need
            to send photographs or a video.
          </p>
        </header>

        <section className="shell plp__block">
          <ul className="contact">
            <li className="contact__card">
              <h2>WhatsApp</h2>
              <p className="contact__value">
                <a href={whatsappLink()}>{site.whatsappDisplay}</a>
              </p>
              <p className="contact__note">
                For order questions, sizes and anything you would rather just ask.
              </p>
            </li>

            <li className="contact__card">
              <h2>Email</h2>
              <p className="contact__value">
                <a href={`mailto:${business.supportEmail}`}>{business.supportEmail}</a>
              </p>
              <p className="contact__note">
                Best for exchanges — attach your order number and the unboxing video.
              </p>
            </li>

            <li className="contact__card">
              <h2>Instagram</h2>
              <p className="contact__value">
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                  @{site.instagramHandle}
                </a>
              </p>
              <p className="contact__note">New batches, and what goes into them.</p>
            </li>
          </ul>
        </section>

        <section className="shell plp__block">
          <h2 className="pdp__h2">Where we are</h2>
          <address className="contact__address">
            {business.entityName}
            <br />
            {business.address?.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            India
          </address>
          <p className="contact__note">
            This is where orders are packed and posted. It is not a shop — please do not visit
            without arranging it first.
          </p>
        </section>

        <section className="shell plp__block">
          <h2 className="pdp__h2">Before you write</h2>
          <p className="pdp__lede">
            Two things answer most messages faster than we can:
          </p>
          <ul className="contact__links">
            <li>
              <Link href="/shipping-policy">Shipping &amp; Delivery</Link> — what delivery costs,
              how long it takes, and what to do about a late parcel.
            </li>
            <li>
              <Link href="/refund-policy">Exchange &amp; Refunds</Link> — we exchange rather than
              refund, within {policy.reportWindow} of delivery, with an unboxing video.
            </li>
          </ul>
        </section>

        <section className="shell plp__block">
          <h2 className="pdp__h2">Grievance Officer</h2>
          <p className="pdp__lede">
            Required by the Consumer Protection (E-Commerce) Rules, 2020. If a complaint has not
            been resolved, write to {business.grievanceOfficer.name} at{" "}
            <a href={`mailto:${business.grievanceOfficer.email}`}>
              {business.grievanceOfficer.email}
            </a>
            . We acknowledge within {policy.reportWindow} and aim to resolve within one month.
          </p>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </>
  )
}
