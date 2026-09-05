import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"
import { allProducts } from "@/lib/catalog"
import { COMBOS } from "@/lib/catalog/combos"

/**
 * Counts come from the catalogue rather than being typed in, so the page
 * cannot drift out of date the way a hand-written number does.
 */
const doc = (): LegalDoc => ({
  title: "About Us",
  href: "/about",
  intro:
    "Veetree makes Ayurvedic skin, hair and body care in small batches — built ingredient-up, from classical preparations rather than reformulated versions of them.",
  metaDescription:
    "About Veetree — small-batch Ayurvedic skin, hair and body care handcrafted in India. What we make, how we make it, and what we will not claim.",
  sections: [
    {
      heading: "What we make",
      blocks: [
        `Veetree currently makes ${allProducts().length} formulations across face care, hair care, body care, lip care and eye care, along with ${COMBOS.length} combination sets built around a single concern.`,
        "The range is built on classical Ayurvedic preparations — Kumkumadi, Nalpamaradi and similar time-honoured recipes — alongside cold-pressed oils, steam-distilled hydrosols and herbal infusions. Where a formulation carries a classical name, it is because the preparation follows that recipe, not because the name reads well on a label.",
      ],
    },
    {
      heading: "How we make it",
      blocks: [
        "Everything is blended in small, limited runs. That is a deliberate constraint rather than a marketing line: small batches mean a bottle reaches you closer to the day it was made, and it means we can change a formulation when we learn something instead of working through a warehouse first.",
        "Every product is built ingredient-up. The full ingredient list is published on the product page and printed on the pack — there is no proprietary blend standing in for the part we would rather not disclose.",
      ],
    },
    {
      heading: "What we do not do",
      blocks: [
        {
          list: [
            "We do not test on animals, and we do not work with anyone who does on our behalf.",
            "We do not use fillers to bulk out a formulation or to make a thin product feel richer than it is.",
            "We do not make medical claims. Our products are cosmetics. They are not intended to diagnose, treat, cure or prevent any disease — see our Disclaimer for what that means in practice.",
            "We do not sell or rent customer data. See our Privacy Policy for exactly who does receive it and why.",
          ],
        },
      ],
    },
    {
      heading: "About batch variation",
      blocks: [
        "Natural formulations vary. The colour, scent and texture of a product can shift slightly from one batch to the next, because the herbs, oils and distillates behind them shift with the season and the harvest. That is the raw material talking, not a defect, and it is not something we correct with dyes or synthetic fragrance.",
        "If a product arrives in a condition you did not expect — separated, leaking, or clearly different from what you have had before — tell us and we will look at the batch.",
      ],
    },
    {
      heading: "Who you are buying from",
      blocks: [
        "{{brand}} is a brand of {{entityName}}, a {{entityType}} registered in India.",
        { list: ["Registered address: {{address}}", "GSTIN: {{gstin}}", "Email: {{supportEmail}}", "WhatsApp: {{phone}}", "Instagram: {{instagram}}"] },
      ],
    },
    {
      heading: "Reaching us",
      blocks: [
        "WhatsApp on {{phone}} is the fastest way to reach us, and email at {{supportEmail}} works for anything that needs a record. We aim to reply within two business days.",
        "For a formal complaint, our Grievance Officer and the timelines we are bound to are set out at the end of our Terms and Conditions.",
      ],
    },
  ],
})

export const metadata: Metadata = legalMetadata(doc())

export default function AboutPage() {
  return <LegalPage doc={doc()} />
}
