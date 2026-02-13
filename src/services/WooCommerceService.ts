export interface Product {
  id: number;
  name: string;
  price: string;
  short_description: string;
  slug: string;
  description?: string;
  images?: { id: number; src: string; name: string }[];
  status?: string;
  on_sale?: boolean;
  regular_price?: string;
  sale_price?: string;
  type: "simple" | "variable" | "grouped" | "external";
  attributes: {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
  }[];
  variations: number[];
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
}

export interface ProductVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  attributes: {
    id: number;
    name: string;
    option: string;
  }[];
  image?: { id: number; src: string; alt: string };
  stock_status: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  display: "default" | "products" | "subcategories" | "both";
  image: { id: number; src: string; alt: string } | null;
  parent: number;
  count: number;
}

export interface ProductsPage {
  products: Product[];
  totalPages: number;
}

export interface Review {
  id: number;
  date_created: string;
  reviewer: string;
  rating: number;
  review: string;
  verified: boolean;
  reviewer_avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
}

export interface RegisterCustomerData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  billing?: {
    phone?: string;
    first_name?: string;
    last_name?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface OrderItem {
  product_id: number;
  variation_id?: number;
  quantity: number;
}

export interface OrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: BillingAddress;
  shipping: ShippingAddress;
  line_items: OrderItem[];
  customer_id?: number;
  coupon_lines?: { code: string }[];
}

export interface OrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  subtotal: string;
  total: string;
  price: number;
  image?: { id: number; src: string };
}

export interface Order {
  id: number;
  number: string;
  date_created: string;
  status:
    | "pending"
    | "processing"
    | "on-hold"
    | "completed"
    | "cancelled"
    | "refunded"
    | "failed";
  currency: string;
  total: string;
  billing: BillingAddress;
  shipping: ShippingAddress;
  line_items: OrderLineItem[];
  coupon_lines?: { code: string }[];
}

export interface Coupon {
  id: number;
  code: string;
  amount: string;
  discount_type: "percent" | "fixed_cart" | "fixed_product";
  description: string;
  minimum_amount: string;
  status: string;
}

export interface WPUser {
  id: number;
  email?: string;
  user_email?: string;
  roles?: string[];
  role?: string;
}

export interface WCCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
  billing?: BillingAddress;
}

import config from "@/lib/config";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Returns the WooCommerce config if all required fields are present, or null.
 */
function getWCConfig() {
  const { url, consumerKey, consumerSecret } = config.woocommerce;
  if (!url || !consumerKey || !consumerSecret) return null;
  return { url: url.replace(/\/$/, ""), consumerKey, consumerSecret };
}

/**
 * Creates the Basic auth header value for WooCommerce API calls.
 */
function getAuthHeader(consumerKey: string, consumerSecret: string): string {
  return `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")}`;
}

/**
 * Wrapper around fetch for authenticated WooCommerce REST API calls.
 * Returns the Response object, or null if config is missing or not on server.
 */
