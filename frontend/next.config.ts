import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/category/hair-care", destination: "/services/hair", permanent: true },
      { source: "/treading", destination: "/services/threading", permanent: true },
      { source: "/hair-salon-warsaw", destination: "/warsaw/hair-salon-warsaw", permanent: true },
      { source: "/eyebrow-threading-warsaw", destination: "/warsaw/eyebrow-threading-warsaw", permanent: true },
      { source: "/bridal-makeup-warsaw", destination: "/warsaw/bridal-makeup-warsaw", permanent: true },
      { source: "/facial-warsaw", destination: "/warsaw/facial-warsaw", permanent: true },
      { source: "/waxing-warsaw", destination: "/warsaw/waxing-warsaw", permanent: true },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) return [];
    return {
      beforeFiles: [
        { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      ],
    };
  },
};

export default nextConfig;
