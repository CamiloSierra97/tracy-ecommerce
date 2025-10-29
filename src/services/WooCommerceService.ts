// src/services/WooCommerceService.ts
import type { WooProduct } from "@/types/WooProduct";

const WooCommerceService = {
  async getProducts({
    page = 1,
    per_page = 12,
  }: {
    page?: number;
    per_page?: number;
  }): Promise<WooProduct[]> {
    const res = await fetch(`/api/products?page=${page}&per_page=${per_page}`);

    if (!res.ok) {
      throw new Error("Error fetching products");
    }

    const data = (await res.json()) as WooProduct[];
    return data;
  },
};

export default WooCommerceService;
