import type { Metadata } from "next"
import { LegalPage, legalMetadata, type LegalDoc } from "@/components/legal/LegalPage"

/**
 * Shipping and delivery, on its own page.
 *
 * Payment gateways look for this document by name, and it is the question
 * customers ask most often before they buy. The timings and the courier terms
 * are also stated in the Terms; the two must agree, so change one and change
 * the other.
 *
 * The rates below are the ones the storefront falls back to. What a cart is
 * actually charged comes from Medusa's shipping options, which are editable in
 * the dashboard — so the page says the charge is confirmed at checkout rather
 * than presenting these as the last word. That way the page cannot quietly
 * contradict what someone is billed.
 */
const doc: LegalDoc = {
  title: "Shipping & Delivery Policy",
  href: "/shipping-policy",
  intro:
    "Where we ship, what delivery costs, how long it takes, and what happens when a parcel goes astray.",
  metaDescription:
    "Veetree shipping and delivery policy — delivery charges for Tamil Nadu and the rest of India, dispatch and delivery timelines, tracking, and what to do if a parcel is delayed or lost.",
  sections: [
    {
      heading: "Where we ship",
      blocks: [
        "We deliver across {{shipsTo}}. We do not ship internationally at present.",
        "Orders are dispatched from our facility in {{address}}.",
        {
          note:
            "We cannot deliver to PO box addresses. Please give a full street address where someone can receive the parcel during working hours.",
        },
      ],
    },
    {
      heading: "Delivery charges",
      blocks: [
        "Delivery is charged by weight and by where the parcel is going. The weight used is the packed weight — the products plus their packaging — not the volume printed on the label.",
        {
          list: [
            "Tamil Nadu, up to 1 kg — ₹50",
            "Tamil Nadu, over 1 kg — ₹99",
            "Rest of India, up to 1 kg — ₹99",
            "Rest of India, over 1 kg — ₹150",
          ],
        },
        {
          note:
            "The exact charge for your order is shown at checkout, before you pay, once you have entered your delivery address. That figure is the one you will be billed. If it differs from the table above, the checkout figure is the current one.",
        },
        "Delivery charges are not refundable once an order has been dispatched.",
      ],
    },
    {
      heading: "How long it takes",
      blocks: [
        "Orders are packed and handed to the courier within {{dispatchDays}} of confirmation. Orders placed on a Sunday or a public holiday are processed on the next working day.",
        "After dispatch, delivery normally takes {{deliveryDays}}, depending on the destination. Metro addresses are usually at the shorter end of that range and remote pin codes at the longer end.",
        "These are estimates, not guarantees. Festivals, weather, strikes and courier backlogs can all add time, and none of them are within our control.",
        {
          note:
            "Everything is made in small batches. If an item in your order needs a fresh batch before it can go out, we will tell you and give you the choice of waiting, swapping it, or cancelling that item for a refund.",
        },
      ],
    },
    {
      heading: "Tracking your order",
      blocks: [
        "Once your parcel is with the courier we send the tracking details to the phone number or email address on the order. Tracking can take up to 24 hours to start showing movement after it is issued.",
        "If you have not received tracking details within {{dispatchDays}} of ordering, message {{phone}} on WhatsApp or email {{supportEmail}} with your order number and we will find out where it is.",
      ],
    },
    {
      heading: "Delivery attempts and unclaimed parcels",
      blocks: [
        "Couriers normally attempt delivery up to three times. Please make sure the phone number on the order is one you can be reached on — most failed deliveries are unanswered calls rather than wrong addresses.",
        "If a parcel is returned to us because nobody was available, the address was incomplete, or delivery was refused, we will contact you. Reshipping it costs the delivery charge again.",
        {
          note:
            "An address cannot be changed once a parcel is with the courier. Please check it before you pay.",
        },
      ],
    },
    {
      heading: "If a parcel is delayed or lost",
      blocks: [
        "If tracking has not moved for several days, or the delivery window has passed, contact us with your order number and we will raise it with the courier.",
        "Where a parcel is confirmed lost in transit, we send the order again at our cost. Where it is marked delivered but you did not receive it, we will investigate with the courier — this usually needs a few days.",
      ],
    },
    {
      heading: "Damaged, wrong or missing items",
      blocks: [
        "Report it within {{reportWindow}} of delivery, with the unboxing video. The full conditions, and what the video has to show, are set out in our Cancellation, Exchange & Refund Policy.",
        {
          note:
            "Start filming before you cut the tape. Without a continuous unboxing video we cannot tell damage in transit from damage after opening, and the claim cannot be approved.",
        },
        "Approved exchanges are dispatched within {{exchangeDispatchDays}}.",
      ],
    },
    {
      heading: "Questions about a delivery",
      blocks: [
        "WhatsApp {{phone}} or email {{supportEmail}} with your order number and we will help.",
        "Grievance Officer: {{grievanceName}}, {{grievanceEmail}}, {{grievancePhone}}.",
      ],
    },
  ],
}

export const metadata: Metadata = legalMetadata(doc)

export default function ShippingPolicyPage() {
  return <LegalPage doc={doc} />
}
