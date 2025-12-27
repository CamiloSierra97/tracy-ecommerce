"use client";

import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});

const CookieBanner = dynamic(() => import("@/components/layout/CookieBanner"), {
  ssr: false,
});

const FloatingButtons = dynamic(
  () => import("@/components/layout/FloatingButtons"),
  {
    ssr: false,
  }
);

export default function DynamicLayoutElements() {
  const { isOpen: isCartOpen } = useCart();
  const { isAuthOpen } = useUI();

  // Hide floating buttons if either modal is open
  const shouldShowFloating = !isCartOpen && !isAuthOpen;

  return (
    <>
      <CartDrawer />
      <CookieBanner />
      {shouldShowFloating && <FloatingButtons />}
    </>
  );
}
