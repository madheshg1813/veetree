/**
 * The VeeTree wordmark.
 *
 * The brand artwork is a traced vector (~40 KB), so it ships as a cached file in
 * /public rather than being inlined twice. It is applied as a CSS mask, which
 * keeps the file cacheable while still letting each placement paint itself with
 * `currentColor` — dark on the cream header, cream on the dark footer.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a className={`brand ${className}`.trim()} href="#top" aria-label="VeeTree — home">
      <span className="brand__logo" role="img" aria-label="VeeTree" />
    </a>
  );
}
