const CLAIMS = [
  "100% Natural",
  "Handcrafted in Small Batches",
  "No Parabens · No Sulphates",
  "Cruelty Free",
  "Rooted in Ayurveda",
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
