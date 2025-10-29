import { useInfiniteQuery } from "@tanstack/react-query";
import WooCommerceService from "@/services/WooCommerceService";
import type { WooProduct } from "@/types/WooProduct";

export const useProducts = () => {
  return useInfiniteQuery<
    WooProduct[],
    Error,
    { pages: WooProduct[][]; pageParams: number[] },
    [_: string],
    number
  >({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const products = await WooCommerceService.getProducts({
        page: pageParam,
        per_page: 12,
      });
      return products as WooProduct[];
    },

    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 12 ? allPages.length + 1 : undefined,

    initialPageParam: 1,
  });
};
