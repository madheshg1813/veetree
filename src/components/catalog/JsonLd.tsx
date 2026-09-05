/**
 * Emits JSON-LD. Kept in one place so the shape of every schema is auditable.
 * `data` is serialised with a replacer that drops undefined, so an absent
 * rating simply never appears rather than serialising as null.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
