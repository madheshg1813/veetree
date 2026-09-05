import type { Faq } from "@/lib/catalog"

export function FaqList({ faqs, idPrefix }: { faqs: readonly Faq[]; idPrefix: string }) {
  return (
    <div className="accordions accordions--faq">
      {faqs.map((f, i) => (
        <details key={f.q} className="acc" id={`${idPrefix}-faq-${i + 1}`}>
          <summary className="acc__head">
            <h3>{f.q}</h3>
            <span className="acc__icon" aria-hidden="true" />
          </summary>
          <div className="acc__body">
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
