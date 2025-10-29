"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { WooProduct } from "@/types/WooProduct";

interface ProductsGridProps {
  products: WooProduct[];
  title?: string;
}

export default function ProductsGrid({ products, title }: ProductsGridProps) {
  if (!products.length)
    return (
      <div className="text-center py-10 text-gray-400">
        No hay productos disponibles
      </div>
    );

  return (
    <section className="p-6">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
            >
              <Image
                src={product.images?.[0]?.src ?? "/placeholder.jpg"}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-t-2xl w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-pink-600 font-medium mt-1">
                  ${product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
