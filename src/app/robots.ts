import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private", "/region-no-disponible"],
    },
    sitemap: "https://www.tracystore.com/sitemap.xml",
  };
}
