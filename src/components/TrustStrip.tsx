import { BookOpen, FlaskConical, Rabbit, Sprout } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * The four pillars, with Lucide icons.
 *
 * Lucide draws with `currentColor`, so `stroke` is overridden per icon with the
 * shared #goldStroke gradient that GoldGradientDefs puts near <body> — the same
 * gold the hand-drawn icons used, kept so the strip did not change colour when
 * the icon set changed.
 */
const PILLARS = [
  {
    Icon: Sprout,
    title: "Plant-First Formulas",
    body: "Cold-pressed oils, hydrosols and herbal infusions — no fillers hiding in the label.",
  },
  {
    Icon: FlaskConical,
    title: "Made in Small Batches",
    body: "Blended in limited runs so every bottle reaches you fresh and fully potent.",
  },
  {
    Icon: Rabbit,
    title: "Cruelty Free",
    body: "Never tested on animals. Tested only on willing humans who love the results.",
  },
  {
    Icon: BookOpen,
    title: "Classical Recipes",
    body: "Kumkumadi, Nalpamaradi and other time-honoured preparations, made the slow way.",
  },
] as const;

export function TrustStrip() {
  return (
    <section className="trust">
      <div className="shell trust__grid">
        {PILLARS.map(({ Icon, title, body }, i) => (
          <Reveal key={title} className="trust__item" delay={i * 0.08}>
            <span className="trust__ico" aria-hidden="true">
              <Icon stroke="url(#goldStroke)" strokeWidth={1.6} />
            </span>
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
