/**
 * Utilidades para filtrado y ordenamiento de productos
 */

import { Product } from "@/services/WooCommerceService";

export type SortOption = "date" | "price_asc" | "price_desc";

interface FilterOptions {
  searchTerm?: string;
  sortBy?: SortOption;
}

/**
 * Filtra productos por término de búsqueda
 * @param products - Array de productos
 * @param searchTerm - Término de búsqueda
 * @returns Productos filtrados
 */
function filterBySearch(products: Product[], searchTerm: string): Product[] {
  if (!searchTerm) return products;

  const term = searchTerm.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      (product.short_description &&
        product.short_description.toLowerCase().includes(term)),
  );
}

/**
 * Ordena productos según la opción especificada
 * @param products - Array de productos
 * @param sortBy - Opción de ordenamiento
 * @returns Productos ordenados
 */
function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price_asc":
      return sorted.sort(
        (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0),
      );
    case "price_desc":
      return sorted.sort(
        (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0),
      );
    case "date":
    default:
      return sorted; // Mantener orden original (por fecha)
  }
}

/**
 * Filtra y ordena productos según las opciones proporcionadas
 * @param products - Array de productos
 * @param options - Opciones de filtrado y ordenamiento
 * @returns Productos filtrados y ordenados
 */
export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions = {},
): Product[] {
  const { searchTerm = "", sortBy = "date" } = options;

  // 1. Filtrar por búsqueda
  let filtered = filterBySearch(products, searchTerm);

  // 2. Ordenar
  filtered = sortProducts(filtered, sortBy);

  return filtered;
}
