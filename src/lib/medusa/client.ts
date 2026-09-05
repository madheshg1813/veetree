/**
 * Medusa Store API client.
 *
 * Only the publishable key and region id reach the browser — both are safe
 * there: the publishable key scopes reads to published products in a sales
 * channel and cannot mutate anything.
 *
 * Every call is wrapped so a Medusa outage degrades the page rather than
 * breaking the build. Callers get `null` and fall back to local data.
 */

const BASE = process.env.NEXT_PUBLIC_MEDUSA_URL
const KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
export const REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID

/** True when the storefront is configured to read from Medusa. */
export const medusaEnabled = Boolean(BASE && KEY)

export interface MedusaPrice {
  calculated_amount: number | null
  currency_code: string | null
}

export interface MedusaVariant {
  id: string
  title: string | null
  sku: string | null
  calculated_price?: MedusaPrice | null
  /** Absent when the variant does not manage inventory. */
  inventory_quantity?: number | null
  manage_inventory?: boolean | null
  /** Grams, as entered in the dashboard. */
  weight?: number | null
}

export interface MedusaImage {
  id: string
  url: string
}

export interface MedusaCategory {
  id: string
  name: string
  handle: string
}

export interface MedusaProduct {
  id: string
  title: string
  handle: string
  description: string | null
  status: string
  metadata: Record<string, unknown> | null
  images: MedusaImage[]
  variants: MedusaVariant[]
  categories: MedusaCategory[]
}

async function storeFetch<T>(path: string, revalidate = 60): Promise<T | null> {
  if (!medusaEnabled) return null
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "x-publishable-api-key": KEY! },
      // Cached at build and revalidated periodically, so an admin price change
      // reaches the site without a deploy.
      next: { revalidate },
    })
    if (!res.ok) {
      console.warn(`[medusa] ${path} → ${res.status}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.warn(`[medusa] ${path} failed:`, err instanceof Error ? err.message : err)
    return null
  }
}

const FIELDS = [
  "id", "title", "handle", "description", "status", "metadata",
  "*images", "*variants", "*variants.calculated_price", "*categories",
  // Stock, as the admin sets it. Needs the "+" form: inventory_quantity is
  // computed per sales channel and is not returned by "*variants" alone.
  "+variants.inventory_quantity", "+variants.manage_inventory", "+variants.weight",
].join(",")

export async function fetchProducts(): Promise<MedusaProduct[] | null> {
  const q = new URLSearchParams({ limit: "200", fields: FIELDS })
  if (REGION_ID) q.set("region_id", REGION_ID)
  const data = await storeFetch<{ products: MedusaProduct[] }>(`/store/products?${q}`)
  return data?.products ?? null
}

export async function fetchProduct(handle: string): Promise<MedusaProduct | null> {
  const q = new URLSearchParams({ handle, limit: "1", fields: FIELDS })
  if (REGION_ID) q.set("region_id", REGION_ID)
  const data = await storeFetch<{ products: MedusaProduct[] }>(`/store/products?${q}`)
  return data?.products?.[0] ?? null
}
