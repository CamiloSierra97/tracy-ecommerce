"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductsGrid from "./ProductsGrid";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductsPage, Category } from "@/services/WooCommerceService";

interface ProductsProps {
  title: string;
  basePath: string;
  initialData?: ProductsPage;
  headingLevel?: "h1" | "h2";
  categories?: Category[];
  initialPage?: number;
  categoryId?: number;
}

export default function Products({
  title,
  basePath,
  initialData,
  headingLevel = "h2",
  categories = [],
  initialPage = 1,
}: ProductsProps) {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || initialPage;

  // Use data passed from the Server Component
  const allProducts = initialData?.products ?? [];
  const totalPages = initialData?.totalPages ?? 1;
  const currentPage = pageFromUrl;

  const prevPageRef = useRef(pageFromUrl);
  // eslint-disable-next-line react-hooks/refs
  const direction = pageFromUrl > prevPageRef.current ? 1 : -1;

  useEffect(() => {
    prevPageRef.current = pageFromUrl;
  }, [pageFromUrl]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const HeadingTag = headingLevel;

  return (
    <article className="page-products" id="products-visual">
      <div className="page-products__content min-h-screen bg-transparent overflow-hidden">
        <div className="page-products__header flex flex-col items-center py-8 px-4">
          <HeadingTag className="page-products__title text-2xl lg:text-4xl font-serif font-semibold lg:font-bold text-burgundy text-center mb-3 tracking-wide drop-shadow-sm">
            {title}
          </HeadingTag>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="page-products__divider w-24 h-1 bg-golden rounded-full origin-center"
          ></motion.div>
        </div>

        <div className="page-products__grid-container relative overflow-hidden min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={pageFromUrl}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <ProductsGrid products={allProducts} categories={categories} />
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Paginación de productos"
            className="page-products__pagination py-6 flex justify-center space-x-2"
          >
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const pageLink = `${basePath}?page=${pageNum}`;
              const isActive = pageNum === currentPage;

              const baseClasses =
                "px-4 py-2 border rounded-lg text-sm transition page-products__pagination-link";

              const stateClasses = isActive
                ? "page-products__pagination-link--active bg-burdeos text-marfil font-bold border-burdeos"
                : "bg-white text-gray-700 hover:bg-gray-100";

              return (
                <Link
                  key={pageNum}
                  href={pageLink}
                  scroll={false}
                  className={`${baseClasses} ${stateClasses}`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </article>
  );
}
