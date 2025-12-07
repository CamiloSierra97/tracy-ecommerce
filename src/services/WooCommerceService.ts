export interface Product {
  id: number;
  name: string;
  price: string;
  short_description: string;
  slug: string;
  images?: { id: number; src: string; name: string }[];
}

export interface ProductsPage {
  products: Product[];
  totalPages: number;
}

const WooCommerceService = {
  getProducts: async ({ page = 1, per_page = 12 }): Promise<ProductsPage> => {
    // 1. Usa fetch nativo para reducir bundle size
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
};

export default WooCommerceService;
