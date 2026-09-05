/**
 * The most recent Instagram reels.
 *
 * Three sources, in order of preference:
 *
 *  1. Whatever Veetree saved in the dashboard, under Instagram Reels. An
 *     explicit human choice outranks anything automatic — that is the point of
 *     the screen.
 *  2. The Instagram Graph API, when INSTAGRAM_USER_ID and INSTAGRAM_TOKEN are
 *     set. This is the only way to know what was posted recently — Instagram
 *     retired the public Basic Display API, and scraping the profile page is
 *     both against their terms and liable to break without warning.
 *  3. INSTAGRAM_REELS: a comma-separated list of permalinks in the environment.
 *
 * Rendering never needs a token — Instagram's /embed/ endpoint is public. The
 * token is only for discovering which reels are the latest.
 */

export interface Reel {
  /** Instagram's shortcode, e.g. "C8QhQF7Iabc". */
  readonly code: string
  readonly permalink: string
  readonly caption?: string
}

/** Pulls the shortcode out of any reel or post permalink. */
export function reelCode(url: string): string | null {
  const m = /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i.exec(url)
  return m?.[1] ?? null
}

function fromEnvList(): Reel[] {
  const raw = process.env.INSTAGRAM_REELS?.trim()
  if (!raw) return []
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .flatMap((url) => {
      const code = reelCode(url)
      return code ? [{ code, permalink: url }] : []
    })
}

interface GraphMedia {
  id: string
  permalink: string
  media_type?: string
  media_product_type?: string
  caption?: string
}

/**
 * The newest reels, most recent first.
 *
 * Returns the hand-maintained list when the API is not configured or is
 * unreachable, so an expired token degrades to slightly stale reels rather
 * than an empty band on the homepage.
 */
async function fromDashboard(limit: number): Promise<Reel[]> {
  const base = process.env.NEXT_PUBLIC_MEDUSA_URL?.trim()
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.trim()
  if (!base || !key) return []

  try {
    const res = await fetch(`${base}/store/reels`, {
      headers: { "x-publishable-api-key": key },
      // Short window: someone who pastes a link in the dashboard expects to see
      // it on the site shortly, not after the next deploy.
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = (await res.json()) as { reels?: string[] }
    return (data.reels ?? [])
      .flatMap((url) => {
        const code = reelCode(url)
        return code ? [{ code, permalink: url }] : []
      })
      .slice(0, limit)
  } catch {
    return []
  }
}

export async function latestReels(limit = 3): Promise<Reel[]> {
  const chosen = await fromDashboard(limit)
  if (chosen.length) return chosen

  const userId = process.env.INSTAGRAM_USER_ID?.trim()
  const token = process.env.INSTAGRAM_TOKEN?.trim()
  const fallback = fromEnvList().slice(0, limit)
  if (!userId || !token) return fallback

  const fields = "id,permalink,media_type,media_product_type,caption,timestamp"
  const url =
    `https://graph.instagram.com/v21.0/${userId}/media` +
    `?fields=${fields}&limit=25&access_token=${encodeURIComponent(token)}`

  try {
    // Cached for an hour: reels are not posted by the minute, and this keeps
    // the homepage build from hitting Instagram on every revalidation.
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) {
      console.warn(`[instagram] media fetch failed: ${res.status}`)
      return fallback
    }
    const data = (await res.json()) as { data?: GraphMedia[] }
    const reels = (data.data ?? [])
      .filter(
        (m) =>
          m.media_product_type === "REELS" ||
          m.media_type === "VIDEO" ||
          /\/reels?\//i.test(m.permalink)
      )
      .flatMap((m) => {
        const code = reelCode(m.permalink)
        return code ? [{ code, permalink: m.permalink, caption: m.caption }] : []
      })
      .slice(0, limit)

    return reels.length ? reels : fallback
  } catch (err) {
    console.warn("[instagram] media fetch error:", err instanceof Error ? err.message : err)
    return fallback
  }
}
