"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/shared/ui/Icon";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/currency";

export default function CartDetails() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-details cart-details--empty container mx-auto px-4 py-20 text-center">
        <h1 className="cart-details__title text-4xl font-serif text-burgundy mb-6">
          Tu Carrito
        </h1>
        <p className="cart-details__empty-text text-lg text-gray mb-8">
          Tu carrito está vacío actualmente.
        </p>
        <Link
          href="/tienda"
          className="cart-details__back-btn inline-block bg-burgundy text-gold font-serif font-bold py-3 px-8 rounded-full uppercase tracking-widest hover:bg-burgundy-light transition-colors"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-details container mx-auto px-4 py-12 md:py-20">
      <h1 className="cart-details__title text-4xl md:text-5xl font-serif text-burgundy mb-12">
        Carrito
      </h1>

      <div className="cart-details__layout flex flex-col lg:flex-row gap-12">
        {/* Columna Izquierda: Artículos del Carrito */}
        <div className="cart-details__items-column w-full lg:w-2/3 space-y-8">
          {/* Encabezado de Tabla Escritorio */}
          <div className="cart-details__header-row hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#e5d0d0] text-burgundy font-serif font-bold uppercase tracking-wider text-sm">
            <div className="col-span-6 pl-4">Producto</div>
            <div className="col-span-2 text-center">Precio</div>
            <div className="col-span-2 text-center">Cantidad</div>
            <div className="col-span-2 text-right pr-4">Subtotal</div>
          </div>

          {/* Artículos del Carrito */}
          <div className="cart-details__list space-y-6 md:space-y-0 text-gray-700">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-details__item flex flex-col md:grid md:grid-cols-12 gap-4 items-center py-6 border-b border-[#e5d0d0]"
              >
                {/* Información del Producto */}
                <div className="cart-details__item-info w-full md:col-span-6 flex items-center gap-6">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-details__remove-btn text-gray-400 hover:text-burgundy transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <div className="size-6 md:size-8 flex items-center justify-center">
                      <Icon name="icon-trash" size={18} />
                    </div>
                  </button>
                  <div className="cart-details__item-image-container relative w-20 h-24 md:w-24 md:h-32 bg-gray-100 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={item.images?.[0]?.src ?? "/placeholder-v3.png"}
                      alt={item.name}
                      fill
                      className="cart-details__item-image object-cover"
                    />
                  </div>
                  <span className="cart-details__item-name font-medium text-lg text-burgundy">
                    {item.name}
                  </span>
                </div>

                {/* Precio */}
                <div className="cart-details__item-price w-full md:col-span-2 flex justify-between md:justify-center items-center">
                  <span className="md:hidden font-bold text-gray">Precio:</span>
                  <span>{formatPrice(item.price)}</span>
                </div>

                {/* Cantidad */}
                <div className="cart-details__item-quantity w-full md:col-span-2 flex justify-between md:justify-center items-center">
                  <span className="md:hidden font-bold text-gray">
                    Cantidad:
                  </span>
                  <div className="cart-details__quantity-selector flex items-center border border-[#e5d0d0] rounded-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="cart-details__quantity-btn cart-details__quantity-btn--minus size-9 flex items-center justify-center text-burgundy hover:bg-[#faf6f6] border-r border-[#e5d0d0] transition-colors"
                    >
                      <span className="text-xl font-light leading-none mb-1">
                        -
                      </span>
                    </button>
                    <span className="cart-details__quantity-value w-10 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="cart-details__quantity-btn cart-details__quantity-btn--plus size-9 flex items-center justify-center text-burgundy hover:bg-[#faf6f6] border-l border-[#e5d0d0] transition-colors"
                    >
                      <span className="text-xl font-light leading-none mb-1">
                        +
                      </span>
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="cart-details__item-subtotal w-full md:col-span-2 flex justify-between md:justify-end items-center pr-4">
                  <span className="md:hidden font-bold text-gray">
                    Subtotal:
                  </span>
                  <span className="font-bold text-burgundy">
                    {formatPrice((parseInt(item.price) || 0) * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de Cupón */}
          <div className="cart-details__coupon-section flex flex-col sm:flex-row gap-4 pt-6">
            <input
              type="text"
              placeholder="Código de cupón"
              className="cart-details__coupon-input px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-burgundy flex-1 lg:max-w-xs bg-white text-gray"
            />
            <button className="cart-details__coupon-btn px-8 py-3 bg-transparent border border-burgundy text-burgundy font-bold uppercase tracking-wider text-sm hover:bg-burgundy hover:text-white transition-all rounded-lg">
              Aplicar Cupón
            </button>
          </div>
        </div>

        {/* Columna Derecha: Totales y Marketing */}
        <div className="cart-details__summary-column w-full lg:w-1/3 space-y-10">
          {/* Caja de Totales del Carrito */}
          <div className="cart-details__summary-box border border-[#e5d0d0] p-8 bg-white/50 rounded-sm">
            <h2 className="cart-details__summary-title text-3xl font-serif text-burgundy mb-8">
              Totales Del Carrito
            </h2>

            <div className="cart-details__summary-rows space-y-6">
              <div className="cart-details__summary-row flex justify-between items-center text-gray text-lg border-b border-[#e5d0d0] pb-4">
                <span>Subtotal</span>
                <span className="cart-details__subtotal-value text-burgundy font-bold">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="cart-details__summary-row flex justify-between items-start text-gray text-lg border-b border-[#e5d0d0] pb-4">
                <span>Envío</span>
                <div className="text-right">
                  <p className="font-bold text-burgundy">Gratis</p>
                  <p className="text-sm text-gray mt-1">
                    Envíos a toda Colombia
                  </p>
                  <button className="text-sm text-burgundy underline mt-1 hover:text-burgundy-light">
                    Cambiar dirección
                  </button>
                </div>
              </div>

              <div className="cart-details__summary-total flex justify-between items-center text-xl font-bold text-burgundy pt-2">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <button className="cart-details__checkout-btn w-full bg-burgundy text-gold py-4 rounded-lg font-serif font-bold text-lg uppercase tracking-widest hover:bg-burgundy-light hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-8 shadow-lg shadow-burgundy/20">
                Finalizar Compra
              </button>
            </div>
          </div>
          {/* Área de Copy de Marketing */}
          <div className="cart-details__marketing-box bg-golden/10 p-6 rounded-lg border border-golden/30">
            <h3 className="font-serif text-xl text-burgundy mb-3">
              ¡Gracias por elegir Tracy!
            </h3>
            <p className="text-gray-700 italic leading-relaxed">
              "Cada prenda es un homenaje a tu belleza. Esperamos que disfrutes
              tu compra y te sientas tan increíble como te ves."
            </p>
            <div className="mt-4 flex items-center gap-2 text-burgundy font-medium text-sm">
              <Icon name="icon-truck" size={20} />
              <span>Despachamos tu pedido con amor y cuidado.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
