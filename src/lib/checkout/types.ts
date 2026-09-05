/** Everything checkout collects. Kept in one place so the submit contract is obvious. */
export interface DeliveryDetails {
  fullName: string
  phone: string
  email: string
  address1: string
  address2: string
  city: string
  state: string
  pincode: string
}

export const EMPTY_DETAILS: DeliveryDetails = {
  fullName: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
}

export type FieldErrors = Partial<Record<keyof DeliveryDetails, string>>

/**
 * The fields the delivery step owns. The phone number is settled a step earlier,
 * so the address step must not judge — or re-report an error on — a field the
 * customer cannot currently see.
 */
export const DELIVERY_FIELDS = [
  "fullName",
  "email",
  "address1",
  "city",
  "state",
  "pincode",
] as const satisfies readonly (keyof DeliveryDetails)[]

/**
 * The one canonical form of an Indian mobile number: the bare 10 digits, with
 * any spacing, punctuation or +91 prefix stripped. Everything that compares
 * numbers — validation, OTP challenges, the signed verification proof — goes
 * through this, so "+91 98765 43210" and "9876543210" can never be treated as
 * two different customers.
 */
export function normalizePhone(raw: string): string | null {
  const last10 = raw.replace(/\D/g, "").slice(-10)
  return /^[6-9]\d{9}$/.test(last10) ? last10 : null
}

/** Indian mobile numbers are 10 digits starting 6–9; pincodes are 6 digits not starting 0. */
export function validate(d: DeliveryDetails): FieldErrors {
  const e: FieldErrors = {}
  const digits = (v: string) => v.replace(/\D/g, "")

  if (!d.fullName.trim()) e.fullName = "Please enter your name"
  if (!digits(d.phone)) e.phone = "Please enter a phone number"
  else if (!normalizePhone(d.phone)) e.phone = "Enter a valid 10-digit mobile number"
  if (!d.email.trim()) e.email = "Please enter an email address"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
    e.email = "Enter a valid email address"
  if (!d.address1.trim()) e.address1 = "Please enter your address"
  if (!d.city.trim()) e.city = "Please enter your city"
  if (!d.state.trim()) e.state = "Please select your state"
  if (!/^[1-9]\d{5}$/.test(digits(d.pincode))) e.pincode = "Enter a valid 6-digit PIN code"

  return e
}

/** Indian states and union territories, for the delivery form. */
export const STATES = [
  "Andaman & Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh",
  "Chhattisgarh","Dadra & Nagar Haveli and Daman & Diu","Delhi","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Ladakh","Lakshadweep",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry",
  "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
  "West Bengal",
] as const
