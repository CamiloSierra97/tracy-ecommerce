"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/services/WooCommerceService";
import Toast from "@/components/ui/Toast";

// Extend Product to include quantity for CartItem
export interface CartItem extends Product {
    quantity: number;
}
interface CartContextType {
    isOpen: boolean;
    cartItems: CartItem[];
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("tracy_cart");
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("tracy_cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isLoaded]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen((prev) => !prev);

    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });

        setToastMessage(`¡${product.name} agregado a tu bolsa!`);
        setShowToast(true);
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (parseInt(item.price) || 0) * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                isOpen,
                cartItems,
                openCart,
                closeCart,
                toggleCart,
                addToCart,
                removeFromCart,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
