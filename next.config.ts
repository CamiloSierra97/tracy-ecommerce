/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    qualities: [75, 85],
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
