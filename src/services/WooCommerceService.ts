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

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // Browser: relative URL is fine
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Vercel Serverless
  return "http://localhost:3000"; // Default fallback for local server-side
};

const WooCommerceService = {
  getProducts: async ({ page = 1, per_page = 12 }): Promise<ProductsPage> => {
    // 1. Usa fetch nativo para reducir bundle size
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(per_page),
    });

    const response = await fetch(`${getBaseUrl()}/api/products?${params.toString()}`);

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
    const params = new URLSearchParams({ slug });
    const response = await fetch(`${getBaseUrl()}/api/products?${params.toString()}`);

    if (!response.ok) return null;

    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  }
};

export default WooCommerceService;
