export interface Product {
  id: number;
  name: string;
  price: string;
  short_description: string;
  slug: string;
  description?: string;
  images?: { id: number; src: string; name: string }[];
}

export interface ProductsPage {
  products: Product[];
  totalPages: number;
}

import config from "@/lib/config";

const WooCommerceService = {
  getProducts: async ({ page = 1, per_page = 12 }): Promise<ProductsPage> => {
    // SERVER-SIDE: Direct Fetch to WooCommerce (Faster, fixes internal routing issues)
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
          const params = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
          });
          
          const response = await fetch(`${url}/wp-json/wc/v3/products?${params.toString()}`, {
            headers: { Authorization: `Basic ${auth}` },
            next: { revalidate: 60 } // Optional: Add caching for server calls
          });

          if (response.ok) {
            const data = await response.json();
            const totalPagesHeader = response.headers.get("x-wp-totalpages") || "0";
            return {
              products: data,
              totalPages: parseInt(totalPagesHeader, 10),
            };
          }
        } catch (error) {
          console.error("WooCommerce Direct Fetch Error:", error);
        }
      }
    }

    // CLIENT-SIDE (or fallback): Fetch via Internal API
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(per_page),
    });

    const response = await fetch(`/api/products?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data = await response.json();
    const totalPagesHeader = response.headers.get("x-wp-totalpages") || "0";

    return {
      products: data,
      totalPages: parseInt(totalPagesHeader, 10),
    };
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    // SERVER-SIDE: Direct Fetch to WooCommerce
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
          const response = await fetch(`${url}/wp-json/wc/v3/products?slug=${slug}`, {
            headers: { Authorization: `Basic ${auth}` },
            next: { revalidate: 60 }
          });

          if (response.ok) {
            const data = await response.json();
            return data && data.length > 0 ? data[0] : null;
          }
        } catch (error) {
          console.error("WooCommerce Direct Fetch Error (Slug):", error);
        }
      }
    }

    // CLIENT-SIDE (or fallback): Fetch via Internal API
    const params = new URLSearchParams({ slug });
    const response = await fetch(`/api/products?${params.toString()}`);

    if (!response.ok) return null;

    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  }
};

export default WooCommerceService;
