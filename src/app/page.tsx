import Image from "next/image";
import WooCommerceService from "@/services/WooCommerceService";
import HeroSection from "@/components/layout/HeroSection";

import dynamic from "next/dynamic";
const Products = dynamic(() => import("@/components/product/Products"), {
  loading: () => <div className="min-h-screen"></div>,
});

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();

  // Pre-cargar datos en el servidor
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      // Llamada directa del lado del servidor a WooCommerce
      return await WooCommerceService.getProducts({
        page: pageParam as number,
        per_page: 12,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages: any) => {
      const currentTotalPages = lastPage.totalPages;
      const nextPage = allPages.length + 1;
      return nextPage <= currentTotalPages ? nextPage : undefined;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="home-page">
        <section
          className={`hero-section flex font-roboto-serif justify-center relative overflow-hidden `}
        >
          <div className="hero-section__patron absolute inset-0 z-0 max-md:hidden blur-xs scale-110">
            <Image
              src="/Patron.svg"
              alt=""
              fill
              priority
              {...({ fetchPriority: "high" } as any)}
              className="hero-section__patron__image object-cover object-center"
              sizes="100vw"
            />
          </div>
          <HeroSection></HeroSection>
        </section>
        <section className="page-products">
          <Products title="Nuestra Colección" basePath="/"></Products>
        </section>
      </div>
    </HydrationBoundary>
  );
}
