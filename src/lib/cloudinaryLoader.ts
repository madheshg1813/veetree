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
  // Already absolute (or Cloudinary not configured) — hand it back untouched.
  if (!CLOUD || /^https?:\/\//.test(src)) return src

  const transforms = ["f_auto", `q_${quality ?? "auto"}`, "c_limit", `w_${width}`].join(",")
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicIdFor(src)}`
}
