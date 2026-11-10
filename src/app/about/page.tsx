import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"

/** The client's own About copy, followed by the business details gateways look for. */
const doc = (): LegalDoc => ({
  title: "About Us",
  href: "/about",
  intro: "Rooted in Tradition. Refined by Science.",
  metaDescription:
    "About Veetree — skincare, haircare and body care inspired by traditional beauty rituals and refined through modern science. What we make, what we don't do, and how batch numbers work.",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        "At VEETREE, we believe that nature holds timeless secrets to beauty and well-being.",
        "Inspired by generations of traditional beauty practices and guided by modern science, we bring together the goodness of nature and the precision of thoughtful formulation.",
        "Every product is thoughtfully crafted with carefully selected ingredients, drawing inspiration from fruits, flowers, herbs and nature's finest offerings.",
        "We believe skincare and haircare should be more than just a routine. They should be a meaningful connection with yourself and the natural world around you.",
        "Our journey is driven by one simple thought: bringing the wisdom of tradition into your everyday life through modern, thoughtful care.",
        { note: "VEETREE – Where Tradition Meets Modern Science." },
      ],
    },
    {
      heading: "What we make",
      blocks: [
        "At VEETREE, we create thoughtfully crafted skincare, haircare and body care products inspired by traditional beauty rituals and refined through modern science.",
        // "30+" is the client's wording; keep it true against the catalogue count.
        "With a collection of 30+ carefully crafted products, our range brings together the goodness of fruits, flowers, herbs and nature-inspired ingredients.",
        "From nourishing hair oils and revitalising serums to skin-brightening formulations, herbal gels, moisturisers, lip care and body care essentials, every product is thoughtfully developed to make everyday self-care a beautiful experience.",
        "We bring traditional wisdom and modern scientific understanding together to create care that feels close to nature and belongs in your everyday routine.",
        { note: "30+ Products. One Beautiful Connection with Nature." },
      ],
    },
    {
      heading: "What we don't do",
      blocks: [
        "At VEETREE, we believe beauty should never come at the cost of trust.",
        {
          list: [
            "We don't compromise on ingredient quality.",
            "We don't believe in unnecessary shortcuts.",
            "We don't make unrealistic beauty promises.",
            "We don't overlook the importance of thoughtful formulation.",
            "We don't follow trends blindly; we believe in meaningful care.",
          ],
        },
        "(Because beauty deserves honesty, care and purpose)",
      ],
    },
    {
      heading: "About batch verification",
      blocks: [
        "Your trust is our priority.",
        "At VEETREE, we believe in transparency and quality at every step. Every product carries a unique batch number that helps identify its production details.",
        "Enter your product's batch number to verify its batch information and ensure greater confidence in your purchase.",
        { note: "Know Your Batch. Trust Your Product." },
      ],
    },
    {
      heading: "Who you are buying from",
      blocks: [
        "{{brand}} is the brand of {{entityName}}, trading in India since {{since}}.",
        { list: ["Address: {{address}}", "Email: {{supportEmail}}", "WhatsApp: {{phone}}", "Instagram: {{instagram}}"] },
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
