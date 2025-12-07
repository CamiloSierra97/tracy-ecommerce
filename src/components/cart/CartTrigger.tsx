"use client";

import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/Icon";

export default function CartTrigger() {
    const { openCart, cartCount } = useCart();

    return (
        <button
            aria-label="Carrito"
            role="button"
            className="cursor-pointer relative"
            onClick={openCart}
        >
            <Icon name="icon-bag" size={24} />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-white font-extrabold text-sm drop-shadow-md">
                    {cartCount}
                </span>
            )}
        </button>
    );
}
