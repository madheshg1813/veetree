import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a self-contained server bundle so the Docker image stays small.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /**
     * Images are served through Cloudinary's CDN, which handles resizing and
     * format negotiation at the edge. The loader falls back to the local file
     * in /public when NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set, so the
     * site works with or without Cloudinary configured.
     */
    loader: "custom",
    loaderFile: "./src/lib/cloudinaryLoader.ts",
  },
};

export default nextConfig;
