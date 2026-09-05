import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"

/** Terms of sale — the contract for buying. Website use is covered separately at /terms-of-use. */
const doc: LegalDoc = {
  title: "Terms and Conditions",
  href: "/terms",
  intro:
    "These terms govern the sale of Veetree products through veetree.life. Placing an order means you accept them.",
  metaDescription:
    "Veetree Terms and Conditions — orders, pricing, payment, shipping, cancellation, returns, refunds, liability and grievance redressal.",
  sections: [
    {
      heading: "1. Who you are contracting with",
      blocks: [
        "{{domain}} is operated by {{entityName}}, a {{entityType}} registered in India at {{address}}, GSTIN {{gstin}}. In these terms, “we”, “us” and “Veetree” mean that entity, and “you” means the person placing the order.",
        "These terms apply to every order placed through the website. They sit alongside our Terms of Use, Privacy Policy and Disclaimer, all of which form part of your agreement with us.",
      ],
    },
    {
      heading: "2. Eligibility and your account",
      blocks: [
        "You must be at least 18 years old and legally able to enter into a contract in India to buy from us. By ordering, you confirm that you are.",
        "Checkout requires an account. When you create one, we verify your email address with a one-time code before the account exists, so an account can only be opened by someone who controls that inbox. You are responsible for keeping your password confidential and for everything done through your account. Tell us immediately if you believe someone else has access to it.",
        "You agree that the name, email address, phone number and delivery address you give us are accurate and current. We are not liable for a delivery that fails because the address was wrong or incomplete.",
      ],
    },
    {
      heading: "3. Products, images and descriptions",
      blocks: [
        "Our products are cosmetics. They are not medicines, and nothing on this website should be read as a claim to diagnose, treat, cure or prevent any disease or condition. Please read our Disclaimer before using any product, particularly the guidance on patch testing.",
        "Product photographs are indicative. Colour reproduction varies between screens, and natural formulations vary in colour, scent and texture from batch to batch. Such variation is characteristic of the ingredients and is not a defect.",
        "The full ingredient list for every product is published on its product page and printed on the pack. If you have a known allergy or sensitivity, read it before ordering.",
        "We may add, change, reformulate or discontinue a product at any time. Where a formulation changes materially, the ingredient list on the product page is updated.",
      ],
    },
    {
      heading: "4. Pricing and taxes",
      blocks: [
        "All prices are in Indian Rupees and are inclusive of applicable GST unless stated otherwise on the product page.",
        "Where a product shows a struck-through price alongside the price you pay, the struck-through figure is the maximum retail price and the lower figure is what we are charging. You pay only the figure shown at checkout.",
        "We take reasonable care with pricing, but errors happen. If a product is listed at an obviously incorrect price, we may cancel the order and refund you in full rather than fulfil it, and we will tell you why. Nothing in this clause allows us to charge you more than the price you saw at checkout.",
        "Delivery charges, where they apply, are shown at checkout before you pay.",
      ],
    },
    {
      heading: "5. Placing an order",
      blocks: [
        "An order you place is an offer to buy. It is not accepted until we confirm dispatch. The confirmation you receive immediately after payment acknowledges that we have your order, not that we have accepted it.",
        "We may decline or cancel an order, in whole or in part, where the product is out of stock, where a pricing or listing error has occurred, where the delivery address is outside the area we serve, or where we have reasonable grounds to suspect fraud or misuse. If we do, we refund you in full.",
      ],
    },
    {
      heading: "6. Payment",
      blocks: [
        "Payments are processed by Razorpay, a third-party payment gateway. We do not see, handle or store your card number, UPI PIN, CVV or net-banking credentials at any point — those go directly to the gateway and its partner banks.",
        "Your order is processed only once payment is confirmed. If a payment fails but money leaves your account, it is normally reversed by your bank or the gateway within {{refundDays}}. Send us the transaction reference and we will follow it up with the gateway on your behalf.",
      ],
    },
    {
      heading: "7. Shipping and delivery",
      blocks: [
        "We currently ship within {{shipsTo}} only.",
        "Orders are usually dispatched within {{dispatchDays}} of confirmation, and typically reach you {{deliveryDays}} after dispatch. These are estimates, not guarantees — delivery is carried out by third-party couriers whose networks we do not control.",
        "Delays caused by incorrect addresses, absence at the delivery address, courier disruption, weather, strikes, public holidays or any other event beyond our reasonable control are not delays for which we can be held liable.",
        "If a courier records a delivery as completed and you have not received the parcel, tell us within {{reportWindow}} of that record so we can raise it with the courier while the evidence still exists.",
      ],
    },
    {
      heading: "8. Cancelling an order",
      blocks: [
        "You may cancel an order at no cost at any time before it is dispatched. Message us on WhatsApp at {{phone}} or email {{supportEmail}} with your order number, and we will refund you in full.",
        "Once an order has been handed to the courier it cannot be cancelled. At that point the returns section below applies instead.",
      ],
    },
    {
      heading: "9. Returns, replacements and refunds",
      blocks: [
        "Cosmetic products are a hygiene-sensitive category. Once a product has been opened or used, we cannot accept it back, resell it or safely return it to stock. That constraint shapes everything below.",
        "We will replace or refund a product in any of these cases:",
        {
          list: [
            "It arrived damaged, leaking or with a broken seal.",
            "You received the wrong product or the wrong variant.",
            "An item listed on your invoice was missing from the parcel.",
            "The product was past, or close to, its expiry date on arrival.",
          ],
        },
        "Report any of these within {{reportWindow}} of delivery, with photographs of the product and the outer packaging. Photographs taken as you open the parcel help considerably. Once we have confirmed the issue we will send a replacement or refund you in full, whichever you prefer, and we bear the return cost.",
        "An unopened, unused product with its seal intact may be returned within {{returnWindow}} of delivery if you have simply changed your mind. Return shipping in that case is yours to bear, and the refund is issued once we receive the product and confirm its condition.",
        "We cannot accept a return because a product did not produce the result you hoped for, or because its colour or scent differs slightly from a previous batch. Individual results vary, and batch variation is inherent to natural formulations. If a product is not working for you, message us — we would rather help you use it correctly, or suggest something better suited, than have you keep something you will not use.",
        "Approved refunds are issued to the original payment method within {{refundDays}} of approval. We cannot refund to a different account or method.",
      ],
    },
    {
      heading: "10. Combination sets",
      blocks: [
        "Combos are sold as single units at a set price. A combo cannot be part-returned or part-refunded — where a return is approved, it applies to the whole set.",
        "If one product within a combo arrives damaged or wrong, we replace that product rather than the whole set.",
      ],
    },
    {
      heading: "11. Offers and promotions",
      blocks: [
        "Promotional prices, discounts and offers apply only while they are displayed, only to the products they name, and cannot be applied to an order already placed. Unless we say otherwise, offers cannot be combined with each other.",
        "We may withdraw or change an offer at any time. Doing so does not affect an order already confirmed at the promotional price.",
      ],
    },
    {
      heading: "12. Limitation of liability",
      blocks: [
        "Our total liability for any order is limited to the amount you paid for that order.",
        "We are not liable for indirect or consequential loss — including loss of income, opportunity or goodwill — arising from the sale or use of our products.",
        "Nothing in these terms excludes or limits any liability that cannot lawfully be excluded, including liability for death or personal injury caused by our negligence, for fraud, or under the Consumer Protection Act, 2019. Your statutory rights as a consumer are unaffected by anything written here.",
      ],
    },
    {
      heading: "13. Events beyond our control",
      blocks: [
        "We are not liable for failure or delay in performing our obligations where that failure results from an event beyond our reasonable control — including natural disaster, epidemic, fire, flood, war, civil unrest, strike, government restriction, courier network failure, power outage or failure of telecommunications or internet infrastructure.",
      ],
    },
    {
      heading: "14. Governing law and jurisdiction",
      blocks: [
        "These terms are governed by the laws of India. The courts at {{jurisdiction}} have exclusive jurisdiction over any dispute arising from them, subject to your rights to approach a consumer forum in the jurisdiction available to you under the Consumer Protection Act, 2019.",
      ],
    },
    {
      heading: "15. Grievance redressal",
      blocks: [
        "In accordance with the Consumer Protection (E-Commerce) Rules, 2020, our Grievance Officer is:",
        {
          list: [
            "Name: {{grievanceName}}",
            "Email: {{grievanceEmail}}",
            "Phone: {{grievancePhone}}",
            "Address: {{address}}",
          ],
        },
        "We acknowledge every complaint within 48 hours of receiving it, and work to resolve it within one month.",
      ],
    },
    {
      heading: "16. Changes to these terms",
      blocks: [
        "We may update these terms. The version in force for your order is the version published when you placed it, and the date at the top of this page tells you when this version took effect.",
      ],
    },
  ],
}

export const metadata: Metadata = legalMetadata(doc)

export default function TermsPage() {
  return <LegalPage doc={doc} />
}
