import Image from "next/image";
import { Reveal } from "./Reveal";

const PROMISES = [
  "Ingredient-led formulas, nothing hidden",
  "Cold-pressed and slow-infused, never heat-rushed",
  "Suitable for all skin and hair types",
] as const;

export function Story() {
  return (
    <section className="story" id="story">
      <div className="story__glow" aria-hidden="true" />
      <div className="shell story__inner">
        <Reveal className="story__media">
          <Image
            src="/products/nalpamaradi-body-lebam.jpg"
            alt="VeeTree Nalpamaradi Body Lebam tin surrounded by amla, turmeric, lotus and herbal roots"
            width={1100}
            height={1100}
            sizes="(max-width: 900px) 90vw, 45vw"
          />
          <div className="story__badge">
            <span>Rooted in</span>
            <strong>
              Ayurvedic
              <br />
              Tradition
            </strong>
          </div>
        </Reveal>

        <Reveal className="story__copy" delay={0.12}>
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__line" />
            Our Roots
          </p>
          <h2 className="section-title">
            A tree is only as good as <em className="grad-gold">what feeds it</em>.
          </h2>
          <p>
            VeeTree began with a simple frustration: shelves full of beautiful bottles saying very
            little about what was actually inside them. So we went back to the source — to
            Nalpamaradi tins ground with four barks, to Kumkumadi steeped with saffron, to hair oils
            simmered with amla and hibiscus the way they have been for generations.
          </p>
          <p>
            Every formulation here is built ingredient-up. We keep the herb list long and the filler
            list empty, we blend in batches small enough to watch, and we bottle only what we would
            happily use on our own family.
          </p>
          <ul className="story__list">
            {PROMISES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
