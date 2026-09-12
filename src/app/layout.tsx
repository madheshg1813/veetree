import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import { GoldGradientDefs } from "@/components/icons"
import { site } from "@/lib/site";
import "./globals.css"
import "./catalog.css";
import "./home.css";
import "./legal.css";

// Self-hosted at build time — no request to Google at runtime.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

/** Empty in development and in any build that was not given the ID. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim()

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Ayurvedic Skin & Hair Care, Handcrafted in Small Batches`,
  description: site.description,
  /*
   * More than the SVG. Google's favicon crawler and Safari both look for a
   * raster file — often /favicon.ico directly — and fall back to whatever they
   * cached when there is none, which is why a search result kept showing the
   * old mark. The SVG leads for browsers that prefer it, since it stays sharp
   * at any size and follows the tab's colour scheme.
   */
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${site.name} — Ayurvedic Skin & Hair Care`,
    description: "Small-batch Ayurvedic formulations. Rooted in tradition, made for modern skin.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/products/kumkumadi-serum.jpg", width: 1100, height: 1100 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Ayurvedic Skin & Hair Care`,
    description: "Small-batch Ayurvedic formulations. Rooted in tradition, made for modern skin.",
    images: ["/products/kumkumadi-serum.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2A1D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${cinzel.variable}`}>
      <body>
        <GoldGradientDefs />
        {children}
      </body>
      {/*
        Google Analytics, loaded after hydration so it costs nothing on first
        paint. Rendered only when the measurement ID is set, which keeps
        development and any preview build out of the production property —
        there is no point measuring our own clicking about.

        NEXT_PUBLIC_* is inlined at build time, so this needs the matching ARG
        in the Dockerfile as well as the Railway variable. Setting one without
        the other leaves the tag silently absent, which is exactly how this
        project lost a fortnight of deploys once already.
      */}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
