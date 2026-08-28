import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import { GoldGradientDefs } from "@/components/icons";
import { site } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Ayurvedic Skin & Hair Care, Handcrafted in Small Batches`,
  description: site.description,
  icons: { icon: "/favicon.svg" },
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
    </html>
  );
}
