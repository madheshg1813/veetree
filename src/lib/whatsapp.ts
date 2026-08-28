import { site } from "./site";

const GENERAL_MESSAGE =
  "Hi VeeTree! 🌿 I came across your website and I'd love to know more about your products. Could you help me pick what's right for me?";

/** WhatsApp renders *text* between single asterisks as bold. */
const productMessage = (label: string): string =>
  `Hi VeeTree! 🌿 I'm interested in the *${label}*. Could you share the price, availability and delivery details?`;

/**
 * Builds a wa.me deep link with a pre-filled message.
 * Pass a product label to name it in the message, or nothing for the general enquiry.
 */
export function whatsappLink(label?: string): string {
  const text = label ? productMessage(label) : GENERAL_MESSAGE;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
