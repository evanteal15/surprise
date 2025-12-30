/** @type {import('next').NextConfig} */
const nextConfig = {
  // We removed 'output: export' because Vercel supports the full server
  // We removed 'basePath' and 'assetPrefix' because Vercel hosts at the root
  // We removed 'images: unoptimized' because Vercel can optimize images
};

module.exports = nextConfig;
