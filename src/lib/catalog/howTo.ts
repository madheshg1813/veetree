import type { HowToUseStep } from "./types"

/** Beyond this many steps, a paragraph stops being readable and becomes a wall. */
const MAX_STEPS_AS_PROSE = 3

/**
 * The how-to-use steps, cleaned.
 *
 * Two things need fixing. Every step's `title` is the bare word "Step N", which
 * adds nothing. And nine products repeat that numbering inside the detail text
 * — "Step 1: Take a small pinch…" — sometimes out of step with the array index,
 * so the prefix is stripped rather than trusted.
 */
export function howToSteps(steps: readonly HowToUseStep[]): string[] {
  return steps
    .map((s) => s.detail.trim().replace(/^step\s*\d+\s*[:.)\-–—]\s*/i, ""))
    .filter((s) => s.length > 0)
    .map((s) => (/[.!?]$/.test(s) ? s : `${s}.`))
}

/**
 * True when the steps should be listed rather than run together.
 *
 * Short routines read better as a sentence — "Cleanse, apply, massage in" — and
 * the numbered cards this replaced were six tall boxes for three lines of
 * instruction. But past three steps a paragraph stops being a sentence and
 * becomes something to re-read while holding a bottle, so those get points.
 */
export function howToAsList(steps: readonly HowToUseStep[]): boolean {
  return howToSteps(steps).length > MAX_STEPS_AS_PROSE
}

/** The steps as one flowing paragraph, for short routines. */
export function howToParagraph(steps: readonly HowToUseStep[]): string {
  return howToSteps(steps).join(" ").replace(/\s{2,}/g, " ")
}
