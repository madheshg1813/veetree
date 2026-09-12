import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

/**
 * There was no robots.txt at all, so crawlers had nothing pointing them at a
 * sitemap. The personal pages are excluded here as well as by their own
 * `noindex`, since a crawler reads this before it reads them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/account", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
