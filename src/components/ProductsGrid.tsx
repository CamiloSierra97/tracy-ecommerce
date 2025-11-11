"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { WooProduct } from "@/types/WooProduct";

interface ProductsGridProps {
  products: WooProduct[];
  title?: string;
}

export default function ProductsGrid({ products, title }: ProductsGridProps) {
  if (!products.length)
    return (
      <div className="products-grid text-center py-10 text-tracy-gris-humo/60">
        No hay productos disponibles
      </div>
    );

  return (
    <section className="products-grid p-6">
      {title && (
        // H2 es correcto, ya que el H1 está en Products.tsx
        <h2 className="products-grid__title text-2xl font-serif font-semibold mb-6 text-tracy-burdeos">
          {title}
        </h2>
      )}

      <ul className="products-grid__list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((product, index) => (
            // 🛑 OPTIMIZACIÓN SEO 1: ENVOLVER LA TARJETA EN UN LINK RASTREABLE 🛑
            <li key={product.id} className="products-grid__item">
              <Link
                href={`/productos/${product.slug ?? product.id}`}
                className="products-grid__link block"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="products-grid__card border border-tracy-marfil rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow bg-white h-full"
                >
                  <Image
                    src={product.images?.[0]?.src ?? "/placeholder.jpg"}
                    alt={`${product.name} - Lencería TRACY: ${
                      product.short_description || "Modelo exclusivo"
                    }`}
                    width={400}
                    height={400}
                    className="products-grid__image rounded-t-lg w-full h-56 object-cover"
                  />
                  <div className="products-grid__details p-4">
                    <h3 className="products-grid__name text-lg font-serif font-semibold text-tracy-burdeos">
                      {product.name}
                    </h3>
                    <p className="products-grid__price text-xl text-tracy-dorado-claro font-bold mt-1">
                      ${product.price}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
