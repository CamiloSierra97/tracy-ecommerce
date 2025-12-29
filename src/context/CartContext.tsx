"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/services/WooCommerceService";
import Toast from "@/components/ui/Toast";

// Extender Product para incluir cantidad para CartItem
export interface CartItem extends Product {
  quantity: number;
}
interface CartContextType {
  isOpen: boolean;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const savedCart = localStorage.getItem("tracy_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error al analizar el carrito de localStorage", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tracy_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    setToastMessage(`¡${product.name} agregado a tu bolsa!`);
    setShowToast(true);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + (parseInt(item.price) || 0) * item.quantity,
    0
  );

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
