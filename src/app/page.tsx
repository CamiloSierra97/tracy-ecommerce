import WooCommerceService, {
  ProductsPage,
} from "@/services/WooCommerceService";
import HeroCarousel from "@/components/marketing/HeroCarousel";
import FeaturedProducts from "@/components/marketing/FeaturedProducts";

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

import { PRODUCTS_PER_PAGE } from "@/utils/constants";

// ...

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products", 1, undefined],
    queryFn: async ({ pageParam = 1 }) => {
      return await WooCommerceService.getProducts({
        page: pageParam as number,
        per_page: PRODUCTS_PER_PAGE,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ProductsPage, allPages: ProductsPage[]) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="home-page">
        <section className="hero-section-wrapper">
          <HeroCarousel />
        </section>

        <FeaturedProducts />

        <BrandManifesto />

        <section className="page-products">
          <Products title="Nuestra Colección" basePath="/"></Products>
        </section>

        <NewsletterSection />
      </div>
    </HydrationBoundary>
  );
}
