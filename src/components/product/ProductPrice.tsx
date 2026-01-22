"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils/currency";

interface ProductPriceProps {
  basePrice: string;
  className?: string;
}

export default function ProductPrice({
  basePrice,
  className = "text-2xl md:text-3xl font-bold text-gray-900 mb-8 font-secondary",
}: ProductPriceProps) {
  const [currentPrice, setCurrentPrice] = useState(basePrice);

  // Escuchar evento personalizado de cambio de precio
  useEffect(() => {
    const handlePriceUpdate = (e: CustomEvent<{ price: string }>) => {
      setCurrentPrice(e.detail.price);
    };

    // Cast necesario para TypeScript con CustomEvent en window
    window.addEventListener(
      "product:price-update",
      handlePriceUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "product:price-update",
        handlePriceUpdate as EventListener
      );
    };
  }, []);

  return (
    <div className={`product-price transition-all duration-300 ${className}`}>
      {formatPrice(currentPrice)}
    </div>
  );
}
