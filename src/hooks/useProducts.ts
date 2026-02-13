import { useInfiniteQuery } from "@tanstack/react-query";
import WooCommerceService, {
  ProductsPage,
} from "@/services/WooCommerceService";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

// Definiendo el tipo de datos que se almacena en la caché de Tanstack Query
interface ProductsQueryResult {
  pages: ProductsPage[];
  pageParams: number[];
}

interface UseProductsOptions {
  initialData?: ProductsQueryResult;
  page?: number; // Página actual para la key
  categoryId?: number; // Filtro por ID de categoría
}

export const useProducts = (options?: UseProductsOptions) => {
  const page = options?.page || 1;
  const categoryId = options?.categoryId;

  return useInfiniteQuery<
    ProductsPage,
    Error,
    ProductsQueryResult,
    [_: string, _: number, _: number | undefined],
    number
  >({
    queryKey: ["products", page, categoryId], // Key includes categoryId
    queryFn: async ({ pageParam = page }: { pageParam: number }) => {
      // Retorna ProductsPage { products, totalPages }
      return await WooCommerceService.getProducts({
        page: pageParam,
        per_page: PRODUCTS_PER_PAGE,
        category: categoryId ? String(categoryId) : undefined,
      });
    },
    initialData: options?.initialData,
    // Lógica de paginación robusta basada en la cabecera
    getNextPageParam: (lastPage, allPages) => {
      const currentTotalPages = lastPage.totalPages;
      const nextPage = allPages.length + 1;

      // Retorna el número de la siguiente página solo si no hemos superado el total
      return nextPage <= currentTotalPages ? nextPage : undefined;
    },

    initialPageParam: page,
    // Evita reintentos infinitos
    retry: false,
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
};
