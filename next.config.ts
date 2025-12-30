import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Required for static sites like GitHub Pages
  images: {
    unoptimized: true, // Required because Next.js Image Optimization doesn't work on static sites
  },
};

export default nextConfig;
