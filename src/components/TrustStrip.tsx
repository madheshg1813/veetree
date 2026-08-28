import { BookIcon, LeafIcon, MortarIcon, RabbitIcon } from "./icons";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    Icon: LeafIcon,
    title: "Plant-First Formulas",
    body: "Cold-pressed oils, hydrosols and herbal infusions — no fillers hiding in the label.",
  },
  {
    Icon: MortarIcon,
    title: "Made in Small Batches",
    body: "Blended in limited runs so every bottle reaches you fresh and fully potent.",
  },
  {
    Icon: RabbitIcon,
    title: "Cruelty Free",
    body: "Never tested on animals. Tested only on willing humans who love the results.",
  },
  {
    Icon: BookIcon,
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
              <Icon />
            </span>
            <h3>{title}</h3>
            <p>{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
