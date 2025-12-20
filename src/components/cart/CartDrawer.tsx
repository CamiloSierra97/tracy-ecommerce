"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import { formatPrice } from "@/lib/utils/currency";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

export default function CartDrawer() {
  const { isOpen, closeCart, cartItems, removeFromCart, cartTotal } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="cart-drawer__overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="cart-drawer__panel fixed top-0 right-0 h-full w-full max-w-md bg-[#ffffff] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="cart-drawer__header p-6 flex items-center justify-between border-b border-gray-100">
              <h2 className="cart-drawer__title text-2xl font-serif text-gray-900">
                Tu Bolsa
              </h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="cart-drawer__close-btn p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <Icon name="icon-close" size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="cart-drawer__items-list flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="cart-drawer__empty-state h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="cart-drawer__empty-icon w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <Icon name="icon-bag" size={32} />
                  </div>
                  <p className="cart-drawer__empty-text text-gray-500 text-lg">
                    Tu bolsa está vacía
                  </p>
                  <button
                    onClick={closeCart}
                    className="cart-drawer__continue-btn text-tracy-burdeos font-medium hover:underline"
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
                          className="cart-item__remove-btn text-gray-400 hover:text-red-500 p-1"
                        >
                          <Icon name="icon-trash" size={18} />
                        </button>
                      </div>
                      <p className="cart-item__quantity text-sm text-gray-500 mt-1">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="cart-item__price text-tracy-burdeos font-bold mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="cart-drawer__footer p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="cart-drawer__total-row flex justify-between items-center mb-4">
                  <span className="cart-drawer__total-label text-gray-600">
                    Subtotal
                  </span>
                  <span className="cart-drawer__total-amount text-xl font-bold text-gray-900">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <p className="cart-drawer__tax-note text-xs text-gray-400 mb-4 text-center">
                  Impuestos y envío calculados al finalizar la compra.
                </p>
                <button className="cart-drawer__checkout-btn w-full bg-tracy-burdeos text-white py-4 rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
