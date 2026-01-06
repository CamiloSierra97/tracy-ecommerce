"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
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

const Toast = dynamic(() => import("@/components/ui/Toast"), { ssr: false });

export default function DynamicLayoutElements() {
  const { isOpen: isCartOpen } = useCart();
  const { isAuthOpen, toast, hideToast } = useUI();
  const [bannerHeight, setBannerHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Esperar hasta que el componente esté montado en el cliente para evitar hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ocultar botones flotantes si algún modal está abierto
  const shouldShowFloating = !isCartOpen && !isAuthOpen;

  return (
    <>
      <CartDrawer />
      <CookieBanner onHeightChange={setBannerHeight} />
      {isMounted && shouldShowFloating && (
        <FloatingButtons bottomOffset={bannerHeight} />
      )}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
