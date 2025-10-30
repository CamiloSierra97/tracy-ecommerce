import type { WooProduct } from "@/types/WooProduct";

interface GetProductsParams {
  page?: number;
  per_page?: number;
  signal?: AbortSignal;
}

export interface ProductsPage {
  products: WooProduct[];
  totalPages: number;
}

// La función asíncrona devuelve una promesa que se resuelve a un array de WooProduct
const WooCommerceService = {
  async getProducts({
    page = 1,
    per_page = 12,
  }: GetProductsParams): Promise<ProductsPage> {
    const res = await fetch(`/api/products?page=${page}&per_page=${per_page}`);

    if (!res.ok) {
      throw new Error("Error fetching products");
    }

    const data = (await res.json()) as WooProduct[];
    const totalPagesHeader = res.headers.get("X-WP-TotalPages");
    const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 0;

    return {
      products: data,
      totalPages: totalPages,
    };
  },
};

export default WooCommerceService;
