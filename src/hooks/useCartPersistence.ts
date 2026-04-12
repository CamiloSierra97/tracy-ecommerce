import { useState, useEffect } from "react";
import { CartItem } from "@/context/CartContext";

const STORAGE_KEY = "tracy_cart";

export function useCartPersistence(initialItems: CartItem[] = []) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    // Evitamos ejecutar esto en el servidor (Next.js SSR)
    if (typeof window === "undefined") return;

    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setTimeout(() => setCartItems(parsedCart), 0);
      } catch (error) {
        console.error("Error al analizar el carrito de localStorage", error);
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  return {
    cartItems,
    setCartItems,
    isLoaded,
  };
}
