"use client";

import { useState, useEffect } from "react";
import { Product, ProductVariation } from "@/services/WooCommerceService";

interface ProductVariantSelectorProps {
  product: Product;
  variations: ProductVariation[];
  onVariationSelected: (variation: ProductVariation | null) => void;
  onAttributesChanged: (attributes: Record<string, string>) => void;
}

export default function ProductVariantSelector({
  product,
  variations,
  onVariationSelected,
  onAttributesChanged,
}: ProductVariantSelectorProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  // Identificar atributos únicos del producto
  const productAttributes =
    product.attributes?.filter((attr) => attr.variation && attr.visible) || [];

  useEffect(() => {
    // Verificar si la combinación actual coincide con alguna variación
    if (
      Object.keys(selectedAttributes).length === productAttributes.length &&
      productAttributes.length > 0
    ) {
      const match = variations.find((variation) => {
        return variation.attributes.every((varAttr) => {
          // Si variation.attribute no tiene opción definida (any), coincide siempre
          if (!varAttr.option) return true;
          return selectedAttributes[varAttr.name] === varAttr.option;
        });
      });

      onVariationSelected(match || null);
    } else {
      onVariationSelected(null);
    }

    onAttributesChanged(selectedAttributes);
  }, [
    selectedAttributes,
    variations,
    productAttributes.length,
    onVariationSelected,
    onAttributesChanged,
  ]);

  const handleSelect = (attributeName: string, option: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: option,
    }));
  };

  if (productAttributes.length === 0) return null;

  return (
    <div className="product-variant-selector space-y-6 pt-6 border-t border-gray-100">
      {productAttributes.map((attribute) => (
        <div key={attribute.id} className="attribute-group">
          <h3 className="attribute-label text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
            {attribute.name}:{" "}
            <span className="text-gray-500 font-normal normal-case">
              {selectedAttributes[attribute.name] || "Selecciona una opción"}
            </span>
          </h3>
          <div
            className="attribute-options flex flex-wrap gap-2"
            role="radiogroup"
            aria-label={`Seleccionar ${attribute.name}`}
          >
            {attribute.options.map((option) => {
              const isActive = selectedAttributes[attribute.name] === option;

              // Lógica simple de "Color" para mostrar swatch si el nombre es Color
              const isColor = attribute.name.toLowerCase() === "color";

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(attribute.name, option)}
                  className={`
                    relative transition-all duration-200
                    ${
                      isColor
                        ? "size-8 rounded-full border-2 focus:ring-2 focus:ring-offset-2 focus:ring-gold"
                        : "px-4 py-2 border rounded-md text-sm font-medium focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    }
                    ${
                      isActive
                        ? isColor
                          ? "border-gold ring-1 ring-gold ring-offset-1"
                          : "border-gold bg-gold/10 text-burgundy"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
                    }
                  `}
                  title={option}
                  aria-label={`Seleccionar ${attribute.name} ${option}`}
                  aria-checked={isActive}
                  role="radio"
                >
                  {isColor ? (
                    <span
                      className="absolute inset-0.5 rounded-full"
                      style={{ backgroundColor: getColorHex(option) }}
                    />
                  ) : (
                    option
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper simple para colores comunes (expandir según catálogo real)
function getColorHex(colorName: string): string {
  const map: Record<string, string> = {
    Negro: "#000000",
    Blanco: "#FFFFFF",
    Rojo: "#EF4444",
    Azul: "#3B82F6",
    Verde: "#10B981",
    Rosa: "#EC4899",
    Beige: "#F5F5DC",
    Marfil: "#FFFFF0",
    Vino: "#722F37",
    Nude: "#E3BC9A",
  };
  return map[colorName] || "#CCCCCC"; // Default gris
}
