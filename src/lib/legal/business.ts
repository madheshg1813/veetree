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
  /**
   * e.g. "sole proprietorship", "private limited company". Null when the
   * structure has not been confirmed — the copy then names the business
   * without claiming a form it might not have.
   */
  entityType: string | null
  /** Registered / principal place of business, one line per address element. */
  address: string[] | null
  /** Year the business started trading, for the About page. */
  since: string | null
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
  entityName: "Veetree Life",
  // Not stated by Veetree, so not claimed. The Terms name the business
  // without asserting a legal form.
  entityType: null,
  address: [
    "No. 30A, Gandhinagar 2nd Street",
    "Nandhivaram, Guduvancheri",
    "Tamil Nadu 603202",
  ],
  since: "2024",
  // Guduvancheri falls under Chengalpattu district. Confirm before relying on
  // it in a dispute.
  jurisdictionCity: "Chengalpattu, Tamil Nadu",

  supportEmail: "veetreework@gmail.com",

  grievanceOfficer: {
    name: "U. Mahavishalee",
    email: "veetreework@gmail.com",
    phone: site.whatsappDisplay,
  },

  lastUpdated: "9 September 2026",
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
  /**
   * Window to report a problem and claim an exchange. The unboxing video has
   * to exist, so this is deliberately short — the evidence is only available
   * to someone who filmed the parcel being opened.
   */
  reportWindow: "48 hours",
  /** How long a replacement takes to go back out once a claim is approved. */
  exchangeDispatchDays: "3 to 5 business days",
  /** Where Veetree ships. */
  shipsTo: "India",
} as const
