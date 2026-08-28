import { site } from "@/lib/site";
import { InstagramIcon } from "./icons";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

export function CtaBand() {
  return (
    <section className="cta">
      <div className="cta__glow" aria-hidden="true" />
      <Reveal className="shell cta__inner">
        <p className="eyebrow eyebrow--light">
          <span className="eyebrow__line" />
          Ordering is a message away
        </p>
        <h2 className="cta__title">
          Tell us what your skin needs.
          <br />
          <em className="grad-gold">We&rsquo;ll take it from there.</em>
        </h2>
        <p className="cta__sub">
          No carts, no forms, no forgotten passwords. Send us a message on WhatsApp and we&rsquo;ll
          confirm price, availability and delivery — usually within the hour.
        </p>
        <div className="cta__actions">
          <WhatsAppButton className="btn--lg">Chat with VeeTree</WhatsAppButton>
          <a
            className="btn btn--outline btn--lg"
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="ig-ico" />
            Follow @{site.instagramHandle}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
