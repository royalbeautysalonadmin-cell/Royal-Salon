import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so build traces stay scoped to this project
  // (a stray lockfile in a parent directory otherwise triggers a warning).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
