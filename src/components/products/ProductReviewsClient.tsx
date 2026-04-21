"use client";

import dynamic from "next/dynamic";
import type { Review } from "@/services/WooCommerceService";

const ProductReviews = dynamic(
  () => import("@/components/products/ProductReviews"),
  { ssr: false }
);

interface Props {
  reviews: Review[];
  productId: number;
  productName: string;
}

// Wrapper client component que permite usar ssr:false en ProductReviews
// desde una página Server Component (ssr:false solo funciona desde "use client")
export default function ProductReviewsClient(props: Props) {
  return <ProductReviews {...props} />;
}
