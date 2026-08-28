import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a self-contained server bundle so the Docker image stays small.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Product photography is served from /public at a handful of fixed widths.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
