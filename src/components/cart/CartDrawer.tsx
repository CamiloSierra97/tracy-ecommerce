"use client";
// Componente del cajón del carrito que muestra los productos seleccionados

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/utils/currency";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/shared/ui/Icon";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  // Bloquear el scroll del body y html cuando el carrito está abierto
  const originalBodyOverflow = useRef<string>("");
  const originalHtmlOverflow = useRef<string>("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isOpen) {
      // Guardar valores originales
      originalBodyOverflow.current = document.body.style.overflow;
      originalHtmlOverflow.current = document.documentElement.style.overflow;
      // Aplicar bloqueo
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Enfocar botón cerrar
      closeButtonRef.current?.focus();
      // Ocultar contenido principal para lectores de pantalla
      const main = document.getElementById("main-content");
      if (main) main.setAttribute("aria-hidden", "true");
    } else {
      // Restaurar overflow
      document.body.style.overflow = originalBodyOverflow.current;
      document.documentElement.style.overflow = originalHtmlOverflow.current;
      // Mostrar contenido principal
      const main = document.getElementById("main-content");
      if (main) main.removeAttribute("aria-hidden");
    }
    return () => {
      // Restaurar valores originales al desmontar
      document.body.style.overflow = originalBodyOverflow.current;
      document.documentElement.style.overflow = originalHtmlOverflow.current;
      const main = document.getElementById("main-content");
      if (main) main.removeAttribute("aria-hidden");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="cart-drawer__overlay fixed inset-0 glassmorphism z-50"
            aria-hidden={isOpen ? "true" : "false"}
          />

          {/* Panel Lateral (Drawer) */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="cart-drawer__panel fixed top-0 right-0 h-full w-full max-w-xl bg-ivory shadow-premium z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            aria-describedby="cart-drawer-description"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeCart();
            }}
            tabIndex={-1}
          >
            {/* Encabezado del Carrito */}
            <div className="cart-drawer__header p-8 flex items-center justify-between border-b border-burgundy/15 bg-ivory">
              <h2
                id="cart-drawer-title"
                className="cart-drawer__title text-3xl font-serif text-burgundy tracking-tight"
              >
                Tu Bolsa
              </h2>
              <button
                ref={closeButtonRef}
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="cart-drawer__close-btn p-2 hover:bg-burgundy/5 rounded-full transition-colors text-gray-400 hover:text-burgundy hover:rotate-90 duration-300"
              >
                <Icon name="icon-close" size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="cart-drawer__items-list flex-1 overflow-y-auto p-6 space-y-6 relative">
              {cartItems.length === 0 ? (
                <div className="cart-drawer__empty-state h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div
                    className="cart-drawer__empty-icon size-16 bg-gray-50 rounded-full flex items-center justify-center text-black/10"
                    aria-hidden="true"
                  >
                    <Icon name="icon-bag" size={32} />
                  </div>
                  <p className="cart-drawer__empty-text text-black text-lg">
                    Tu bolsa está vacía
                  </p>
                  <button
                    onClick={closeCart}
                    className="cart-drawer__continue-btn text-black font-medium hover:underline"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item group flex gap-5 py-2"
                  >
                    <div className="cart-item__image-container relative w-24 aspect-3/4 rounded-sm overflow-hidden shrink-0 shadow-sm border border-gray-100">
                      <Image
                        src={item.images?.[0]?.src ?? "/placeholder-v3.png"}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="cart-item__image object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="cart-item__details flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="cart-item__name text-sm font-serif text-gray-900 leading-snug line-clamp-2 pr-4">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Eliminar ${item.name}`}
                            className="cart-item__remove-btn text-gray-400 hover:text-burgundy transition-colors p-1 -mt-1 -mr-1"
                          >
                            <Icon
                              name="icon-trash"
                              size={16}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <p className="cart-item__price text-burgundy font-medium text-sm mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div
                          className="cart-item__quantity-selector inline-flex items-center border border-gray-200 rounded-full px-2 py-0.5"
                          aria-live="polite"
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="cart-item__quantity-btn size-6 flex items-center justify-center text-gray-500 hover:text-burgundy transition-colors active:scale-90"
                            aria-label="Disminuir cantidad"
                          >
                            <span className="text-sm font-medium leading-none mb-0.5">
                              -
                            </span>
                          </button>
                          <span className="cart-item__quantity-value w-8 text-center text-xs font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="cart-item__quantity-btn size-6 flex items-center justify-center text-gray-500 hover:text-burgundy transition-colors active:scale-90"
                            aria-label="Aumentar cantidad"
                          >
                            <span className="text-sm font-medium leading-none mb-0.5">
                              +
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div
                className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-ivory to-transparent pointer-events-none"
                aria-hidden="true"
              ></div>
            </div>

            {/* Pie del Carrito */}
            {cartItems.length > 0 && (
              <div className="cart-drawer__footer bg-ivory border-t border-burgundy/10">
                <div className="cart-drawer__subtotal-section px-8 py-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="cart-drawer__total-label text-gray-500 font-sans text-sm tracking-widest uppercase">
                      Subtotal
                    </span>
                    <span className="cart-drawer__total-amount text-3xl font-serif font-medium text-burgundy">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-sans text-right">
                    Impuestos incluidos
                  </p>
                </div>

                <div className="cart-drawer__actions px-8 pb-8 space-y-4">
                  <div className="bg-ivory p-4 rounded-lg border border-burgundy/15 shadow-sm mb-4">
                    <p className="cart-drawer__shipping-note text-xs text-gray-500 text-center leading-relaxed font-sans">
                      <span className="font-bold text-burgundy block mb-1 text-sm">
                        Envíos gratis a toda Colombia
                      </span>
                      Compras seguras y garantizadas.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/carrito"
                      className="cart-drawer__view-cart-btn flex items-center justify-center border border-burgundy/30 text-burgundy py-3.5 rounded-full font-sans font-medium text-xs tracking-[0.15em] hover:bg-burgundy hover:text-ivory hover:border-burgundy transition-all duration-300 uppercase"
                    >
                      Ver Carrito
                    </Link>

                    <button className="cart-drawer__checkout-btn bg-burgundy text-ivory py-3.5 rounded-full font-sans font-medium text-xs tracking-[0.15em] hover:bg-burgundy-light hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-burgundy/20 uppercase">
                      Pagar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
