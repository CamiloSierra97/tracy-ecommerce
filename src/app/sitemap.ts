// Este es un ejemplo para mapear el site (SEO)
import { MetadataRoute } from "next";

// ⚠️ SIMULACIÓN DE DATOS DE PRODUCTOS (Reemplazar con tu llamada a la API)
const getAllProducts = () => {
  // En una aplicación real, esta función haría una llamada a la API
  // para obtener un array de objetos de producto con sus slugs (o IDs).
  return [
    { slug: "sosten-de-seda-roja", lastModified: new Date() },
    { slug: "babydoll-negro-encaje", lastModified: new Date() },
    { slug: "liguero-exclusivo", lastModified: new Date() },
    // ... más productos
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shop.glowcosmeticoscol.com/wp-json/wc/v3"; // ⬅️ REEMPLAZA CON TU DOMINIO REAL

  // 1. Obtener datos dinámicos (Productos)
  const products = getAllProducts();

  // 2. Mapear los productos a entradas del sitemap
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.lastModified,
    changeFrequency: "weekly", // Los productos cambian de stock/precio
    priority: 0.8, // Prioridad alta para los productos
  }));

  // 3. Páginas Estáticas y de Categoría
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily", // La página de inicio es la más importante
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9, // La página de la colección general
    },
    {
      url: `${baseUrl}/categories/lenceria-de-lujo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly", // Estas páginas cambian poco
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 4. Combinar todas las entradas
  return [...staticEntries, ...productEntries];
}

/* 
    IMPORTANTE!!!!!
    ➡️ El Paso Final Obligatorio
Aunque Next.js lo genera automáticamente, aún tienes un paso manual y crucial que debes hacer para que Google sepa que existe:

Debes enviar la URL de tu sitemap a Google Search Console.

Ve a Google Search Console (GSC).

Selecciona tu propiedad (dominio).

En el menú lateral, haz clic en "Sitemaps".

Introduce la URL: sitemap.xml

Haz clic en Enviar.

Una vez enviado, Google comenzará a rastrear todas las URLs de productos que has listado, lo cual es vital para el SEO de tu E-commerce.

*/
