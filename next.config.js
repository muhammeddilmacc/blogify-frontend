/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "alicendek.onrender.com",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true,
    domains: ["localhost", "alicendek.onrender.com"],
    formats: ['image/webp'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
