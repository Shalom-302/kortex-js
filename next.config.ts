import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image.
  output: "standalone",
  // Pin the workspace root (a stray lockfile higher up would otherwise confuse Turbopack).
  turbopack: { root: __dirname },
  images: {
    // Temporary stock photography — to be replaced with KORTEX's own images.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // Pages from the previous site structure, kept alive for old links and search engines.
  async redirects() {
    return [
      { source: "/:locale(fr|en)/solutions/:slug*", destination: "/:locale/services", permanent: true },
      { source: "/:locale(fr|en)/labs", destination: "/:locale/universes", permanent: true },
      { source: "/:locale(fr|en)/work/:slug*", destination: "/:locale", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
