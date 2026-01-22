"use client";

import ProductVariantSelector from "./ProductVariantSelector";
import AddToCartBtn from "./AddToCartBtn";
import { useState } from "react";
import { Product, ProductVariation } from "@/services/WooCommerceService";

interface ProductInteractionProps {
  product: Product;
  variations: ProductVariation[];
}

export default function ProductInteraction({
  product,
  variations,
}: ProductInteractionProps) {
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const handleVariationSelected = (variation: ProductVariation | null) => {
    setSelectedVariation(variation);

    // Disparar evento para actualizar precio
    if (variation) {
      window.dispatchEvent(
        new CustomEvent("product:price-update", {
          detail: { price: variation.price },
        })
      );
    } else {
      // Revertir a precio base del producto
      window.dispatchEvent(
        new CustomEvent("product:price-update", {
          detail: { price: product.price },
        })
      );
    }
  };

  const isVariableProduct = product.type === "variable";
  const hasAttributes =
    product.attributes && product.attributes.some((attr) => attr.variation);

  // Determinar si el botón debe estar deshabilitado
  // Si es variable, debe tener una variación seleccionada
  const isButtonDisabled =
    isVariableProduct &&
    (!selectedVariation || Object.keys(selectedAttributes).length === 0);

  return (
    <div className="product-interaction flex flex-col gap-6 border-t border-gray-100 pt-8">
      {/* Selector de Variaciones (solo si es producto variable) */}
      {isVariableProduct && hasAttributes && (
        <ProductVariantSelector
          product={product}
          variations={variations}
          onVariationSelected={handleVariationSelected}
          onAttributesChanged={setSelectedAttributes}
        />
      )}

      {/* Botón de Compra */}
      <AddToCartBtn
        product={product}
        selectedVariation={selectedVariation}
        selectedAttributes={selectedAttributes}
        disabled={isButtonDisabled}
      />
    </div>
  );
}
