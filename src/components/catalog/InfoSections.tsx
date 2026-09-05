import type { InfoSection } from "@/lib/catalog"

/**
 * Expandable product information.
 *
 * Built on native <details>/<summary>: keyboard accessible for free, and the
 * body text is in the DOM whether or not the section is open, so nothing is
 * hidden from crawlers.
 */
export function InfoSections({ sections }: { sections: readonly InfoSection[] }) {
  return (
    <div className="accordions">
      {sections.map((s) => (
        <details key={s.id} className="acc" open={s.defaultOpen} id={s.id}>
          <summary className="acc__head">
            <h3>{s.heading}</h3>
            <span className="acc__icon" aria-hidden="true" />
          </summary>
          <div className="acc__body">
            {s.body?.map((p) => <p key={p}>{p}</p>)}
            {s.bullets?.length ? (
              <ul className="acc__list">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  )
}
