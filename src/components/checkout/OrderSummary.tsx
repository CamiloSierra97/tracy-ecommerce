"use client";

import CouponInput from "./CouponInput";
import { formatPrice } from "@/lib/utils/currency";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
  const { cartItems, cartTotal, discountTotal, grandTotal } = useCart();
  const shippingCost = 0; // Envío gratis o calcular según lógica
  const total = grandTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No hay productos en el resumen.
      </div>
    );
  }

  return (
    <div className="order-summary bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
      <h3 className="order-summary__title text-xl font-serif text-burgundy mb-6">
        Tu Pedido
      </h3>

      <div className="order-summary__items space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {cartItems.map((item, index) => (
          <div
            key={`${item.id}-${item.variation_id || index}`}
            className="order-summary__item flex gap-4 py-2 border-b border-gray-100 last:border-0"
          >
            <div className="order-summary__item-image relative size-16 rounded-md overflow-hidden bg-white border border-gray-200 shrink-0">
              {item.images && item.images[0] ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.images[0].src}
                  alt={item.name}
                  className="size-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="size-full bg-gray-100 flex items-center justify-center text-xs">
                  Sin foto
                </div>
              )}
              <span className="absolute -top-1 -right-1 bg-gold text-burgundy size-5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                {item.quantity}
              </span>
            </div>

            <div className="order-summary__item-info flex-1 min-w-0">
              <h4 className="font-medium text-sm text-gray-900 truncate pr-2">
                {item.name}
              </h4>

              {/* Mostrar atributos seleccionados */}
              {item.selected_attributes && (
                <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                  {Object.entries(item.selected_attributes).map(
                    ([key, value]) => (
                      <p key={key} className="capitalize">
                        {key}: {String(value)}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="order-summary__item-price text-sm font-semibold text-gray-900">
              {formatPrice(String(parseInt(item.price) * item.quantity))}
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary__totals space-y-3 pt-4 border-t border-gray-200 text-sm">
        <div className="order-summary__row flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(String(cartTotal))}</span>
        </div>

        {discountTotal > 0 && (
          <div className="order-summary__row order-summary__row--discount flex justify-between text-green-600 font-medium">
            <span>Descuento</span>
            <span>-{formatPrice(String(discountTotal))}</span>
          </div>
        )}

        <div className="order-summary__row flex justify-between text-gray-600">
          <span>Envío</span>
          <span className="text-green-600 font-medium">
            {shippingCost === 0 ? "Gratis" : formatPrice(String(shippingCost))}
          </span>
        </div>
      </div>

      <div className="order-summary__coupon pt-4 border-t border-gray-200">
        <CouponInput />
      </div>

      <div className="order-summary__total-row flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <div className="text-right">
          <span className="block text-2xl font-bold text-burgundy">
            {formatPrice(String(total))}
          </span>
          <span className="text-xs text-gray-500">Impuestos incluidos</span>
        </div>
      </div>
    </div>
  );
}
