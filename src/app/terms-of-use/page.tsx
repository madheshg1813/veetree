import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"

/** Terms for using the website itself. Buying is covered separately at /terms. */
const doc: LegalDoc = {
  title: "Terms of Use",
  href: "/terms-of-use",
  intro:
    "These terms cover your use of veetree.life as a website. If you are buying something, our Terms and Conditions apply as well.",
  metaDescription:
    "Veetree Terms of Use — permitted use of the website, intellectual property, accounts, acceptable use, third-party services and liability.",
  sections: [
    {
      heading: "1. Accepting these terms",
      blocks: [
        "By accessing or using {{domain}}, you accept these Terms of Use. If you do not accept them, please do not use the site.",
        "The site is operated by {{entityName}}. These terms sit alongside our Terms and Conditions, which govern purchases, and our Privacy Policy, which governs how we handle your information.",
      ],
    },
    {
      heading: "2. Permission to use the site",
      blocks: [
        "We grant you a limited, personal, non-exclusive, non-transferable and revocable licence to access and use the site to browse our products and place orders for your own use.",
        "This licence does not permit resale or commercial use of the site or its contents, use of the site to build a competing catalogue or dataset, or any derivative use of our product listings, descriptions or photographs.",
      ],
    },
    {
      heading: "3. Intellectual property",
      blocks: [
        "The Veetree name, logo, wordmark, product names, photography, illustrations, page design, and the text of our product descriptions and editorial content are owned by {{entityName}} or licensed to us, and are protected by copyright and trade mark law.",
        "You may not copy, reproduce, republish, distribute, adapt or exploit any of it without our prior written permission. Sharing a link to a page, or a screenshot in a personal review, is fine and welcome.",
        "Names of classical Ayurvedic preparations — Kumkumadi, Nalpamaradi and others — are traditional and are not claimed by us as trade marks.",
      ],
    },
    {
      heading: "4. Your account",
      blocks: [
        "Creating an account requires a valid email address, which we verify with a one-time code before the account is created. You are responsible for the accuracy of what you enter, for keeping your password confidential, and for all activity under your account.",
        "Do not share your password or your verification code with anyone, including anyone claiming to be from Veetree. We will never ask you for either.",
        "Tell us at {{supportEmail}} as soon as you suspect unauthorised access. We may suspend an account while we investigate.",
      ],
    },
    {
      heading: "5. Acceptable use",
      blocks: [
        "You agree not to:",
        {
          list: [
            "Use the site for any unlawful purpose, or in breach of these terms.",
            "Access the site with bots, crawlers, scrapers or any automated means, except a search engine crawler obeying our robots directives.",
            "Attempt to gain unauthorised access to the site, its servers, its database or any account that is not yours.",
            "Probe, scan or test the vulnerability of the site, or interfere with or disrupt its operation — including by overwhelming it with requests.",
            "Reverse engineer, decompile or attempt to derive the source of any part of the site.",
            "Impersonate any person, or misrepresent your affiliation with any person or organisation.",
            "Upload or transmit anything containing malware, or anything unlawful, defamatory, obscene, harassing or infringing.",
            "Place orders that are fraudulent, speculative, or made with no intention of accepting delivery.",
          ],
        },
        "If you are a security researcher and believe you have found a vulnerability, please report it to {{supportEmail}} rather than exploiting it. We will not pursue anyone who reports a genuine issue in good faith and gives us a reasonable chance to fix it.",
      ],
    },
    {
      heading: "6. Reviews and anything else you submit",
      blocks: [
        "If you send us a review, photograph, testimonial, suggestion or other content, you confirm it is yours to send and that it does not infringe anyone’s rights.",
        "You grant us a non-exclusive, royalty-free, worldwide licence to use, reproduce and display that content in connection with our products and marketing. You keep ownership of it, and you can ask us to stop using it at {{supportEmail}}.",
        "We may decline to publish, or may remove, anything we consider unlawful, misleading, offensive or irrelevant.",
      ],
    },
    {
      heading: "7. Third-party services and links",
      blocks: [
        "Parts of the site depend on third-party services — a payment gateway, a content delivery network, an email provider and hosting infrastructure. Their handling of your information is described in our Privacy Policy.",
        "The site links to third-party destinations, including our social media profiles and WhatsApp. We do not control those services and are not responsible for their content, their availability, or their privacy practices. Their terms apply once you leave our site.",
      ],
    },
    {
      heading: "8. Availability and accuracy",
      blocks: [
        "We do not guarantee that the site will be available uninterrupted or error-free. We may suspend, withdraw or restrict all or part of it for maintenance or for business reasons, generally without notice.",
        "We take care to keep product information, pricing and stock accurate, but the site is provided on an “as is” and “as available” basis, without warranties of any kind beyond those that cannot lawfully be excluded.",
      ],
    },
    {
      heading: "9. Suspension and termination",
      blocks: [
        "We may suspend or terminate your access to the site, or to your account, if you breach these terms or if we reasonably suspect fraud or misuse.",
        "You can close your account at any time by emailing {{supportEmail}}. Closing it does not affect orders already placed, or records we are required to keep — see the retention section of our Privacy Policy.",
      ],
    },
    {
      heading: "10. Limitation of liability",
      blocks: [
        "To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or inability to use, this website, including loss of data or loss of profit.",
        "Nothing here excludes liability that cannot lawfully be excluded, and your statutory rights as a consumer are unaffected. Liability relating to products you have bought is dealt with in our Terms and Conditions.",
      ],
    },
    {
      heading: "11. Governing law",
      blocks: [
        "These Terms of Use are governed by the laws of India, and the courts at {{jurisdiction}} have exclusive jurisdiction over any dispute arising from them.",
      ],
    },
    {
      heading: "12. Contact",
      blocks: [
        "Questions about these terms can go to {{supportEmail}}, or to {{phone}} on WhatsApp.",
      ],
    },
  ],
}

export const metadata: Metadata = legalMetadata(doc)

export default function TermsOfUsePage() {
  return <LegalPage doc={doc} />
}
