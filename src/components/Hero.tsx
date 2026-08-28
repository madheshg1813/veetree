import Image from "next/image";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

const STATS = [
  { value: "11", label: "Formulations" },
  { value: "13+", label: "Herbs per blend" },
  { value: "0", label: "Parabens & sulphates" },
] as const;

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__orb hero__orb--gold" aria-hidden="true" />
      <div className="hero__orb hero__orb--green" aria-hidden="true" />

      <div className="shell hero__inner">
        <Reveal className="hero__copy">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            Ayurvedic Skin &amp; Hair Care
          </p>
          <h1 className="hero__title">
            Ancient roots.
            <br />
            <em className="grad-gold">Radiant</em> results.
          </h1>
          <p className="hero__lede">
            Eleven small-batch formulations built on Kumkumadi, Nalpamaradi and cold-pressed
            botanicals — the recipes your grandmother trusted, refined for skin that lives in today.
          </p>

          <div className="hero__actions">
            <WhatsAppButton>Order on WhatsApp</WhatsAppButton>
            <a className="btn btn--ghost" href="#collection">
              Explore the Collection
            </a>
          </div>

          <ul className="hero__stats">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="hero__gallery" delay={0.15}>
          <figure className="hero__card hero__card--main">
            <Image
              src="/products/kumkumadi-serum.jpg"
              alt="VeeTree Kumkumadi Brightening Face Serum in an amber glass dropper bottle beside a brass lamp and saffron threads"
              width={1100}
              height={1100}
              priority
              sizes="(max-width: 900px) 90vw, 40vw"
            />
            <figcaption>
              <span className="pill">Bestseller</span>
              <strong>Kumkumadi Face Serum</strong>
              <em>24k Gold · Goat Milk · Pure Saffron</em>
            </figcaption>
          </figure>

          <figure className="hero__card hero__card--sm hero__card--a">
            <Image
              src="/products/rose-hydrosol.jpg"
              alt="VeeTree Rose Hydrosol mist bottle surrounded by fresh pink roses"
              width={732}
              height={1100}
              sizes="(max-width: 900px) 35vw, 15vw"
            />
          </figure>

          <figure className="hero__card hero__card--sm hero__card--b">
            <Image
              src="/products/mango-lip-oil.jpg"
              alt="VeeTree Mango Lip Oil roller bottle on a wooden stand beside fresh mango"
              width={880}
              height={1100}
              sizes="(max-width: 900px) 32vw, 14vw"
            />
          </figure>

          <div className="hero__seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path
                  id="sealCirc"
                  d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                />
              </defs>
              <text className="seal-text">
                <textPath href="#sealCirc" startOffset="0">
                  SMALL BATCH · PURE BOTANICALS · MADE IN INDIA ·{" "}
                </textPath>
              </text>
            </svg>
            <span className="hero__seal-core">✦</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
