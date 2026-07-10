import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so build traces stay scoped to this project
  // (a stray lockfile in the home directory otherwise triggers a warning).
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
  // trailingSlash defaults to false, which already makes Next.js 308-redirect
  // any /path/ to /path automatically — verified against production (e.g.
  // /hijab-friendly-salon-warsaw/ already 308s to the no-slash URL and
  // resolves 200). These entries only cover URLs that moved to a genuinely
  // different path post-WordPress-migration, confirmed via GSC as having had
  // real indexed traffic. Do NOT add rules for spam/hack-injected junk URLs
  // (saiga.php, numeric-only paths, /wp-content/*, etc.) — those should keep
  // 404ing (Vercel's edge already 403s the .php/wp-content ones outright).
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/category/hair-care", destination: "/services/hair", permanent: true },
      { source: "/treading", destination: "/services/threading", permanent: true },
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
