/**
 * The running band above the header, as the founder revised it.
 *
 * The four claims that went are the ones every botanical brand runs — an
 * absence ("no parabens"), a percentage, a provenance line and a batch note.
 * What replaced them says something only Veetree can say. "Cruelty Free" stays
 * because it is a specific, checkable fact rather than a slogan.
 */
const CLAIMS = [
  "From Farm to Bottle",
  "Ayurveda Meets Modern Care",
  "Handpicked Natural Ingredients",
  "Cruelty Free",
  "Made with Care",
] as const;

function ClaimSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="ticker__set" aria-hidden={hidden || undefined}>
      {CLAIMS.map((claim) => (
        <span key={claim} style={{ display: "contents" }}>
          <b>{claim}</b>
          <i>✦</i>
        </span>
      ))}
    </span>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-label="Brand highlights">
      <div className="ticker__track">
        <ClaimSet />
        <ClaimSet hidden />
      </div>
    </div>
  );
}
