"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "@/services/WooCommerceService";
import Icon from "@/components/ui/Icon";
import { useCart } from "@/context/CartContext";

interface ProductsGridProps {
    products: Product[];
    title?: string;
}

export default function ProductsGrid({ products, title }: ProductsGridProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (!products.length)
        return (
            <div className="products-grid text-center py-10 text-tracy-gris-humo/60">
                No hay productos disponibles
            </div>
        );

    return (
        <section className="products-grid p-6">
            {title && (
                <h2 className="products-grid__title text-2xl font-serif font-semibold mb-6 text-tracy-burdeos">
                    {title}
                </h2>
            )}

            <ul className="products-grid__list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            priority={index < 4}
                            onOpenQuickView={() => setSelectedProduct(product)}
                        />
                    ))}
                </AnimatePresence>
            </ul>

            {/* Quick View Modal - Rendered outside grid to avoid layout issues */}
            <QuickViewModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
}

function ProductCard({ product, priority = false, onOpenQuickView }: { product: Product; priority?: boolean; onOpenQuickView: () => void }) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const { addToCart } = useCart();

    return (
        <li className="group relative">
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col relative"
            >
                {/* Image Area */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-xl">
                    <Link href={`/productos/${product.slug ?? product.id}`} className="block w-full h-full relative">
                        {/* Skeleton Loader */}
                        {isImageLoading && (
                            <div className="absolute inset-0 z-10 bg-gray-200 animate-pulse" />
                        )}
                        {/* Main Image */}
                        <Image
                            src={product.images?.[0]?.src ?? "/placeholder.jpg"}
                            alt={product.name}
                            width={500}
                            height={667}
                            priority={priority}
                            onLoad={() => setIsImageLoading(false)}
                            className={`w-full h-full object-cover transform transition-transform duration-700 ease-out ${isImageLoading ? "opacity-0" : "opacity-100"
                                }`}
                        />

                        {/* Secondary Image (Hover Effect) */}
                        {product.images?.[1] && (
                            <Image
                                src={product.images[1].src}
                                alt={`${product.name} - Vista alternativa`}
                                width={500}
                                height={667}
                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10"
                            />
                        )}

                        {/* Dark Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    </Link>

                    {/* Hover Zoom Button - Top Right Corner */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onOpenQuickView();
                            }}
                            className="cursor-pointer bg-white/95 backdrop-blur-sm text-tracy-burdeos p-3 rounded-full shadow-lg hover:bg-tracy-burdeos hover:text-white transition-colors duration-300 hover:scale-110 transform"
                            aria-label="Vista rápida"
                            type="button"
                        >
                            <Icon name="icon-zoom" size={20} />
                        </button>
                    </div>

                    {/* Hover Add to Cart Button - Top Right Corner (Below Zoom) */}
                    <div className="absolute top-16 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 delay-75">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="cursor-pointer bg-white/95 backdrop-blur-sm text-tracy-burdeos p-3 rounded-full shadow-lg hover:bg-tracy-burdeos hover:text-white transition-colors duration-300 hover:scale-110 transform"
                            aria-label="Agregar al carrito"
                            type="button"
                        >
                            <Icon name="icon-bag" size={20} />
                        </button>
                    </div>

                    {/* Ver Detalles Button - Bottom */}
                    <Link href={`/productos/${product.slug ?? product.id}`} className="absolute bottom-4 left-0 right-0 z-20 pointer-events-none px-4">
                        <div className="flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                            <span className="w-full bg-white/95 backdrop-blur-sm text-tracy-burdeos font-medium py-3 px-6 rounded-xl shadow-lg text-center text-sm tracking-wide hover:bg-white transform active:scale-95 transition-all">
                                Ver Detalles
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Product Info */}
                <div className="mt-4 px-1 space-y-1">
                    <Link href={`/productos/${product.slug ?? product.id}`} className="block">
                        <h3 className="text-base font-serif font-medium text-gray-900 leading-snug group-hover:text-tracy-burdeos transition-colors">
                            {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-tracy-burdeos tracking-wide">
                                ${new Intl.NumberFormat('es-CO').format(parseInt(product.price) || 0)}
                            </p>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </li>
    );
}

function QuickViewModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
    const [zoomStyle, setZoomStyle] = useState({ scale: 1, origin: "50% 50%" });
    const { addToCart } = useCart();

    // Lock both body and html scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            // Optional: for iOS/mobile to prevent rubberbanding
            // document.body.style.position = "fixed"; 
            // but this resets scroll position, so stick to overflow hidden for now
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyle(prev => ({ ...prev, origin: `${x}% ${y}%` }));
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        // Prevent event from bubbling up to document
        e.stopPropagation();

        // We can't preventDefault() on passive listeners like 'wheel' easily in React synthetic events
        // without some hacks, but stopPropagation + the body overflow:hidden above should do it.

        const delta = -Math.sign(e.deltaY) * 0.5; // Zoom step
        setZoomStyle(prev => ({
            ...prev,
            scale: Math.min(Math.max(1, prev.scale + delta), 5) // Clamp between 1x and 5x
        }));
    };

    const handleMouseLeave = () => {
        setZoomStyle({ scale: 1, origin: "50% 50%" });
    };

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-contain">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative bg-white p-2 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 bg-white/50 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        {/* Zoomable Image Container */}
                        <div
                            className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden cursor-crosshair bg-gray-50"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onWheel={handleWheel}
                        >
                            <motion.div
                                className="w-full h-full relative"
                                animate={{
                                    scale: zoomStyle.scale,
                                    transformOrigin: zoomStyle.origin
                                }}
                                transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
                            >
                                <Image
                                    src={product.images?.[0]?.src ?? "/placeholder.jpg"}
                                    alt={product.name}
                                    fill
                                    className="object-contain pointer-events-none"
                                    quality={100}
                                    priority
                                />
                            </motion.div>
                        </div>

                        <div className="p-4 text-center z-10 bg-white relative flex flex-col items-center">
                            <h3 className="text-xl font-serif text-gray-900">{product.name}</h3>
                            <p className="text-lg font-bold text-tracy-burdeos mt-2">
                                ${new Intl.NumberFormat('es-CO').format(parseInt(product.price) || 0)}
                            </p>

                            <div className="mt-6 w-full max-w-[280px] space-y-3">
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        onClose();
                                    }}
                                    className="w-full bg-tracy-burdeos text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Icon name="icon-bag" size={18} className="text-white" />
                                    Agregar a la Bolsa
                                </button>
                                <Link
                                    href={`/productos/${product.slug ?? product.id}`}
                                    className="block text-gray-500 text-sm hover:text-tracy-burdeos underline transition-colors"
                                >
                                    Ver Detalles Completos
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
