/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [new URL('https://shop.glowcosmeticoscol.com/**')],
  },
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
        {
          source: "/api/:path*",
          destination: "https://shop.glowcosmeticoscol.com/wp-json/:path*",
        },
      ]
      : [];
  },
};

export default nextConfig;
