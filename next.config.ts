import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS-managed image URLs can point anywhere; allow any HTTPS host.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
