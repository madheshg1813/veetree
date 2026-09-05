"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useId, useMemo, useRef, useState } from "react"
import type { SearchItem } from "@/lib/home/shopItems"

const MAX_RESULTS = 6

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()

/**
 * Product search.
 *
 * The whole catalogue is 31 products, so matching happens in the browser
 * against a name-and-category index passed down from the server — instant
 * results with no request, and no need for a search route or an index service.
 * Every term in the query has to match somewhere, so "rose serum" narrows
 * rather than widening.
 */
export function HomeSearch({ items }: { items: readonly SearchItem[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const listId = useId()
  const blurTimer = useRef<number | undefined>(undefined)

  const results = useMemo(() => {
    const terms = normalise(query).split(" ").filter(Boolean)
    if (terms.length === 0) return []
    return items
      .filter((item) => {
        const haystack = normalise(`${item.name} ${item.categoryLabel}`)
        return terms.every((t) => haystack.includes(t))
      })
      .slice(0, MAX_RESULTS)
  }, [items, query])

  const showResults = open && query.trim().length > 0

  return (
    <div className="psearch">
      <div className="shell">
        <form
          className="psearch__box"
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            const first = results[0]
            if (first) {
              setOpen(false)
              router.push(first.href)
            }
          }}
        >
          <svg className="psearch__icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M15.8 15.8 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>

          <input
            className="psearch__input"
            type="search"
            placeholder="Search products"
            aria-label="Search products"
            autoComplete="off"
            role="combobox"
            aria-expanded={showResults}
            aria-controls={listId}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              // Let a click on a result land before the list unmounts.
              blurTimer.current = window.setTimeout(() => setOpen(false), 120)
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false)
                setQuery("")
              }
            }}
          />
        </form>

        {showResults ? (
          <div className="psearch__results" id={listId} role="listbox">
            {results.length === 0 ? (
              <p className="psearch__empty">No products match “{query.trim()}”.</p>
            ) : (
              <ul>
                {results.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      role="option"
                      aria-selected={false}
                      onClick={() => {
                        window.clearTimeout(blurTimer.current)
                        setOpen(false)
                      }}
                    >
                      {item.thumb ? (
                        <Image src={item.thumb} alt="" width={44} height={44} sizes="44px" />
                      ) : (
                        <span className="psearch__thumb" aria-hidden="true" />
                      )}
                      <span>
                        <strong>{item.name}</strong>
                        <em>{item.categoryLabel}</em>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
