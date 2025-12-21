"use client";

import dynamic from "next/dynamic";

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
  return (
    <>
      <CartDrawer />
      <CookieBanner />
      <FloatingButtons />
    </>
  );
}
