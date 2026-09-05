import type { Slug } from "./catalog/types"

/**
 * Customer reviews, supplied by Veetree and reproduced as written.
 *
 * These are real people's words — spelling, emoji and code-switching left
 * intact, because smoothing them out is what makes testimonials read as
 * invented. Only obvious line-break noise has been tidied.
 *
 * No star ratings were collected, so none are shown and no aggregateRating
 * markup is emitted. Inventing a score to fill a star row would be exactly
 * the kind of fabrication the rest of this catalogue avoids.
 */
export interface Review {
  readonly name: string
  /** What the reviewer said they were using, verbatim from the source. */
  readonly productLabel: string
  /** Product pages to link to, where the mention is unambiguous. */
  readonly slugs: readonly Slug[]
  readonly text: string
}

export const reviews: readonly Review[] = [
  {
    name: "Akshya Kannan",
    productLabel: "Kumkumadi Serum",
    slugs: ["kumkumadi-serum"],
    text: "Hey maha I'm using veetree kumkumadi serum for 1 year I can't go back. It's my healer frankly speaking thought of saying this to you 🥰",
  },
  {
    name: "Merlin Mano",
    productLabel: "Aqua Rose Serum & Aloe Vera Gel",
    slugs: ["aqua-rose-brightening-serum", "aloe-vera-gel"],
    text: "Sister good morning! Mano here! I think you remember me in the SRM stall. I loved the combo you gave me — aqua rose serum & aloe vera for my dry combination skin type. Thanks for suggesting this amazing combo which suits me the best. I never forget this, suggested me the best, made me very happy seriously. Please can you ping me when ur next stall at SRM please sis..",
  },
  {
    name: "Baby Roseline",
    productLabel: "Sandalwood Lip Balm",
    slugs: ["sandalwood-lip-balm"],
    text: "Please never stop making sandalwood lipbalm, it's my close friend i have now always with me 🥹🙏🏻 my honest kindly request",
  },
  {
    name: "Rakshana",
    productLabel: "Nalpamaradi Body Lotion",
    slugs: ["nalpamaradi-lotion"],
    text: "I love the packaging it's real and realistic — i myself a designer. The usage details are clear and easy to read and use. Good that I got hands on nalparamadi lotion, the texture and fragrance is divine from my childhood grandma home. Thanks for taking me back 💯",
  },
  {
    name: "Naresh Raj",
    productLabel: "Jasmine Hair Butter, Aloe Vera Gel, Body Butter",
    slugs: ["jasmine-hair-butter", "aloe-vera-gel"],
    text: "I recommended your products to my colleague — my team almost have your products in their bags. We almost share at office aloevera gel, hair butter, body butter. We feel soo refreshing using it instead of break time snack 😅",
  },
  {
    name: "Keerthana",
    productLabel: "Nalpamaradi Lepam",
    slugs: ["nalpamaradi-lepam"],
    text: "First unaware about neck pigmentation, now i feel confident. This lepam nalparamadi is amazing. I'm also using for lips",
  },
  {
    name: "Rangesh",
    productLabel: "Face Brightening Pack",
    slugs: ["face-brightening-pack"],
    text: "Mostly I never use anything on my face, but using a single product from you for weeks made something nice that I never noticed — my face looks glowing. This pack really clears my skin well",
  },
  {
    name: "Suresh Chandran",
    productLabel: "Hair Growth Oil",
    slugs: ["hair-growth-oil"],
    text: "Thanks a lot for the hair oil. I use it before every hair wash, its suits me perfectly",
  },
  {
    name: "Koushalya",
    productLabel: "Kumkumayadi Night Cream",
    slugs: ["kumkumayadi-night-cream"],
    text: "Akka!! u saw la acne marks cheeks la ipo nalla koraiyuthu. Ennaku hair care kum products venum, suggest me?",
  },
  {
    name: "Aravind R",
    productLabel: "Scalp & Hair Rebirth Serum",
    slugs: ["scalp-hair-rebirth-serum"],
    text: "Haloo ma'am! I'm frequently started getting scalp serum — it's my favourite",
  },
  {
    name: "Monisha Chowdhary",
    productLabel: "Sandalwood Lip Balm",
    slugs: ["sandalwood-lip-balm"],
    text: "I used more low quality lipsticks, faced many issues. This lipbalm is my go to product from you mam, thanks very much",
  },
  {
    name: "Dev Anand",
    productLabel: "The range",
    slugs: [],
    text: "Thanks for the products ma! Me and my wife are using it — quite good it is",
  },
]
