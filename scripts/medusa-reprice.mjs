/**
 * Pushes the prices in src/lib/catalog/products/*.ts to the Medusa dashboard.
 *
 * The product files are the price list; Medusa is what the site actually
 * charges. This brings Medusa in line with the files, variant by variant,
 * matching products by handle and sizes by variant title.
 *
 *   npm run prices:sync            show what would change, write nothing
 *   npm run prices:sync -- --apply write the changes
 *
 * Needs MEDUSA_ADMIN_API_KEY (a Secret API key from Settings → Secret API
 * Keys) in .env.local. The key is never printed.
 */
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const BASE = process.env.NEXT_PUBLIC_MEDUSA_URL
const KEY = process.env.MEDUSA_ADMIN_API_KEY
const APPLY = process.argv.includes("--apply")
const CURRENCY = "inr"

if (!BASE || !KEY) {
  console.error("Missing NEXT_PUBLIC_MEDUSA_URL or MEDUSA_ADMIN_API_KEY in .env.local")
  process.exit(1)
}

const auth = { Authorization: `Basic ${Buffer.from(`${KEY}:`).toString("base64")}` }

async function admin(path, init = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...auth, "Content-Type": "application/json", ...init.headers },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status} ${body.message ?? ""}`)
  return body
}

// slug → [{ size, price }] from the product files
const DIR = "src/lib/catalog/products"
const local = new Map()
for (const file of readdirSync(DIR).filter((f) => f.endsWith(".ts"))) {
  const src = readFileSync(join(DIR, file), "utf8")
  const m = src.match(/variants: (\[.*?\]),\n/)
  if (!m) throw new Error(`No variants line in ${file}`)
  local.set(file.replace(/\.ts$/, ""), JSON.parse(m[1]))
}

const { products } = await admin(
  `/admin/products?limit=200&fields=id,handle,title,*variants,*variants.prices`
)

const norm = (s) => (s ?? "").trim().toLowerCase()
let changes = 0
const problems = []

for (const [slug, variants] of local) {
  const remote = products.find((p) => p.handle === slug)
  if (!remote) {
    problems.push(`${slug}: not found in the dashboard`)
    continue
  }
  for (const v of variants) {
    const rv = remote.variants.find((x) => norm(x.title) === norm(v.size))
    if (!rv) {
      problems.push(`${slug} ${v.size}: size not found in the dashboard`)
      continue
    }
    const inr = rv.prices.find((p) => p.currency_code === CURRENCY && !p.price_rules?.length)
    if (!inr) {
      problems.push(`${slug} ${v.size}: no ${CURRENCY.toUpperCase()} price in the dashboard`)
      continue
    }
    if (inr.amount === v.price) continue

    changes++
    console.log(`${remote.title.padEnd(32)} ${v.size.padEnd(7)} ${String(inr.amount).padStart(4)} → ${v.price}`)
    if (APPLY) {
      // Sending prices replaces the variant's whole price set, so every other
      // price goes back unchanged by id.
      const prices = rv.prices.map((p) =>
        p.id === inr.id
          ? { id: p.id, amount: v.price, currency_code: p.currency_code }
          : { id: p.id, amount: p.amount, currency_code: p.currency_code }
      )
      await admin(`/admin/products/${remote.id}/variants/${rv.id}`, {
        method: "POST",
        body: JSON.stringify({ prices }),
      })
    }
  }
}

for (const p of problems) console.warn(`! ${p}`)
console.log(
  changes === 0
    ? "Dashboard already matches the product files."
    : APPLY
      ? `Updated ${changes} price(s).`
      : `${changes} price(s) would change. Run with --apply to write them.`
)
