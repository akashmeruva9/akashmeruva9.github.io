import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>. Set NEXT_PUBLIC_BASE_PATH to
// "/<repo>" in that case; leave it empty for a user site (user.github.io) or a
// custom domain. The deploy workflow sets it automatically.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
