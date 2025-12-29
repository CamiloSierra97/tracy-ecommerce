export interface Product {
  id: number;
  name: string;
  price: string;
  short_description: string;
  slug: string;
  description?: string;
  images?: { id: number; src: string; name: string }[];
  status?: string;
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
}

import config from "@/lib/config";

const WooCommerceService = {
  getProductReviews: async (productId: number): Promise<Review[]> => {
    // SERVER-SIDE: Direct Fetch to WooCommerce
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64"
          );
          const response = await fetch(
            `${url}/wp-json/wc/v3/products/reviews?product=${productId}`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 60 },
            }
          );

          if (response.ok) {
            return await response.json();
          }
        } catch (error) {
          console.error("WooCommerce Reviews Fetch Error:", error);
        }
      }
    }
    // Client-side fallback (if needed, though typically SSR for SEO)
    return [];
  },

  createProductReview: async (data: {
    product_id: number;
    review: string;
    reviewer: string;
    reviewer_email: string;
    rating: number;
  }): Promise<{ success: boolean; message?: string }> => {
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64"
          );

          const response = await fetch(
            `${url}/wp-json/wc/v3/products/reviews`,
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (response.ok) {
            return { success: true };
          } else {
            const errorData = await response.json();
            return {
              success: false,
              message: errorData.message || "Error al enviar la reseña",
            };
          }
        } catch (error) {
          console.error("WooCommerce Review Submission Error:", error);
          return { success: false, message: "Error de conexión" };
        }
      }
    }
    return {
      success: false,
      message: "Configuración de servidor no disponible",
    };
  },

  getProducts: async ({ page = 1, per_page = 12 }): Promise<ProductsPage> => {
    // SERVER-SIDE: Direct Fetch to WooCommerce (Faster, fixes internal routing issues)
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64"
          );
          const params = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
          });

          const response = await fetch(
            `${url}/wp-json/wc/v3/products?${params.toString()}`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 60 }, // Optional: Add caching for server calls
            }
          );

          if (response.ok) {
            const data = await response.json();
            const totalPagesHeader =
              response.headers.get("x-wp-totalpages") || "0";
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
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64"
          );
          const response = await fetch(
            `${url}/wp-json/wc/v3/products?slug=${slug}`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 60 },
            }
          );

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
  },

  registerCustomer: async (
    data: RegisterCustomerData
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    // SERVER-SIDE ONLY
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64"
          );

          const response = await fetch(`${url}/wp-json/wc/v3/customers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify(data),
          });

          const responseData = await response.json();

          if (!response.ok) {
            console.error("WooCommerce Registration Error:", responseData);
            return {
              success: false,
              message: responseData.message || "Error al registrar usuario.",
              error: responseData.message, // Map for compatibility if needed
            };
          }

          return {
            success: true,
            message: "Cuenta creada exitosamente. Por favor inicia sesión.",
          };
        } catch (error) {
          console.error("Registration Exception:", error);
          return {
            success: false,
            message: "Error de conexión con el servidor.",
            error: "Error de conexión con el servidor.",
          };
        }
      }
    }
    return {
      success: false,
      message: "Configuración de servidor no disponible",
      error: "Server configuration missing",
    };
  },

  loginCustomer: async (credentials: {
    email: string;
    password: string;
  }): Promise<{
    success: boolean;
    user?: { id: string; name: string; email: string; image?: string };
    message?: string;
  }> => {
    if (typeof window === "undefined") {
      const { url } = config.woocommerce;
      if (url) {
        try {
          // Note: JWT Auth plugin typically requires username/email and password
          const res = await fetch(`${url}/wp-json/jwt-auth/v1/token`, {
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
              user: {
                id: data.user_email, // Using email as ID or could use data.user_id if available and consistent
                name: data.user_display_name,
                email: data.user_email,
                // image: data.user_avatar // Add if available
              },
            };
          }

          console.error("WP Auth Failed:", data);
          return {
            success: false,
            message: "Credenciales inválidas",
          };
        } catch (error) {
          console.error("Login Exception:", error);
          return {
            success: false,
            message: "Error de conexión",
          };
        }
      }
    }
    return { success: false, message: "Server configuration missing" };
  },
};

export default WooCommerceService;
