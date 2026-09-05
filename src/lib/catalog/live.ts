import { byHandle, mergeProduct } from "@/lib/medusa/merge"
import { productFromMedusa } from "@/lib/medusa/fromMedusa"
import { fetchProducts, medusaEnabled } from "@/lib/medusa/client"
import { allProducts, getProduct, productsIn } from "./index"
import type { Collection, Product, Slug } from "./types"

/**
 * The catalogue as the site should render it: local editorial content with
 * live commercial data from Medusa layered on top.
 *
 * Every function degrades to local data when Medusa is unreachable or not
 * configured, so the site builds and serves either way — a backend outage
 * shows slightly stale prices rather than an error page.
 */

export async function liveProducts(): Promise<readonly Product[]> {
  const local = allProducts()
  if (!medusaEnabled) return local
  const remote = await fetchProducts()
  if (!remote) return local
  const index = byHandle(remote)

  const merged = local.map((p) => mergeProduct(p, index.get(p.slug)))

  /**
   * Products that exist only in Medusa — created in the dashboard, with no
   * file behind them — are appended so they appear without a deploy. Local
   * ones are built first and win on handle, so a hand-written page is never
   * replaced by the thinner record.
   */
  const known = new Set(local.map((p) => p.slug))
  const dashboardOnly = remote
    .filter((r) => !known.has(r.handle as Product["slug"]))
    .map(productFromMedusa)
    .filter((p): p is Product => p !== null)

  return [...merged, ...dashboardOnly]
}

export async function liveProduct(slug: Slug): Promise<Product | undefined> {
  const local = getProduct(slug)
  if (!medusaEnabled) return local
  const remote = await fetchProducts()
  if (!remote) return local
  const match = byHandle(remote).get(slug)
  if (local) return mergeProduct(local, match)
  // No local file: a product added in the dashboard.
  return match ? (productFromMedusa(match) ?? undefined) : undefined
}

export async function liveProductsIn(collection: Collection): Promise<Product[]> {
  const local = productsIn(collection)
  if (!medusaEnabled) return local
  const remote = await fetchProducts()
  if (!remote) return local
  const index = byHandle(remote)
  return local.map((p) => mergeProduct(p, index.get(p.slug)))
}

export async function liveRelated(product: Product): Promise<Product[]> {
  const { relatedTo } = await import("./index")
  const local = relatedTo(product)
  if (!medusaEnabled) return local
  const remote = await fetchProducts()
  if (!remote) return local
  const index = byHandle(remote)
  return local.map((p) => mergeProduct(p, index.get(p.slug)))
}
