import Products from "@/components/product/Products";
import { metadata } from "./layout";
import { roboto_serif } from "@/lib/fonts";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HeroSection from "@/components/layout/HeroSection";
import Image from "next/image";
import WooCommerceService from "@/services/WooCommerceService";

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch data on the server
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      // Direct server-side call to WooCommerce
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
    }
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="main">
        <section
          className={`hero-section flex ${roboto_serif.className} justify-center relative overflow-hidden `}
        >
          <div className="absolute inset-0 z-0 max-md:hidden">
            <Image
              src="/Patron.svg"
              alt="Background Pattern"
              fill
              priority
              className="object-cover blur-xs scale-110"
            />
          </div>
          <HeroSection></HeroSection>
        </section>
        <section>
          <Products title="Nuestra Colección" basePath="/"></Products>

        </section>
      </main>
    </HydrationBoundary>
  );
}
