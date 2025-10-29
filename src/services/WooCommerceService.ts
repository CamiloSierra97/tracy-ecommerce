import type { WooProduct } from "@/types/WooProduct";

interface GetProductsParams {
  page?: number;
  per_page?: number;
  signal?: AbortSignal;
}

// La función asíncrona devuelve una promesa que se resuelve a un array de WooProduct
const WooCommerceService = {
  async getProducts({
    page = 1,
    per_page = 12,
  }: GetProductsParams): Promise<WooProduct[]> {
    const res = await fetch(`/api/products?page=${page}&per_page=${per_page}`);

    if (!res.ok) {
      throw new Error("Error fetching products");
      console.error("hi")
    }

    const data = (await res.json()) as WooProduct[];
    return data;
  },
};

export default WooCommerceService;
