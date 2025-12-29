/**
 * Formatear un precio (cadena/número) al formato de Peso Colombiano
 * @param price - El precio como cadena o número
 * @returns Cadena de precio formateada (e.g., "$ 50.000")
 */
export const formatPrice = (price: number | string): string => {
  const value = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(value)) {
    return "$ 0";
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
