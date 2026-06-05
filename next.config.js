/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // Firebase Storage download URLs
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        // Allow common placeholder/sample image hosts used by seed data
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
