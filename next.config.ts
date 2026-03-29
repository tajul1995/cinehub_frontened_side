import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ✅ ADD THIS
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org", // (keep this too)
      },
    ],
  },
};

export default nextConfig;
