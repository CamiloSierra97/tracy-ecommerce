import { Coupon } from "@/services/WooCommerceService";
import { CartItem } from "@/context/CartContext";

/**
 * Calcula el total del carrito sumando precio * cantidad de cada item.
 * Asume que el precio viene como string y lo convierte a entero.
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce(
    (total, item) => total + (parseInt(item.price) || 0) * item.quantity,
    0,
  );
};

/**
 * Calcula la cantidad total de items en el carrito.
 */
export const calculateCartCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Calcula el descuento total basado en el cupón aplicado y el total del carrito.
 */
export const calculateDiscount = (
  cartTotal: number,
  coupon: Coupon | null,
): number => {
  if (!coupon) return 0;

  // Validar monto mínimo
  if (coupon.minimum_amount && cartTotal < parseFloat(coupon.minimum_amount)) {
    return 0; // Deshabilitar si no cumple mínimo
  }

  const amount = parseFloat(coupon.amount);

  if (coupon.discount_type === "percent") {
    return (cartTotal * amount) / 100;
  }

  if (coupon.discount_type === "fixed_cart") {
    // El descuento fijo no puede ser mayor al total del carrito
    return Math.min(amount, cartTotal);
  }

  return 0;
};
