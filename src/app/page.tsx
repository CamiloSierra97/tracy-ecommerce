import WooCommerceService from "@/services/WooCommerceService";
import HeroCarousel from "@/components/marketing/HeroCarousel";

import dynamic from "next/dynamic";
const Products = dynamic(() => import("@/components/product/Products"), {
  loading: () => <div className="min-h-screen"></div>,
});
const BrandManifesto = dynamic(
  () => import("@/components/marketing/BrandManifesto"),
);
const NewsletterSection = dynamic(
  () => import("@/components/marketing/NewsletterSection"),
);

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
        <section className="hero-section-wrapper">
          <HeroCarousel />
        </section>

        <BrandManifesto />

        <section className="page-products">
          <Products title="Nuestra Colección" basePath="/"></Products>
        </section>

        <NewsletterSection />
      </div>
    </HydrationBoundary>
  );
}
