/** @type {import('next').NextConfig} */

// 1. Define a variable for your repo name
const repo = "surprise";

// 2. Check if we are running in production (GitHub) or local (dev)
const isProd = process.env.NODE_ENV === "production";

// 3. Set the correct prefix
const assetPrefix = isProd ? `/${repo}/` : "";

const nextConfig = {
  output: "export",
  // This forces Next.js to look for CSS/JS in the subfolder
  basePath: isProd ? `/${repo}` : "",
  // This forces assets to load from the subfolder
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
  // Make the prefix available to your code so we can fix images
  env: {
    NEXT_PUBLIC_BASE_PATH: assetPrefix,
  },
};

module.exports = nextConfig;
