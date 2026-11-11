import type { OrderLineInput } from "./medusaOrder"

const MAX_LINES = 40
const MAX_QTY = 20

/**
 * Reads cart lines sent by the browser: slug, size and a sane quantity, and
 * nothing else. Shared by every route that prices a cart.
 */
export function parseOrderLines(
  raw: unknown
): { ok: true; lines: OrderLineInput[] } | { ok: false; message: string } {
  const lines = Array.isArray(raw) ? raw : []
  if (lines.length === 0) return { ok: false, message: "Your cart is empty." }
  if (lines.length > MAX_LINES) return { ok: false, message: "That is too many items." }

  const clean: OrderLineInput[] = []
  for (const line of lines as Partial<OrderLineInput>[]) {
    const qty = Math.floor(Number(line?.qty))
    if (typeof line?.slug !== "string" || typeof line?.size !== "string" || !Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) {
      return { ok: false, message: "Your cart could not be read. Please reload and try again." }
    }
    clean.push({ slug: line.slug, size: line.size, qty })
  }
  return { ok: true, lines: clean }
}
