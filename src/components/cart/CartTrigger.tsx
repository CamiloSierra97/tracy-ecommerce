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
            <Icon name="icon-bag" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-tracy-burdeos text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                    {cartCount}
                </span>
            )}
        </button>
    );
}
