/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shop.glowcosmeticos.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
        {
          source: "/api/:path*",
          destination: "https://shop.glowcosmeticos.com/wp-json/:path*",
        },
      ]
      : [];
  },
};

export default nextConfig;
