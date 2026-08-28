import { TreeMark } from "./icons";

/** VEE + tree glyph + REE. `gradientId` must be unique per instance on the page. */
export function Wordmark({
  gradientId,
  className = "",
}: {
  gradientId: string;
  className?: string;
}) {
  return (
    <a className={`brand ${className}`.trim()} href="#top" aria-label={`VeeTree home`}>
      <span className="brand__vee">VEE</span>
      <span className="brand__mark" aria-hidden="true">
        <TreeMark gradientId={gradientId} />
      </span>
      <span className="brand__tree">REE</span>
    </a>
  );
}
