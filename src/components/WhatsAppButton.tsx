import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

interface WhatsAppButtonProps {
  /** Product label to name in the message. Omit for the general enquiry. */
  product?: string;
  children: React.ReactNode;
  /** Extra button modifier classes, e.g. "btn--lg btn--full". */
  className?: string;
}

export function WhatsAppButton({ product, children, className = "" }: WhatsAppButtonProps) {
  return (
    <a
      className={`btn btn--wa ${className}`.trim()}
      href={whatsappLink(product)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon className="wa-ico" />
      {children}
    </a>
  );
}
