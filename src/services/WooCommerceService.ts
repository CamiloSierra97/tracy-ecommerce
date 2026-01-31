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
  variations: number[]; // IDs de las variaciones
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
  line_items: any[];
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

import config from "@/lib/config";

const WooCommerceService = {
  // Obtener variaciones de un producto
  getProductVariations: async (
    productId: number,
  ): Promise<ProductVariation[]> => {
    // SOLO LADO DEL SERVIDOR: Petición directa a WooCommerce
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );
          const response = await fetch(
            `${url}/wp-json/wc/v3/products/${productId}/variations`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 3600 },
            },
          );

          if (response.ok) {
            return await response.json();
          }
        } catch (error) {
          console.error(
            `Error al obtener variaciones del producto ${productId}:`,
            error,
          );
        }
      }
    }
    return [];
  },

  // Obtener categorías de productos
  getProductCategories: async (): Promise<Category[]> => {
    // SOLO LADO DEL SERVIDOR: Petición directa a WooCommerce
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );
          const response = await fetch(
            `${url}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true&orderby=name&order=asc`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 3600 }, // Cache 1 hora para categorías
            },
          );

          if (response.ok) {
            return await response.json();
          }
        } catch (error) {
          console.error("Error al obtener categorías de WooCommerce:", error);
        }
      }
    }
    // Fallback vacío en cliente
    return [];
  },
  getProductReviews: async (productId: number): Promise<Review[]> => {
    // SOLO LADO DEL SERVIDOR: Petición directa a WooCommerce
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );
          const response = await fetch(
            `${url}/wp-json/wc/v3/products/reviews?product=${productId}`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 60 },
            },
          );

          if (response.ok) {
            return await response.json();
          }
        } catch (error) {
          console.error("Error al obtener reseñas de WooCommerce:", error);
        }
      }
    }
    // Fallback del lado del cliente (si es necesario, aunque típicamente SSR para SEO)
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
            "base64",
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
            },
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
          console.error("Error al enviar reseña a WooCommerce:", error);
          return { success: false, message: "Error de conexión" };
        }
      }
    }
    return {
      success: false,
      message: "Configuración de servidor no disponible",
    };
  },

  getProducts: async ({
    page = 1,
    per_page = 12,
    category,
  }: {
    page?: number;
    per_page?: number;
    category?: string; // Slug de categoría para filtrar
  }): Promise<ProductsPage> => {
    // SOLO LADO DEL SERVIDOR: Petición directa a WooCommerce (Más rápido, corrige problemas de enrutamiento interno)
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );
          const params = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
          });

          // Agregar filtro de categoría si se proporciona
          if (category) {
            params.append("category", category);
          }

          const response = await fetch(
            `${url}/wp-json/wc/v3/products?${params.toString()}`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 60 }, // Opcional: Agregar caché para llamadas al servidor
            },
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
          console.error("Error en petición directa a WooCommerce:", error);
        }
      }
    }

    // LADO DEL CLIENTE (o fallback): Petición vía API Interna
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(per_page),
      });

      // Agregar filtro de categoría si se proporciona
      if (category) {
        params.append("category", category);
      }

      const response = await fetch(`/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Error obteniendo productos: ${response.statusText}`);
      }

      const data = await response.json();
      const totalPagesHeader = response.headers.get("x-wp-totalpages") || "0";

      return {
        products: data,
        totalPages: parseInt(totalPagesHeader, 10),
      };
    }

    return { products: [], totalPages: 0 };
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    // SOLO LADO DEL SERVIDOR: Petición directa a WooCommerce
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );
          const response = await fetch(
            `${url}/wp-json/wc/v3/products?slug=${slug}`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 60 },
            },
          );

          if (response.ok) {
            const data = await response.json();
            return data && data.length > 0 ? data[0] : null;
          }
        } catch (error) {
          console.error(
            "Error en petición directa a WooCommerce (Slug):",
            error,
          );
        }
      }
    }

    // LADO DEL CLIENTE (o fallback): Petición vía API Interna
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({ slug });
      const response = await fetch(`/api/products?${params.toString()}`);

      if (!response.ok) return null;

      const data = await response.json();
      return data && data.length > 0 ? data[0] : null;
    }

    return null;
  },

  registerCustomer: async (
    data: RegisterCustomerData,
  ): Promise<{
    success: boolean;
    message?: string;
    error?: string;
    customer?: any;
  }> => {
    // SOLO LADO DEL SERVIDOR
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
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
            console.error("Error de registro en WooCommerce:", responseData);

            // Tratamiento de errores y traducción
            let errorMessage =
              responseData.message || "Error al registrar usuario.";

            if (errorMessage.includes("An account is already registered")) {
              errorMessage =
                "Ya existe una cuenta registrada con este correo electrónico. Por favor, inicia sesión.";
            } else if (
              errorMessage.includes("Username is already registered")
            ) {
              errorMessage =
                "Este nombre de usuario ya está en uso. Por favor elige otro.";
            }

            return {
              success: false,
              message: errorMessage,
              error: errorMessage,
            };
          }

          return {
            success: true,
            message: "Cuenta creada exitosamente. Por favor inicia sesión.",
            customer: responseData,
          };
        } catch (error) {
          console.error("Excepción en registro:", error);
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
      error: "Falta configuración del servidor",
    };
  },

  getCustomerByEmail: async (email: string): Promise<any | null> => {
    // SOLO LADO DEL SERVIDOR
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );
          const endpoint = `${url.replace(
            /\/$/,
            "",
          )}/wp-json/wc/v3/customers?email=${email}`;
          console.log(
            "[WooCommerceService] Checking customer:",
            endpoint.split("?")[0],
          ); // Log de URL base para depuración

          const response = await fetch(endpoint, {
            headers: { Authorization: `Basic ${auth}` },
            next: { revalidate: 0 },
          });

          if (response.ok) {
            const data = await response.json();
            return data && data.length > 0 ? data[0] : null;
          }
        } catch (error) {
          console.error("Error al buscar cliente por email:", error);
        }
      }
    }
    return null;
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
          // Nota: El plugin JWT Auth típicamente requiere username/email y password
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
                id: data.user_email, // Usando email como ID o podría usar data.user_id si está disponible y es consistente
                name: data.user_display_name,
                email: data.user_email,
                // image: data.user_avatar // Agregar si está disponible
              },
            };
          }

          console.error("Fallo de Autenticación WP:", data);
          return {
            success: false,
            message: "Credenciales inválidas",
          };
        } catch (error) {
          console.error("Excepción de Inicio de Sesión:", error);
          return {
            success: false,
            message: "Error de conexión",
          };
        }
      }
    }
    return { success: false, message: "Falta configuración del servidor" };
  },

  createOrder: async (
    data: OrderData,
  ): Promise<{ success: boolean; order?: Order; message?: string }> => {
    // SOLO LADO DEL SERVIDOR
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );

          const response = await fetch(`${url}/wp-json/wc/v3/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${auth}`,
            },
            body: JSON.stringify(data),
          });

          const responseData = await response.json();

          if (!response.ok) {
            console.error("Error creando orden:", responseData);
            return {
              success: false,
              message: responseData.message || "Error al crear la orden",
            };
          }

          return {
            success: true,
            order: responseData,
          };
        } catch (error) {
          console.error("Excepción creando orden:", error);
          return {
            success: false,
            message: "Error de conexión con el servidor",
          };
        }
      }
    }
    return {
      success: false,
      message: "Configuración del servidor no disponible",
    };
  },

  getCustomerOrders: async (customerId: number): Promise<Order[]> => {
    // SOLO LADO DEL SERVIDOR
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );

          // Obtener órdenes del cliente ordenadas por fecha descendente
          const response = await fetch(
            `${url}/wp-json/wc/v3/orders?customer=${customerId}&orderby=date&order=desc`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 60 }, // Cache breve para órdenes
            },
          );

          if (response.ok) {
            return await response.json();
          }
        } catch (error) {
          console.error("Error al obtener órdenes del cliente:", error);
        }
      }
    }
    return [];
  },

  getCouponByCode: async (code: string): Promise<Coupon | null> => {
    // SOLO LADO DEL SERVIDOR
    if (typeof window === "undefined") {
      const { url, consumerKey, consumerSecret } = config.woocommerce;
      if (url && consumerKey && consumerSecret) {
        try {
          const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
            "base64",
          );
          const response = await fetch(
            `${url}/wp-json/wc/v3/coupons?code=${code}`,
            {
              headers: { Authorization: `Basic ${auth}` },
              next: { revalidate: 0 }, // No caché para códigos
            },
          );

          if (response.ok) {
            const data = await response.json();
            return data && data.length > 0 ? data[0] : null;
          }
        } catch (error) {
          console.error("Error buscando cupón:", error);
        }
      }
    }
    return null;
  },
};

export default WooCommerceService;
