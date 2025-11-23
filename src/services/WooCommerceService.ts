import axios from "axios";

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
    // 1. Llamamos a TU ruta interna (Next.js), no a WooCommerce directo
    // Al ser ruta relativa, Next.js sabe que es su propia API
    const { data, headers } = await axios.get(`/api/products`, {
      params: { page, per_page },
    });

    // 2. Tu API devuelve los productos en el body (data)
    // y el total de páginas en los headers (x-wp-totalpages)

    // OJO: Axios suele poner los headers en minúsculas
    const totalPages =
      headers["x-wp-totalpages"] || headers["X-WP-TotalPages"] || "0";

    return {
      products: data, // El array de productos
      totalPages: parseInt(totalPages as string, 10), // Convertimos a número para el hook
    };
  },
};

export default WooCommerceService;