async function wcFetch(
  path: string,
  options?: RequestInit & { next?: { revalidate: number } },
): Promise<Response | null> {
  if (!isServer()) return null;
  const wc = getWCConfig();
  if (!wc) return null;

  const url = `${wc.url}${path}`;
  const auth = getAuthHeader(wc.consumerKey, wc.consumerSecret);

  return fetch(url, {
    ...options,
    headers: {
      Authorization: auth,
      ...options?.headers,
    },
  });
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

const WooCommerceService = {
  getProductVariations: async (
    productId: number,
  ): Promise<ProductVariation[]> => {
    try {
      const response = await wcFetch(
        `/wp-json/wc/v3/products/${productId}/variations`,
        { next: { revalidate: 3600 } },
      );
      if (response?.ok) return await response.json();
    } catch (error) {
      console.error(
        `Error fetching variations for product ${productId}:`,
        error,
      );
    }
    return [];
  },

  getProductCategories: async (): Promise<Category[]> => {
    try {
      const response = await wcFetch(
        `/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true&orderby=name&order=asc`,
        { next: { revalidate: 3600 } },
      );
      if (response?.ok) return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    return [];
  },

  getProductReviews: async (productId: number): Promise<Review[]> => {
    try {
      const response = await wcFetch(
        `/wp-json/wc/v3/products/reviews?product=${productId}`,
        { next: { revalidate: 60 } },
      );
      if (response?.ok) return await response.json();
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
    return [];
  },

  createProductReview: async (data: {
    product_id: number;
    review: string;
    reviewer: string;
    reviewer_email: string;
    rating: number;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await wcFetch(`/wp-json/wc/v3/products/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response)
        return { success: false, message: "Server config unavailable" };
      if (response.ok) return { success: true };

      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Error al enviar la reseña",
      };
    } catch (error) {
      console.error("Error creating review:", error);
      return { success: false, message: "Error de conexión" };
    }
  },

  getProducts: async ({
    page = 1,
    per_page = 12,
    category,
  }: {
    page?: number;
    per_page?: number;
    category?: string;
  }): Promise<ProductsPage> => {
    // Server-side: direct WooCommerce call
    if (isServer()) {
      try {
        const params = new URLSearchParams({
          page: String(page),
          per_page: String(per_page),
        });
        if (category) params.append("category", category);

        const response = await wcFetch(
          `/wp-json/wc/v3/products?${params.toString()}`,
          { next: { revalidate: 60 } },
        );

        if (response?.ok) {
          const data = await response.json();
          const totalPages = parseInt(
            response.headers.get("x-wp-totalpages") || "0",
            10,
          );
          return { products: data, totalPages };
        }
      } catch (error) {
        console.error("Error fetching products (server):", error);
      }
      return { products: [], totalPages: 0 };
    }

    // Client-side: internal API proxy
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(per_page),
    });
    if (category) params.append("category", category);

    const response = await fetch(`/api/products?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data = await response.json();
    const totalPages = parseInt(
      response.headers.get("x-wp-totalpages") || "0",
      10,
    );
    return { products: data, totalPages };
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    // Server-side
    if (isServer()) {
      try {
        const response = await wcFetch(
          `/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}`,
          { next: { revalidate: 60 } },
        );
        if (response?.ok) {
          const data = await response.json();
          return data?.[0] ?? null;
        }
      } catch (error) {
        console.error("Error fetching product by slug:", error);
      }
      return null;
    }

    // Client-side
    const params = new URLSearchParams({ slug });
    const response = await fetch(`/api/products?${params.toString()}`);
    if (!response.ok) return null;

    const data = await response.json();
    return data?.[0] ?? null;
  },

  registerCustomer: async (
    data: RegisterCustomerData,
  ): Promise<{
    success: boolean;
    message?: string;
    error?: string;
    customer?: WCCustomer;
  }> => {
    try {
      const response = await wcFetch(`/wp-json/wc/v3/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response) {
        return {
          success: false,
          message: "Server config unavailable",
          error: "Server config unavailable",
        };
      }

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage =
          responseData.message || "Error al registrar usuario.";

        if (errorMessage.includes("An account is already registered")) {
          errorMessage =
            "Ya existe una cuenta registrada con este correo electrónico. Por favor, inicia sesión.";
        } else if (errorMessage.includes("Username is already registered")) {
          errorMessage =
            "Este nombre de usuario ya está en uso. Por favor elige otro.";
        }

        return { success: false, message: errorMessage, error: errorMessage };
      }

      return {
        success: true,
        message: "Cuenta creada exitosamente. Por favor inicia sesión.",
        customer: responseData,
      };
    } catch (error) {
      console.error("Error registering customer:", error);
      return {
        success: false,
        message: "Error de conexión con el servidor.",
        error: "Error de conexión con el servidor.",
      };
    }
  },

  getCustomerByEmail: async (email: string): Promise<WCCustomer | null> => {
    try {
      const response = await wcFetch(
        `/wp-json/wc/v3/customers?email=${encodeURIComponent(email)}`,
        { next: { revalidate: 0 } },
      );
      if (response?.ok) {
        const data = await response.json();
        return data?.[0] ?? null;
      }
    } catch (error) {
      console.error("Error fetching customer by email:", error);
    }
    return null;
  },

  getWPUserByEmail: async (email: string): Promise<WPUser | null> => {
    try {
      const response = await wcFetch(
        `/wp-json/wp/v2/users?search=${encodeURIComponent(email)}&context=edit`,
        { next: { revalidate: 0 } },
      );
      if (response?.ok) {
        const data: WPUser[] = await response.json();
        return (
          data.find((u) => u.email === email || u.user_email === email) ?? null
        );
      }
    } catch (error) {
      console.error("Error fetching WP user by email:", error);
    }
    return null;
  },

  loginCustomer: async (credentials: {
    email: string;
    password: string;
  }): Promise<{
    success: boolean;
    user?: {
      id: string;
      name: string;
      email: string;
      image?: string;
      roles?: string[];
    };
    token?: string;
    message?: string;
  }> => {
    if (!isServer()) {
      return { success: false, message: "Server config unavailable" };
    }

    const wc = getWCConfig();
    if (!wc) {
      return { success: false, message: "Server config unavailable" };
    }

    try {
      const res = await fetch(`${wc.url}/wp-json/jwt-auth/v1/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.token) {
        return {
          success: true,
          token: data.token,
          user: {
            id: data.user_email,
            name: data.user_display_name,
            email: data.user_email,
          },
        };
      }

      return { success: false, message: "Credenciales inválidas" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Error de conexión" };
    }
  },

  createOrder: async (
    data: OrderData,
  ): Promise<{ success: boolean; order?: Order; message?: string }> => {
    try {
      const response = await wcFetch(`/wp-json/wc/v3/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response) {
        return { success: false, message: "Server config unavailable" };
      }

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.message || "Error al crear la orden",
        };
      }

      return { success: true, order: responseData };
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, message: "Error de conexión con el servidor" };
    }
  },

  getCustomerOrders: async (customerId: number): Promise<Order[]> => {
    try {
      const response = await wcFetch(
        `/wp-json/wc/v3/orders?customer=${customerId}&orderby=date&order=desc`,
        { next: { revalidate: 60 } },
      );
      if (response?.ok) return await response.json();
    } catch (error) {
      console.error("Error fetching customer orders:", error);
    }
    return [];
  },

  getCouponByCode: async (code: string): Promise<Coupon | null> => {
    try {
      const response = await wcFetch(
        `/wp-json/wc/v3/coupons?code=${encodeURIComponent(code)}`,
        { next: { revalidate: 0 } },
      );
      if (response?.ok) {
        const data = await response.json();
        return data?.[0] ?? null;
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
    return null;
  },

  getCategoryIdBySlug: async (slug: string): Promise<number | null> => {
    try {
      // First try to fetch all categories and find by slug (better for performance if cached)
      // Or fetch specifically filtering by slug if API supports it, but standard WC API
      // usually requires fetching categories list.
      // Using 'slug' parameter for categories endpoint is supported.
      const response = await wcFetch(
        `/wp-json/wc/v3/products/categories?slug=${encodeURIComponent(slug)}`,
        { next: { revalidate: 3600 } },
      );

      if (response?.ok) {
        const categories: Category[] = await response.json();
        if (categories.length > 0) {
          return categories[0].id;
        }
      }
    } catch (error) {
      console.error(`Error fetching category ID for slug ${slug}:`, error);
    }
    return null;
  },
};

export default WooCommerceService;
