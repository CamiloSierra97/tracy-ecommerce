"use client";

import Icon from "@/components/shared/ui/Icon";
import { Product } from "@/services/WooCommerceService";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartBtnProps {
  product: Product;
  selectedVariation?: {
    id: number;
    price: string;
    stock_status: string;
  } | null;
  selectedAttributes?: Record<string, string>;
  disabled?: boolean;
}

export default function AddToCartBtn({
  product,
  selectedVariation,
  selectedAttributes,
  disabled = false,
}: AddToCartBtnProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading || disabled) return;
    setIsLoading(true);

    // Simular retraso UI
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Construir objeto de producto a agregar
    const productToAdd = {
      ...product,
      // Si hay variación, sobrescribir precio y ID
      // Nota: mantenemos el ID padre para referencia, pero añadimos variation_id
      price: selectedVariation ? selectedVariation.price : product.price,
      variation_id: selectedVariation?.id,
      selected_attributes: selectedAttributes,
    };

    addToCart(productToAdd);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || disabled}
      className={`add-to-cart-btn btn-animate w-full py-5 rounded-xl font-bold tracking-widest transition-all flex items-center justify-center gap-3 shadow-premium text-lg uppercase font-secondary
        ${
          disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            : "bg-burgundy text-golden hover:bg-opacity-90 hover:scale-[1.02]"
        }
      `}
    >
      {isLoading ? (
        <span className="size-6 border-2 border-golden border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <>
          <Icon name="icon-bag" size={24} />
          {disabled ? "Selecciona opciones" : "Agregar al Carrito"}
        </>
      )}
    </button>
  );
}
