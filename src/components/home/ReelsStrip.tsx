import { InstagramIcon } from "@/components/icons"
import { Reveal } from "@/components/Reveal"
import type { Reel } from "@/lib/home/reels"
import { ReelsSlider } from "./ReelsSlider"
import { site } from "@/lib/site"

/**
 * The latest reels, embedded.
 *
 * Instagram's own /embed/ player is used rather than a thumbnail linking out:
 * the video plays in place, and the markup stays honest about whose content it
 * is. Each frame is lazy-loaded, so three embedded players do not delay the
 * rest of the page.
 *
 * Renders nothing at all when there are no reels — an empty band with a
 * heading over it looks broken in a way a missing section does not.
 */
export function ReelsStrip({ reels }: { reels: readonly Reel[] }) {
  if (reels.length === 0) return null

  return (
    <section className="reels" aria-labelledby="reels-h">
      <div className="shell">
        <Reveal as="header" className="section-head section-head--center">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            On Instagram
          </p>
          <h2 className="section-title" id="reels-h">
            Lately from <em className="grad-gold">the workshop</em>
          </h2>
        </Reveal>

        <ReelsSlider reels={reels} />

        <p className="reels__follow">
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
            <InstagramIcon aria-hidden="true" />
            Follow @{site.instagramHandle}
          </a>
        </p>
      </div>
    </section>
  )
}
