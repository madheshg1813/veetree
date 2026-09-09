/**
 * Cloudinary loader for next/image.
 *
 * Cloudinary does the resizing and format negotiation at its edge, so the app
 * server never spends CPU on image transcoding and repeat requests are served
 * from a CDN POP rather than our single region.
 *
 * Falls back to the local file in /public when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * is unset, so the site keeps working before the upload has run and in any
 * environment without Cloudinary configured.
 *
 * `f_auto` picks AVIF/WebP per browser; `q_auto` picks quality per image.
 */
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? "veetree"

/**
 * Width at and above which the AI upscale is worth its cost. Below this the
 * originals already have the pixels, so it would pay for nothing.
 */
const UPSCALE_FROM = 1000

/**
 * And the width it is capped at. The sources are 619–1100px, so past about
 * 1600 there is no further detail to reconstruct — a larger request would only
 * spend bandwidth and add-on quota on a softer enlargement. A browser asking
 * for 3840 gets 1600 and scales it, exactly as c_limit has always behaved.
 */
const UPSCALE_TO = 1600

interface LoaderArgs {
  src: string
  width: number
  quality?: number
}

/** "/products/rose-hydrosol.jpg" → "veetree/products/rose-hydrosol" */
export function publicIdFor(src: string): string {
  const withoutQuery = src.split("?")[0] ?? src
  const trimmed = withoutQuery.replace(/^\//, "").replace(/\.[a-zA-Z0-9]+$/, "")
  return `${FOLDER}/${trimmed}`
}

export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  if (!CLOUD) return src

  const marker = `res.cloudinary.com/${CLOUD}/image/upload/`

  /**
   * Resolve the public id, whichever form the src takes. Images set in the
   * Medusa dashboard arrive as full Cloudinary URLs, and handing those
   * straight to the browser would serve one size to every device; where the
   * URL is our own cloud its transform segment is replaced with the one this
   * layout asked for. A stranger's URL is left alone, since rewriting it would
   * only break it.
   */
  let publicId: string
  if (/^https?:\/\//.test(src)) {
    const at = src.indexOf(marker)
    if (at === -1) return src
    const rest = src.slice(at + marker.length)
    const [first, ...tail] = rest.split("/")
    // A transform segment looks like "f_auto,q_auto" — a public id does not.
    const isTransform = first !== undefined && /^[a-z]{1,3}_[^/]*$/.test(first)
    publicId = isTransform ? tail.join("/") : rest
    if (!publicId) return src
  } else {
    publicId = publicIdFor(src)
  }

  /**
   * Only the product photographs need rescuing. Every one we hold is a small
   * original — 619 to 1100px wide — while a product page frame wants around
   * 1300 device pixels on a Retina screen and a phone about 1100. `c_limit`
   * refuses to enlarge, so the browser stretched them, and a stretched
   * photograph reads soft. That was the blur, and no quality setting could fix
   * it: the pixels were never there.
   *
   * `e_upscale` is Cloudinary's AI super-resolution, which reconstructs detail
   * rather than interpolating it — a 619px source becomes a true 1600px image.
   * It is a metered add-on, so it is asked for only where it earns its cost:
   * product images, and only at the larger widths. The category, concern and
   * combo photographs are already 1350–2048px and are left alone, as are
   * thumbnails and card images, which are sharp at the size they render.
   *
   * Each derived URL is computed once and then served from the CDN, so the
   * cost is bounded by the number of images times the number of large sizes,
   * not by traffic. Drop `upscale` from `transforms` to turn the add-on off;
   * everything else keeps working. Once the photographs are re-shot at a
   * higher resolution this should come out, since upscaling an already-large
   * image only wastes quota.
   */
  const isProductPhoto = /\/(products|uploads)\//.test(publicId)
  const big = isProductPhoto && width >= UPSCALE_FROM

  const sized = [
    "f_auto",
    // Explicit rather than q_auto: these are product photographs on a shop,
    // and q_auto was compressing them to about half this size.
    `q_${quality ?? (big ? 90 : 85)}`,
    "c_limit",
    `w_${big ? Math.min(width, UPSCALE_TO) : width}`,
  ].join(",")
  const transforms = big ? `e_upscale/${sized}` : sized

  return `https://${marker}${transforms}/${publicId}`
}
