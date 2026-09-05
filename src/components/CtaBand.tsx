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
          Eleven formulations.
          <br />
          <em className="grad-gold">One honest label.</em>
        </h2>
        <p className="cta__sub">
          Every product lists what is in it and how to use it. Order online and we&rsquo;ll get it
          to you — or message us first if you would rather talk it through.
        </p>
        <div className="cta__actions">
          <a className="btn btn--shop btn--lg" href="#collection">
            Shop the Collection
          </a>
          <WhatsAppButton className="btn--lg btn--wa-quiet">Ask a question</WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}
