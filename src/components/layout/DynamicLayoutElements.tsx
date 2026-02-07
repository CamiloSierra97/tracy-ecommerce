"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Session } from "next-auth";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});

const CookieBanner = dynamic(() => import("@/components/layout/CookieBanner"), {
  ssr: false,
});

const FloatingButtons = dynamic(
  () => import("@/components/layout/FloatingButtons")
);

const Toast = dynamic(() => import("@/components/ui/Toast"), { ssr: false });

export default function DynamicLayoutElements({
  session,
}: {
  session: Session | null;
}) {
  const { isOpen: isCartOpen } = useCart();
  const { isAuthOpen, toast, hideToast } = useUI();
  const [bannerHeight, setBannerHeight] = useState(0);

  // Hide floating buttons when a modal is open
  const shouldShowFloating = !isCartOpen && !isAuthOpen;

  return (
    <>
      <CartDrawer />
      <CookieBanner onHeightChange={setBannerHeight} />
      {shouldShowFloating && (
        <FloatingButtons bottomOffset={bannerHeight} session={session} />
      )}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
