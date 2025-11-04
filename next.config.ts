/** @type {import('next').NextConfig} */
const nextConfig = {
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