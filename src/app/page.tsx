import WooCommerceService from "@/services/WooCommerceService";
import HeroCarousel from "@/components/shared/marketing/HeroCarousel";
import FeaturedProducts from "@/components/shared/marketing/FeaturedProducts";
import dynamic from "next/dynamic";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

const Products = dynamic(() => import("@/components/products/Products"), {
  loading: () => <div className="min-h-screen"></div>,
});
const BrandManifesto = dynamic(
  () => import("@/components/shared/marketing/BrandManifesto"),
);
const NewsletterSection = dynamic(
  () => import("@/components/shared/marketing/NewsletterSection"),
);

export default async function Page() {
  // Fetch initial data on the server
  let initialData;
  try {
    initialData = await WooCommerceService.getProducts({
      page: 1,
      per_page: PRODUCTS_PER_PAGE,
    });
  } catch (error) {
    console.error("Failed to fetch home products:", error);
  }

  return (
    <div className="home-page">
      <section className="hero-section-wrapper">
        <HeroCarousel />
      </section>

      <FeaturedProducts />

      <BrandManifesto />

      <section className="page-products">
        <Products 
          title="Nuestra Colección" 
          basePath="/" 
          initialData={initialData}
          initialPage={1}
        />
      </section>

      <NewsletterSection />
    </div>
  );
}
