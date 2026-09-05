"use client"

import Link from "next/link"
import { useState } from "react"
import { HOME_TABS, type ShopItem } from "@/lib/home/shopItems"
import { ShopCard } from "./ShopCard"

/**
 * Bestsellers, with the category row from the client's layout.
 *
 * The tabs filter in place rather than navigating, so trying all five costs no
 * page loads; VIEW ALL then goes to the collection page for whichever tab is
 * open, which is the one thing a visitor would want next.
 */
export function BestSellers({ groups }: { groups: Record<string, readonly ShopItem[]> }) {
  const tabs = HOME_TABS.filter((tab) => (groups[tab.slug]?.length ?? 0) > 0)
  const [active, setActive] = useState(tabs[0]?.slug ?? HOME_TABS[0].slug)
  const items = groups[active] ?? []

  return (
    <section className="best" id="collection" aria-labelledby="best-h">
      <div className="shell">
        <h2 className="best__title" id="best-h">
          <span>Best Sellers</span>
        </h2>

        <div className="best__bar">
          <div className="best__tabs" role="tablist" aria-label="Shop by category">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                role="tab"
                id={`best-tab-${tab.slug}`}
                aria-selected={tab.slug === active}
                aria-controls="best-panel"
                tabIndex={tab.slug === active ? 0 : -1}
                className={`best__tab ${tab.slug === active ? "is-active" : ""}`}
                onClick={() => setActive(tab.slug)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link className="best__viewall" href={`/collections/${active}`}>
            View all
          </Link>
        </div>

        <div
          className="best__grid"
          id="best-panel"
          role="tabpanel"
          aria-labelledby={`best-tab-${active}`}
        >
          {items.map((item) => (
            <ShopCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
