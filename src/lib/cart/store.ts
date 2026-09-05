/**
 * Cart store — a module-level external store read through useSyncExternalStore.
 * Correct shape for state that lives outside React (localStorage), and it gives
 * cross-tab sync and correct hydration without an effect that sets state.
 *
 * Only slug, size and quantity are persisted; the product and its price are
 * resolved from the catalogue at render, so price edits propagate at once and
 * a discontinued product drops out rather than resurrecting stale data.
 */
export const STORAGE_KEY = "veetree.cart.v2"
export const MAX_QTY = 10

export interface StoredLine {
  readonly slug: string
  /** Which variant — products can have more than one size. */
  readonly size: string
  readonly qty: number
}

const EMPTY: readonly StoredLine[] = Object.freeze([])

let cache: readonly StoredLine[] = EMPTY
let loaded = false
const listeners = new Set<() => void>()

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.round(n)))
const same = (a: StoredLine, slug: string, size: string) => a.slug === slug && a.size === size

function read(): readonly StoredLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return EMPTY
    const lines = parsed
      .filter(
        (l): l is StoredLine =>
          typeof l === "object" &&
          l !== null &&
          typeof (l as StoredLine).slug === "string" &&
          typeof (l as StoredLine).size === "string" &&
          Number.isFinite((l as StoredLine).qty)
      )
      .map((l) => ({ slug: l.slug, size: l.size, qty: clampQty(l.qty) }))
    return lines.length ? lines : EMPTY
  } catch {
    return EMPTY
  }
}

function ensureLoaded() {
  if (loaded || typeof window === "undefined") return
  cache = read()
  loaded = true
}

const emit = () => listeners.forEach((l) => l())

function commit(next: readonly StoredLine[]) {
  cache = next.length ? next : EMPTY
  loaded = true
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    // Storage unavailable — the cart still works for this session.
  }
  emit()
}

const onStorage = (e: StorageEvent) => {
  if (e.key !== STORAGE_KEY) return
  cache = read()
  loaded = true
  emit()
}

export function subscribe(cb: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", onStorage)
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
    if (listeners.size === 0) window.removeEventListener("storage", onStorage)
  }
}

export function getSnapshot(): readonly StoredLine[] {
  ensureLoaded()
  return cache
}

export const getServerSnapshot = (): readonly StoredLine[] => EMPTY

export function addLine(slug: string, size: string, qty = 1) {
  ensureLoaded()
  const existing = cache.find((l) => same(l, slug, size))
  commit(
    existing
      ? cache.map((l) => (same(l, slug, size) ? { ...l, qty: clampQty(l.qty + qty) } : l))
      : [...cache, { slug, size, qty: clampQty(qty) }]
  )
}

export function setLineQty(slug: string, size: string, qty: number) {
  ensureLoaded()
  commit(
    qty <= 0
      ? cache.filter((l) => !same(l, slug, size))
      : cache.map((l) => (same(l, slug, size) ? { ...l, qty: clampQty(qty) } : l))
  )
}

export function removeLine(slug: string, size: string) {
  ensureLoaded()
  commit(cache.filter((l) => !same(l, slug, size)))
}

export const clearLines = () => commit(EMPTY)
