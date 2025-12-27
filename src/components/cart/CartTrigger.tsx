"use client";

import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/Icon";

export default function CartTrigger() {
  const { openCart, cartCount } = useCart();

  return (
    <button
      aria-label="Carrito"
      role="button"
      className="cart-trigger relative w-10 h-10 flex items-center justify-center"
      onClick={openCart}
    >
      <Icon name="icon-bag" size={24} className="cart-trigger__icon" />
      {cartCount > 0 && (
        <span className="cart-trigger__badge absolute -top-1 -right-2 text-white font-extrabold text-sm drop-shadow-md">
          {cartCount}
        </span>
      )}
    </button>
  );
}
