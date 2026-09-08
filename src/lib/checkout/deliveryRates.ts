import { FALLBACK_RATES, type DeliveryRates } from "./shipping"

/**
 * Delivery rates as the dashboard has them.
 *
 * Read from the backend rather than compiled in, so a charge edited in the
 * dashboard changes the figure the customer is quoted — not just the figure
 * they are billed. Falls back to the constants when the backend is
 * unreachable, which keeps checkout working through an outage with a quote
 * that may be stale rather than no quote at all.
 */
export async function fetchDeliveryRates(): Promise<DeliveryRates> {
  const base = process.env.NEXT_PUBLIC_MEDUSA_URL?.trim()
  const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY?.trim()
  if (!base || !key) return FALLBACK_RATES

  try {
    const res = await fetch(`${base}/store/delivery-rates`, {
      headers: { "x-publishable-api-key": key },
      next: { revalidate: 60 },
    })
    if (!res.ok) return FALLBACK_RATES
    const d = (await res.json()) as {
      rates?: Partial<DeliveryRates>
      breakG?: number
      packagingG?: number
    }
    const n = (v: unknown, fallback: number) =>
      typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : fallback

    return {
      tnLight: n(d.rates?.tnLight, FALLBACK_RATES.tnLight),
      tnHeavy: n(d.rates?.tnHeavy, FALLBACK_RATES.tnHeavy),
      inLight: n(d.rates?.inLight, FALLBACK_RATES.inLight),
      inHeavy: n(d.rates?.inHeavy, FALLBACK_RATES.inHeavy),
      breakG: n(d.breakG, FALLBACK_RATES.breakG),
      packagingG: n(d.packagingG, FALLBACK_RATES.packagingG),
    }
  } catch {
    return FALLBACK_RATES
  }
}
