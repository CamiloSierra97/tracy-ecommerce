"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageTransition from "./PageTransition";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    // La key en AnimatePresence debe cambiar con cada ruta para disparar el exit/enter
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
}
