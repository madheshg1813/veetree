"use client"

import { useCallback, useEffect, useState } from "react"

export interface AccountCustomer {
  readonly id: string
  readonly email: string
  readonly first_name: string | null
  readonly last_name: string | null
}

/**
 * Who is signed in, as the browser sees it.
 *
 * The Medusa token lives in an httpOnly cookie the page cannot read, so the
 * answer always comes from the server. `loading` matters: rendering "sign in"
 * before the check returns would flash the wrong state at a signed-in customer.
 */
export function useAccount() {
  const [customer, setCustomer] = useState<AccountCustomer | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/account/me", { cache: "no-store" })
      const data = (await res.json()) as { customer: AccountCustomer | null }
      setCustomer(data.customer)
    } catch {
      setCustomer(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Written out rather than calling refresh(): state is only touched from the
  // promise callbacks, and the flag stops a late response from setting state on
  // a component that has already unmounted.
  useEffect(() => {
    let cancelled = false
    fetch("/api/account/me", { cache: "no-store" })
      .then((r) => r.json() as Promise<{ customer: AccountCustomer | null }>)
      .then((d) => { if (!cancelled) setCustomer(d.customer) })
      .catch(() => { if (!cancelled) setCustomer(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const signOut = useCallback(async () => {
    await fetch("/api/account/logout", { method: "POST" })
    setCustomer(null)
  }, [])

  return { customer, loading, refresh, signOut }
}
