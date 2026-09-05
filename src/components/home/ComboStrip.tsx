import Link from "next/link"
import { ComboCard } from "@/components/catalog/ComboCard"
import { HOME_COMBO_COUNT } from "@/lib/catalog/combos"
import type { ComboItem } from "@/lib/home/comboItems"
import { Reveal } from "@/components/Reveal"

/**
 * Homepage combos strip: the first few sets, then through to the full page.
 *
 * How many show is HOME_COMBO_COUNT, so reordering combos.ts changes what the
 * homepage leads with and nothing here needs touching.
 */
export function ComboStrip({ items }: { items: readonly ComboItem[] }) {
  const shown = items.slice(0, HOME_COMBO_COUNT)
  if (shown.length === 0) return null

  return (
    <section className="combos" aria-labelledby="combos-h">
      <div className="shell">
        <h2 className="best__title" id="combos-h">
          <span>Combos</span>
        </h2>

        <div className="combos__grid">
          {shown.map((item) => (
            <Reveal as="div" key={item.slug}>
              <ComboCard item={item} action="view" />
            </Reveal>
          ))}
        </div>

        {items.length > shown.length ? (
          <Link className="combos__all" href="/combos">
            View All Combos
          </Link>
        ) : null}
      </div>
    </section>
  )
}
