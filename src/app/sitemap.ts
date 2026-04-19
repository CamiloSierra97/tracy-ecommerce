import { MetadataRoute } from "next";
import WooCommerceService from "@/services/WooCommerceService";

const BASE_URL = "https://www.tracystore.com";

// Categorías válidas del proyecto (src/app/[category]/page.tsx)
const CATEGORIES = ["mujer", "hombre", "nina", "promociones"];

// Fecha de última actualización del contenido editorial
const SITE_LAST_UPDATED = new Date("2026-04-18");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch real products from WooCommerce
  let productEntries: MetadataRoute.Sitemap = [];

  try {
    const allProducts = [];
    let page = 1;
    let totalPages = 1;

    do {
      const result = await WooCommerceService.getProducts({
        page,
        per_page: 50,
      });
      if (result.products && result.products.length > 0) {
        allProducts.push(...result.products);
        totalPages = result.totalPages || 1;
      } else {
        break;
      }
      page++;
    } while (page <= totalPages);

    productEntries = allProducts.map((product) => ({
      url: `${BASE_URL}/productos/${product.slug}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Páginas estáticas públicas del proyecto
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tienda`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Categorías principales /[category]
    ...CATEGORIES.map((cat) => ({
      url: `${BASE_URL}/${cat}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    // Categorías dentro de /tienda/[category]
    ...CATEGORIES.map((cat) => ({
      url: `${BASE_URL}/tienda/${cat}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    {
      url: `${BASE_URL}/acerca-de`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/envios`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terminos`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [...staticEntries, ...productEntries];
}
