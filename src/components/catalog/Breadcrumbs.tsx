import Link from "next/link"

export interface Crumb {
  label: string
  href: string
}

export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((c, i) => {
          const last = i === trail.length - 1
          return (
            <li key={c.href}>
              {last ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <>
                  <Link href={c.href}>{c.label}</Link>
                  <span className="crumbs__sep" aria-hidden="true">
                    ›
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
