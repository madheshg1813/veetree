#!/usr/bin/env node
/**
 * Uploads product photography to Cloudinary.
 *
 * Credentials come from the environment — never from a file in the repo:
 *   CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
 *
 * Run with:  npm run images:upload
 * Re-upload existing assets with:  npm run images:upload -- --overwrite
 *
 * public_ids are derived from the path under /public so they match exactly
 * what src/lib/cloudinaryLoader.ts builds at render time.
 */
import { readdir, stat } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { v2 as cloudinary } from "cloudinary"

const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? "veetree"
const OVERWRITE = process.argv.includes("--overwrite")
const PUBLIC_DIR = path.join(process.cwd(), "public")

/** Directories under /public whose images next/image serves. */
const TARGETS = ["products", "categories", "combos", "concerns"]

function assertCredentials() {
  if (process.env.CLOUDINARY_URL) return
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    return
  }
  console.error(
    "\n  Missing Cloudinary credentials.\n\n" +
      "  Create .env.local (it is gitignored) containing:\n" +
      "    CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@z4e833jz\n\n" +
      "  Then run: npm run images:upload\n"
  )
  process.exit(1)
}

async function collect(dir) {
  const abs = path.join(PUBLIC_DIR, dir)
  const entries = await readdir(abs)
  const files = []
  for (const name of entries) {
    const full = path.join(abs, name)
    if (!(await stat(full)).isFile()) continue
    if (!/\.(jpe?g|png|webp|avif)$/i.test(name)) continue
    files.push({
      file: full,
      // "products/rose-hydrosol.jpg" → "veetree/products/rose-hydrosol"
      publicId: `${FOLDER}/${dir}/${name.replace(/\.[^.]+$/, "")}`,
      label: `${dir}/${name}`,
    })
  }
  return files
}

async function main() {
  assertCredentials()

  const files = (await Promise.all(TARGETS.map(collect))).flat()
  if (files.length === 0) {
    console.log("Nothing to upload.")
    return
  }

  console.log(`\nUploading ${files.length} image(s) to folder "${FOLDER}"…\n`)

  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const { file, publicId, label } of files) {
    try {
      const res = await cloudinary.uploader.upload(file, {
        public_id: publicId,
        overwrite: OVERWRITE,
        // Keep the original as the source of truth; the loader requests
        // derived sizes on demand via f_auto/q_auto/w_.
        resource_type: "image",
        invalidate: OVERWRITE,
      })
      const reused = res.existing === true
      if (reused) skipped++
      else uploaded++
      const kb = Math.round(res.bytes / 1024)
      console.log(`  ${reused ? "•" : "✓"} ${label.padEnd(34)} ${String(kb).padStart(5)} KB  ${res.width}×${res.height}`)
    } catch (err) {
      failed++
      console.error(`  ✗ ${label}  —  ${err?.message ?? err}`)
    }
  }

  console.log(
    `\n${uploaded} uploaded, ${skipped} already present, ${failed} failed.\n` +
      (failed === 0
        ? `Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local and restart the dev server.\n`
        : `Re-run after fixing the errors above.\n`)
  )
  if (failed > 0) process.exitCode = 1
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
