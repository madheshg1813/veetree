import { site } from "@/lib/site"

/**
 * The facts the legal pages state about the business.
 *
 * Everything here is a representation made to customers and, in places, to
 * regulators — so a value is either confirmed or it is `null`. The pages render
 * a visible "to be confirmed" marker for a null rather than an invented value,
 * which keeps a placeholder from quietly shipping as though it were fact. This
 * follows the same rule as `commerce.trustSignals`: only state what is true today.
 */
export interface Business {
  /** Registered or trading name of the entity that sells on the site. */
  entityName: string | null
  /** e.g. "sole proprietorship", "private limited company". */
  entityType: string | null
  /** Registered / principal place of business, one line per address element. */
  address: string[] | null
  gstin: string | null
  /** City whose courts have jurisdiction, and the state for governing law. */
  jurisdictionCity: string | null

  supportEmail: string

  /**
   * Required by rule 4(5) of the Consumer Protection (E-Commerce) Rules, 2020,
   * which also sets the 48-hour acknowledgement and one-month resolution
   * windows quoted in the Terms.
   */
  grievanceOfficer: {
    name: string | null
    email: string
    phone: string
  }

  /** Shown on every document so customers can see which version they read. */
  lastUpdated: string
}

export const business: Business = {
  entityName: null,
  entityType: null,
  address: null,
  gstin: null,
  jurisdictionCity: null,

  supportEmail: "veetreework@gmail.com",

  grievanceOfficer: {
    name: null,
    email: "veetreework@gmail.com",
    phone: site.whatsappDisplay,
  },

  lastUpdated: "5 September 2026",
}

/**
 * Commercial terms quoted in the policies.
 *
 * These are Veetree's decisions to make, not facts to look up — the values
 * below are ordinary defaults for an Indian direct-to-consumer cosmetics
 * brand, and every one of them is quoted verbatim on the Terms page. Change a
 * number here and the sentence that states it changes with it.
 */
export const policy = {
  /** Working days between order confirmation and handover to the courier. */
  dispatchDays: "2 to 3 business days",
  /** Working days in transit after dispatch. */
  deliveryDays: "3 to 7 business days",
  /** Window to report a damaged, leaking, wrong or missing item. */
  reportWindow: "48 hours",
  /** Window to request a return of an unopened item. */
  returnWindow: "7 days",
  /** Time for a refund to reach the original payment method. */
  refundDays: "5 to 10 business days",
  /** Where Veetree ships. */
  shipsTo: "India",
} as const
