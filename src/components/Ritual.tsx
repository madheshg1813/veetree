import { Reveal } from "./Reveal";

const STEPS = [
  {
    num: "01",
    title: "Sourced honestly",
    body: "Herbs, seeds and flowers chosen for the season they are actually at their best — not whatever is cheapest that month.",
  },
  {
    num: "02",
    title: "Blended slowly",
    body: "Cold-pressed, steam-distilled and slow-infused. No shortcuts that trade potency for speed.",
  },
  {
    num: "03",
    title: "Bottled fresh",
    body: "Small batches, short shelf-waits. What reaches you was made recently, not a year ago.",
  },
  {
    num: "04",
    title: "Answered personally",
    body: "Not sure what suits your skin? Message us and a human will actually help you choose.",
  },
] as const;

export function Ritual() {
  return (
    <section className="ritual" id="ritual">
      <div className="shell">
        <Reveal as="header" className="section-head section-head--center">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__line" />
            The VeeTree Promise
          </p>
          <h2 className="section-title">
            What goes in <em className="grad-gold">is the whole point</em>
          </h2>
        </Reveal>

        <div className="ritual__grid">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} className="ritual__step" delay={i * 0.1}>
              <span className="ritual__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
