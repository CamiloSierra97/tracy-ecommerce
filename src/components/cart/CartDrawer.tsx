"use client";
// Componente del cajón del carrito que muestra los productos seleccionados

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef } from "react";
import { formatPrice } from "@/lib/utils/currency";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

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
            className="cart-drawer__overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden={isOpen ? "true" : "false"}
          />

          {/* Panel Lateral (Drawer) */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="cart-drawer__panel fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeCart();
            }}
            tabIndex={-1}
          >
            {/* Encabezado del Carrito */}
            <div className="cart-drawer__header p-6 flex items-center justify-between border-b border-gray-100">
              <h2
                id="cart-drawer-title"
                className="cart-drawer__title text-2xl font-serif text-gray-900"
              >
                Tu Bolsa
              </h2>
              <button
                ref={closeButtonRef}
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="cart-drawer__close-btn p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <Icon name="icon-close" size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="cart-drawer__items-list flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="cart-drawer__empty-state h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="cart-drawer__empty-icon size-16 bg-gray-50 rounded-full flex items-center justify-center text-black/10">
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
                  <div key={item.id} className="cart-item flex gap-4">
                    <div className="cart-item__image-container relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.images?.[0]?.src ?? "/placeholder-v3.png"}
                        alt={item.name}
                        fill
                        className="cart-item__image object-cover"
                      />
                    </div>
                    <div className="cart-item__details flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="cart-item__name text-base font-medium text-gray-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Eliminar ${item.name}`}
                          className="cart-item__remove-btn text-black hover:text-burgundy p-1"
                        >
                          <Icon name="icon-trash" size={18} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="cart-item__quantity-selector flex items-center border border-black/10 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="cart-item__quantity-btn cart-item__quantity-btn--minus size-8 flex items-center justify-center text-burgundy hover:bg-ivory border-r border-black/10 transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <span className="text-lg font-light leading-none mb-0.5">
                              -
                            </span>
                          </button>
                          <span className="cart-item__quantity-value w-10 text-center text-sm font-medium text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="cart-item__quantity-btn cart-item__quantity-btn--plus size-8 flex items-center justify-center text-burgundy hover:bg-ivory border-l border-black/10 transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <span className="text-lg font-light leading-none mb-0.5">
                              +
                            </span>
                          </button>
                        </div>
                      </div>
                      <p className="cart-item__price text-burgundy font-bold mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pie del Carrito */}
            {cartItems.length > 0 && (
              <div className="cart-drawer__footer bg-gray-50/50">
                <div className="cart-drawer__subtotal-section p-6 border-y border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="cart-drawer__total-label text-gray-600 font-serif text-lg">
                      Subtotal
                    </span>
                    <span className="cart-drawer__total-amount text-2xl font-serif font-bold text-burgundy">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>

                <div className="cart-drawer__actions p-6 space-y-4">
                  <p className="cart-drawer__shipping-note text-sm text-gray-500 text-center leading-relaxed">
                    <span className="font-semibold text-burgundy">
                      Envíos gratis a toda Colombia.
                    </span>{" "}
                    Al finalizar la compra podrás elegir el método de pago que
                    más se adapte a tus necesidades.
                  </p>

                  <a
                    href="/carrito"
                    className="cart-drawer__view-cart-btn block w-full border border-burgundy text-burgundy py-4 rounded-full font-serif font-bold text-lg uppercase tracking-widest text-center hover:bg-burgundy hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Ver Carrito
                  </a>

                  <button className="cart-drawer__checkout-btn w-full bg-burgundy text-gold py-4 rounded-full font-serif font-bold text-lg uppercase tracking-widest hover:bg-burgundy-light hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-burgundy/20">
                    Finalizar Compra
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
