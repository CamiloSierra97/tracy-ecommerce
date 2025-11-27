import { useInfiniteQuery } from "@tanstack/react-query";
import WooCommerceService, {
  ProductsPage,
} from "@/services/WooCommerceService";

// Definiendo el tipo de datos que se almacena en la caché de Tanstack Query
interface ProductsQueryResult {
  pages: ProductsPage[];
  pageParams: number[];
}

export const useProducts = () => {
  return useInfiniteQuery<
    ProductsPage,
    Error,
    ProductsQueryResult,
    [_: string],
    number
  >({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      // Retorna ProductsPage { products, totalPages }
      return await WooCommerceService.getProducts({
        page: pageParam,
        per_page: 12,
      });
    },

    // Lógica de paginación robusta basada en la cabecera
    getNextPageParam: (lastPage, allPages) => {
      const currentTotalPages = lastPage.totalPages;
      const nextPage = allPages.length + 1;

      // Retorna el número de la siguiente página solo si no hemos superado el total
      return nextPage <= currentTotalPages ? nextPage : undefined;
    },

    initialPageParam: 1,
    // Evita reintentos infinitos
    retry: false,
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
};
