"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/services/WooCommerceService";
import Icon from "@/components/ui/Icon";

interface AddToCartBtnProps {
    product: Product;
}

export default function AddToCartBtn({ product }: AddToCartBtnProps) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full bg-burgundy text-white py-5 rounded-xl font-bold tracking-widest hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-burgundy/10 hover:scale-[1.01] active:scale-[0.99] text-lg uppercase font-secondary"
        >
            <Icon name="icon-bag" size={24} />
            Agregar al Carrito
        </button>
    );
}
