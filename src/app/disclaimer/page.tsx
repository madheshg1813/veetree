import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"

/**
 * The document that matters most for a botanical cosmetics brand: it draws the
 * line between the traditional language the products carry and a medical claim.
 */
const doc: LegalDoc = {
  title: "Disclaimer",
  href: "/disclaimer",
  intro:
    "Veetree products are cosmetics, not medicines. Please read this before using anything you buy from us.",
  metaDescription:
    "Veetree Disclaimer — cosmetic products, not medicines. Patch testing, allergies, individual results, batch variation and the limits of the information on this site.",
  sections: [
    {
      heading: "Our products are cosmetics",
      blocks: [
        "Everything Veetree makes is a cosmetic product intended for external application to the skin, hair and lips. None of it is a drug, a medicine or a therapeutic product.",
        "Nothing on this website — product names, descriptions, ingredient notes, testimonials, or anything on our social media — is intended to diagnose, treat, cure or prevent any disease or medical condition. No statement we make has been evaluated as a therapeutic claim, and none should be read as one.",
        "Where a product carries the name of a classical Ayurvedic preparation, such as Kumkumadi or Nalpamaradi, that name describes the recipe the formulation follows. It is heritage and provenance, not a medical indication.",
      ],
    },
    {
      heading: "Please patch test first",
      blocks: [
        "Before using a new product, apply a small amount to the inside of your forearm and leave it for 24 hours. If you see redness, itching, burning, swelling or any other reaction, do not use the product.",
        "Stop using a product immediately if irritation develops at any point, even after you have used it before without trouble. Sensitivity can develop over time.",
        "If a reaction is severe, persists, or affects your eyes, seek medical attention. Take the product and its ingredient list with you.",
      ],
    },
    {
      heading: "Natural does not mean risk-free",
      blocks: [
        "Botanical ingredients, essential oils, cold-pressed oils and herbal extracts are all capable of causing allergic or irritant reactions in some people. Being plant-derived makes an ingredient no safer for an individual who is sensitive to it.",
        "The complete ingredient list for every product is published on its product page and printed on the pack. If you have a known allergy — to nuts, to a particular oil, to a fragrance component — read it before you buy, and ask us if anything is unclear.",
        "Some botanical ingredients, including citrus oils, can increase the skin’s sensitivity to sunlight. Where that applies to a product, its page says so.",
      ],
    },
    {
      heading: "Speak to a doctor if any of this applies to you",
      blocks: [
        "Please consult a qualified medical practitioner before using our products if you:",
        {
          list: [
            "Are pregnant, trying to conceive, or breastfeeding.",
            "Have an active skin condition such as eczema, psoriasis, rosacea or dermatitis.",
            "Have broken, inflamed, sunburnt or recently treated skin.",
            "Are undergoing dermatological treatment, or using prescription topicals such as retinoids or acids.",
            "Have a known allergy to any listed ingredient.",
            "Are buying for a child.",
          ],
        },
        "Nothing we tell you — on this site, on WhatsApp, or on social media — is medical advice, and it is not a substitute for consulting a doctor or a qualified Ayurvedic practitioner. Never delay or disregard professional medical advice because of something you read here.",
      ],
    },
    {
      heading: "Results vary",
      blocks: [
        "Skin and hair differ enormously between people, and so do outcomes. Testimonials and reviews on this site describe individual experiences. They are not a promise of what any product will do for you, and they are not typical or guaranteed results.",
        "We do not claim timelines for results, and we would be suspicious of anyone in this category who does.",
      ],
    },
    {
      heading: "Using our products safely",
      blocks: [
        {
          list: [
            "For external use only. Do not swallow any of our products.",
            "Avoid contact with the eyes. If a product enters the eye, rinse thoroughly with clean water.",
            "Keep out of the reach of children.",
            "Store away from direct sunlight and heat, and close the cap properly — natural formulations without heavy preservative systems are more sensitive to how they are stored.",
            "Use within the period stated on the pack, and follow the directions given on the product page.",
          ],
        },
      ],
    },
    {
      heading: "Batch variation",
      blocks: [
        "The colour, scent and texture of our products can differ slightly from batch to batch, because the herbs, oils and distillates behind them differ with the season and the harvest. We do not correct that with dyes or synthetic fragrance.",
        "Such variation is characteristic of the ingredients and is not a defect. A product that arrives separated, leaking or visibly spoiled is a different matter — tell us and see the returns section of our Terms and Conditions.",
      ],
    },
    {
      heading: "Photographs and information on this site",
      blocks: [
        "Product photographs are indicative. Colours reproduce differently on different screens, and packaging changes over time.",
        "The general information on this site about ingredients and traditional practice is provided in good faith for interest and context. We do not warrant that it is complete, current or applicable to your circumstances, and we accept no liability for any action taken in reliance on it.",
      ],
    },
    {
      heading: "External links",
      blocks: [
        "Where we link to another website, we do so for convenience. We do not control those sites and are not responsible for their content or accuracy, and a link is not an endorsement.",
      ],
    },
    {
      heading: "Questions",
      blocks: [
        "If you are unsure whether a product suits you, ask before you buy — {{phone}} on WhatsApp, or {{supportEmail}}. We would rather talk you out of a purchase than sell you something that will not work for your skin.",
      ],
    },
  ],
}

export const metadata: Metadata = legalMetadata(doc)

export default function DisclaimerPage() {
  return <LegalPage doc={doc} />
}
