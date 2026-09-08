"use client"

import { createContext, useContext, useMemo, useState } from "react"

interface VariantMedia {
  /** Image the chosen size should be showing, or null for the product default. */
  readonly activeImage: string | null
  readonly setActiveImage: (src: string | null) => void
}

const Ctx = createContext<VariantMedia>({ activeImage: null, setActiveImage: () => {} })

/**
 * Links the size picker to the gallery.
 *
 * The two live in separate columns of the hero, so the selection is shared
 * through context rather than by restructuring the page. Medusa lets an image
 * be attached to a variant, and a customer choosing 20 ml expects to see the
 * 20 ml bottle — without this the gallery ignored the choice entirely.
 */
export function VariantMediaProvider({ children }: { children: React.ReactNode }) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const value = useMemo(() => ({ activeImage, setActiveImage }), [activeImage])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useVariantMedia = () => useContext(Ctx)
