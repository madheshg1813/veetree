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

  /**
   * The apex sends everyone to www, which is the canonical host.
   *
   * Both hostnames point at Railway and both answered 200, so every page
   * existed at two addresses — duplicate content, and a search engine has to
   * guess which one to keep. This makes the answer explicit and agrees with
   * the canonical tags, which is what `site.url` now emits.
   *
   * 308 rather than 302: permanent, and it preserves the method, so a POST to
   * the apex is not silently downgraded to a GET on the way through.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "veetree.life" }],
        destination: "https://www.veetree.life/:path*",
        permanent: true,
      },
      /*
       * A previous site at this domain had a /learn section, and Google still
       * lists those articles — clicking one reached a 404. Nothing in this
       * repository or its history contains them, and their exact addresses are
       * not recoverable, so a wildcard catches whatever is still indexed.
       *
       * Temporary on purpose: `permanent: false` is a 307, which does not ask
       * Google to forget the old address. If those articles are rewritten they
       * can go back where they were and pick their rankings up again; a 308
       * would have thrown that away.
       */
      {
        source: "/learn/:path*",
        destination: "/",
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
