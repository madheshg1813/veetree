import type { MetadataRoute } from "next"
import { allCollectionSlugs, allProductSlugs } from "@/lib/catalog"
import { COMBOS } from "@/lib/catalog/combos"
import { CONCERNS } from "@/lib/catalog/concerns"
import { site } from "@/lib/site"

/**
 * The sitemap, generated from the catalogue.
 *
 * There was none, so a search engine had only links to go on and ended up
 * listing pages that no longer exist. Every route here is derived from the
 * same data that builds the pages, which means the sitemap cannot claim a page
 * the site does not serve, or miss one it does.
 *
 * The cart, checkout and account pages are deliberately absent: they are
 * per-customer and already carry `robots: noindex`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const at = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  })

  return [
    at("", 1, "weekly"),

    // The things people come to buy.
    ...allProductSlugs().map((slug) => at(`/products/${slug}`, 0.9, "weekly")),
    ...allCollectionSlugs().map((slug) => at(`/collections/${slug}`, 0.8, "weekly")),
    at("/combos", 0.8, "weekly"),
    ...COMBOS.map((c) => at(`/combos/${c.slug}`, 0.7, "weekly")),
    at("/concerns", 0.7, "monthly"),
    ...CONCERNS.map((c) => at(`/concerns/${c.slug}`, 0.6, "monthly")),

    // The pages a customer, or a payment gateway, checks before buying.
    at("/about", 0.5, "monthly"),
    at("/contact", 0.5, "monthly"),
    at("/shipping-policy", 0.4, "yearly"),
    at("/refund-policy", 0.4, "yearly"),
    at("/terms", 0.3, "yearly"),
    at("/terms-of-use", 0.3, "yearly"),
    at("/privacy", 0.3, "yearly"),
    at("/disclaimer", 0.3, "yearly"),
  ]
}
