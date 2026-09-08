import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"

/**
 * The exchange policy, on its own page.
 *
 * It is stated inside the Terms as well, and the two must agree — this page is
 * the same policy pulled out where people and payment gateways look for it,
 * not a second set of rules. Change one and change the other.
 */
const doc: LegalDoc = {
  title: "Cancellation, Exchange & Refund Policy",
  href: "/refund-policy",
  intro:
    "Veetree exchanges products rather than refunding them. This page sets out when, how, and what evidence we need.",
  metaDescription:
    "Veetree cancellation, exchange and refund policy — exchange-only on delivered goods, the unboxing video requirement, timelines, and the cases where money is returned.",
  sections: [
    {
      heading: "The short version",
      blocks: [
        {
          note:
            "We do not offer refunds on delivered products. Where something has gone wrong, we exchange the product. Money is returned only where no goods reached you at all — a cancelled order, an item that turned out to be unavailable, or a duplicate charge.",
        },
        "Cosmetics are a hygiene-sensitive category. Once a product has been opened, we cannot accept it back, resell it, or return it to stock — which is why this policy works the way it does.",
      ],
    },
    {
      heading: "Cancelling before dispatch",
      blocks: [
        "You may cancel at no cost any time before the order is handed to the courier. Message {{phone}} on WhatsApp or email {{supportEmail}} with your order number, and the full amount is returned to the original payment method.",
        "Once the parcel is with the courier it cannot be cancelled, and the exchange terms below apply instead.",
      ],
    },
    {
      heading: "When we will exchange a product",
      blocks: [
        {
          list: [
            "It arrived damaged, leaking or with a broken seal.",
            "You received the wrong product or the wrong variant.",
            "An item listed on your invoice was missing from the parcel.",
            "The product was past, or close to, its expiry date on arrival.",
          ],
        },
      ],
    },
    {
      heading: "The unboxing video",
      blocks: [
        {
          note:
            "Every exchange claim needs one. A single continuous video that starts before the sealed parcel is opened and runs until the products are unwrapped, with the shipping label clearly visible.",
        },
        "Start recording before you cut the tape. A video that begins with the parcel already open cannot show the condition it arrived in, and is the most common reason a claim is refused — so this is worth getting right the first time rather than discovering it afterwards.",
        "Keep the packaging and the product until the claim is settled. We may need to see both.",
        "Without the video we cannot tell a product damaged in transit from one damaged after opening, and the claim cannot be approved.",
      ],
    },
    {
      heading: "How to claim",
      blocks: [
        "Send the video and your order number to {{phone}} on WhatsApp, or to {{supportEmail}}, within {{reportWindow}} of delivery.",
        "We confirm whether the claim is approved, arrange collection of the original item at our cost, and dispatch the replacement within {{exchangeDispatchDays}} of approval.",
        "A product is exchanged for the same product. If it is genuinely unavailable, we will agree an alternative of equal value with you.",
      ],
    },
    {
      heading: "What we cannot exchange",
      blocks: [
        {
          list: [
            "A change of mind. Please check the size, variant and quantity before ordering.",
            "A product that did not give the result you hoped for — individual results vary, and no cosmetic works identically for everyone.",
            "Slight differences in colour or scent from a previous batch, which are inherent to natural formulations and not a defect.",
            "A claim reported after {{reportWindow}} from delivery, or without an unboxing video.",
            "A product opened, used or damaged after delivery.",
          ],
        },
        "If a product is not working for you, message us anyway. We would rather help you use it correctly, or suggest something better suited, than leave you with something you will not use.",
      ],
    },
    {
      heading: "When money is returned",
      blocks: [
        "An exchange is not possible for something that was never delivered, and we do not keep payment for goods we have not supplied. The full amount goes back to the original payment method when:",
        {
          list: [
            "You cancel before dispatch.",
            "We cancel your order, or an item proves unavailable after you have paid.",
            "A pricing or listing error means we do not fulfil the order.",
            "You are charged more than once for the same order.",
          ],
        },
        "Returns are made to the original payment method within five to ten business days of confirmation. We cannot send money to a different account or method.",
        "If a payment fails but the amount leaves your account, that is a gateway reversal rather than a refund — it typically returns within five to ten business days. Send us the transaction reference and we will chase it with the gateway for you.",
      ],
    },
    {
      heading: "Combination sets",
      blocks: [
        "Combos are sold as single units at a set price and are not split for an exchange. Where one product inside a combo arrives damaged or wrong, we exchange that product rather than the whole set.",
      ],
    },
    {
      heading: "If you are not satisfied with the outcome",
      blocks: [
        "Contact our Grievance Officer, {{grievanceName}}, at {{grievanceEmail}} or {{grievancePhone}}. We acknowledge every complaint within 48 hours and work to resolve it within one month, in line with the Consumer Protection (E-Commerce) Rules, 2020.",
        "Nothing in this policy affects your rights under the Consumer Protection Act, 2019.",
      ],
    },
  ],
}

export const metadata: Metadata = legalMetadata(doc)

export default function RefundPolicyPage() {
  return <LegalPage doc={doc} />
}
