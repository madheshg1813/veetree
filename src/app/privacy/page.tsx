import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"

/**
 * Written against what the site actually does rather than from a template:
 * the processors named below are the ones the code really calls, and the
 * security claims describe the mechanisms that are really in place.
 */
const doc: LegalDoc = {
  title: "Privacy Policy",
  href: "/privacy",
  intro:
    "What Veetree collects about you, why, who else sees it, and what you can ask us to do with it.",
  metaDescription:
    "Veetree Privacy Policy — the personal data we collect, how we use and share it, cookies, security, retention, your rights under Indian law, and how to raise a grievance.",
  sections: [
    {
      heading: "1. Scope",
      blocks: [
        "This policy explains how {{entityName}}, which operates {{domain}}, handles personal data. It applies to the website, to orders placed through it, and to messages you send us by email or WhatsApp.",
        "We handle personal data in accordance with the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.",
      ],
    },
    {
      heading: "2. What we collect",
      blocks: [
        "When you create an account: your email address, a password, and your name if you give it.",
        "When you place an order: your delivery address, phone number, the contents of your order, and the order history that builds up over time.",
        "When you contact us: whatever you choose to tell us, and the message record itself.",
        "Automatically, when you browse: your IP address, browser and device type, pages viewed and referring page. This is ordinary web traffic data and we use it in aggregate.",
        {
          note:
            "We do not collect your card number, UPI ID, CVV, or net-banking credentials. Those go directly from your browser to our payment gateway. We never see them and they never touch our servers.",
        },
        "Your password is not stored by us in a readable form. It is hashed by our commerce backend, and neither we nor anyone with access to our database can read it back.",
      ],
    },
    {
      heading: "3. Email verification codes",
      blocks: [
        "Creating an account requires a one-time code sent to your email address. We store only a cryptographic hash of that code, never the code itself, and the stored hash is deleted once the code is used or expires — whichever comes first. Codes expire after ten minutes.",
        "We rate-limit how often codes can be requested for an address and how many attempts can be made against one, to protect your inbox and your account from abuse.",
      ],
    },
    {
      heading: "4. Why we use it",
      blocks: [
        "We use your personal data to:",
        {
          list: [
            "Create and secure your account, and verify that the email address is yours.",
            "Process, fulfil and deliver your orders, and handle returns and refunds.",
            "Send you service messages about an order — confirmation, dispatch, delivery and any problem that arises. These are not marketing and you cannot opt out of them while an order is live.",
            "Answer your questions and resolve complaints.",
            "Detect and prevent fraud and misuse of the site.",
            "Meet legal and tax obligations, including retaining invoices for the period the law requires.",
            "Understand, in aggregate, how the site is used so we can improve it.",
          ],
        },
        "We send marketing email only if you have asked for it, and every such message carries a way to stop receiving them.",
      ],
    },
    {
      heading: "5. Who else receives it",
      blocks: [
        "We do not sell, rent or trade your personal data. We share it only with the service providers who make the store work, and only with what they need:",
        {
          list: [
            "Razorpay — our payment gateway, which processes your payment and receives the details needed to do so.",
            "Our courier partners — who receive your name, delivery address and phone number in order to deliver your parcel.",
            "Resend — our transactional email provider, which delivers your verification codes and order emails.",
            "Railway and our web host — which run the commerce backend and the website, and therefore store the data described above.",
            "Cloudinary — our image content delivery network, which serves product photographs. It receives ordinary request data such as your IP address; it receives no account or order information.",
          ],
        },
        "We may also disclose personal data where the law requires it, to a court or regulator, or where necessary to establish or defend a legal claim.",
        "If our business is transferred to another entity, customer records may transfer with it. We would tell you before that happened.",
      ],
    },
    {
      heading: "6. Cookies and similar technologies",
      blocks: [
        "We use cookies that are necessary for the site to function: one keeps your cart, and one keeps you signed in. The sign-in cookie is httpOnly, meaning no script running in your browser can read it, and it carries no readable information about you.",
        "Blocking these cookies will prevent you from staying signed in or completing checkout.",
        "Our web fonts are served from our own domain rather than fetched from a third party at page load, so browsing the site does not, by itself, report your visit to a font provider.",
      ],
    },
    {
      heading: "7. How we protect it",
      blocks: [
        "The site is served over HTTPS, so traffic between your browser and us is encrypted in transit. Passwords are stored only as hashes. Verification codes are stored only as hashes and compared in a way that does not leak information through timing. The session cookie is httpOnly and, in production, restricted to secure connections.",
        "Access to the administrative dashboard is restricted and password-protected.",
        "No system is perfectly secure, and we cannot guarantee absolute security. If a breach affects your personal data, we will notify you and the relevant authority as required by law.",
      ],
    },
    {
      heading: "8. How long we keep it",
      blocks: [
        "Account data is kept while your account is open. Order and invoice records are kept for as long as tax and company law requires us to keep them, which is generally eight years, even after an account is closed.",
        "Verification codes are deleted on use or expiry. Support correspondence is kept for as long as it is useful for resolving related issues.",
      ],
    },
    {
      heading: "9. Your rights",
      blocks: [
        "You can ask us to:",
        {
          list: [
            "Give you a copy of the personal data we hold about you.",
            "Correct anything inaccurate or incomplete.",
            "Delete your account and the data we are not legally required to retain.",
            "Stop sending you marketing messages.",
            "Withdraw a consent you previously gave, where our use of your data rests on that consent.",
          ],
        },
        "Write to {{supportEmail}} from the address on your account and we will respond within thirty days. We may ask you to confirm your identity first — that is a protection for you, not an obstacle.",
        "Withdrawing consent or asking for deletion may make it impossible for us to continue supplying you, and it does not undo processing that was lawful before you asked.",
      ],
    },
    {
      heading: "10. Children",
      blocks: [
        "This site is not intended for anyone under 18 and we do not knowingly collect data from children. If you believe a child has given us personal data, write to {{supportEmail}} and we will delete it.",
      ],
    },
    {
      heading: "11. Changes to this policy",
      blocks: [
        "We may update this policy. The date at the top of this page shows when the current version took effect, and we will give notice of any material change before it applies to you.",
      ],
    },
    {
      heading: "12. Grievance Officer",
      blocks: [
        "If you have a concern about how we handle your personal data, contact:",
        {
          list: [
            "Name: {{grievanceName}}",
            "Email: {{grievanceEmail}}",
            "Phone: {{grievancePhone}}",
            "Address: {{address}}",
          ],
        },
        "We acknowledge complaints within 48 hours and aim to resolve them within one month.",
      ],
    },
  ],
}

export const metadata: Metadata = legalMetadata(doc)

export default function PrivacyPage() {
  return <LegalPage doc={doc} />
}
