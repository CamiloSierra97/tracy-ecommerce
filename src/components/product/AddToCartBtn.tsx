"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/services/WooCommerceService";
import Icon from "@/components/ui/Icon";

interface AddToCartBtnProps {
  product: Product;
}

export default function AddToCartBtn({ product }: AddToCartBtnProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);

    // Simular un pequeño retraso para mejor UX (o esperar la operación real del carrito si es asíncrona)
    await new Promise((resolve) => setTimeout(resolve, 500));

    addToCart(product);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="add-to-cart-btn btn-animate w-full bg-burgundy text-golden py-5 rounded-xl font-bold tracking-widest hover:bg-opacity-90 transition-colors flex items-center justify-center gap-3 shadow-premium text-lg uppercase font-secondary disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? (
        <span className="size-6 border-2 border-golden border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <>
          <Icon name="icon-bag" size={24} />
          Agregar al Carrito
        </>
      )}
    </button>
  );
}
