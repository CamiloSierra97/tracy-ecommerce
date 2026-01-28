"use client";

import Toast from "@/components/ui/Toast";
import { Product, Coupon } from "@/services/WooCommerceService";
import { createContext, useContext, useState, ReactNode } from "react";
import { useCartPersistence } from "@/hooks/useCartPersistence";
import {
  calculateCartCount,
  calculateCartTotal,
  calculateDiscount,
} from "@/utils/cartCalculations";

// Extender Product para incluir cantidad para CartItem
export interface CartItem extends Product {
  quantity: number;
  variation_id?: number;
  selected_attributes?: Record<string, string>; // { Size: "M", Color: "Red" }
}

interface CartContextType {
  isOpen: boolean;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    product: Product & {
      variation_id?: number;
      selected_attributes?: Record<string, string>;
    },
  ) => void;
  removeFromCart: (productId: number, variationId?: number) => void;
  updateQuantity: (
    productId: number,
    newQuantity: number,
    variationId?: number,
  ) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  coupon?: Coupon | null;
  discountTotal: number;
  grandTotal: number;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, setCartItems } = useCartPersistence([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  // Toast state could also be extracted to useToast if reused elsewhere
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (
    product: Product & {
      variation_id?: number;
      selected_attributes?: Record<string, string>;
    },
    callbacks?: { onAdd?: () => void },
  ) => {
    setCartItems((prevItems) => {
      // Identificar item único por ID de producto Y variación
      const existingItemIndex = prevItems.findIndex((item) => {
        const sameProduct = item.id === product.id;
        const sameVariation = item.variation_id === product.variation_id;
        return sameProduct && sameVariation;
      });

      if (existingItemIndex > -1) {
        // Actualizar cantidad si ya existe
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      }

      // Agregar nuevo item
      return [...prevItems, { ...product, quantity: 1 }];
    });

    setToastMessage(`¡${product.name} agregado a tu bolsa!`);
    setShowToast(true);
    if (callbacks?.onAdd) callbacks.onAdd();
  };

  const removeFromCart = (
    productId: number,
    variationId?: number,
    callbacks?: { onRemove?: () => void },
  ) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => {
        if (variationId !== undefined) {
          // Si se provee variationId, borrar coincidencia exacta
          return !(item.id === productId && item.variation_id === variationId);
        }
        // Fallback: borrar por product ID (comportamiento previo)
        return item.id !== productId;
      });
      if (callbacks?.onRemove) callbacks.onRemove();
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const updateQuantity = (
    productId: number,
    newQuantity: number,
    variationId?: number,
  ) => {
    if (newQuantity < 1) {
      removeFromCart(productId, variationId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const isMatch =
          item.id === productId &&
          (variationId === undefined || item.variation_id === variationId);

        return isMatch ? { ...item, quantity: newQuantity } : item;
      }),
    );
  };

  const cartCount = calculateCartCount(cartItems);
  const cartTotal = calculateCartTotal(cartItems);
  const discountTotal = calculateDiscount(cartTotal, coupon);
  const grandTotal = Math.max(0, cartTotal - discountTotal);

  const applyCoupon = async (code: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.success && data.coupon) {
        setCoupon(data.coupon);
        setToastMessage(
          `¡Cupón aplicado: -${
            data.coupon.discount_type === "percent"
              ? data.coupon.amount + "%"
              : "$" + data.coupon.amount
          }!`,
        );
        setShowToast(true);
        return true;
      }

      throw new Error(data.message);
    } catch (error: any) {
      console.error(error);
      setToastMessage(error.message || "Error al aplicar cupón");
      setShowToast(true);
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        cartItems,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        coupon,
        discountTotal,
        grandTotal,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
