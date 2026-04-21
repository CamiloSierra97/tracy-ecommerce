"use client";

import Icon from "@/components/shared/ui/Icon";
import dynamic from "next/dynamic";
import { useUI } from "@/context/UIContext";

const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });

export default function AuthTrigger() {
  const { isAuthOpen, openAuth, closeAuth } = useUI();

  return (
    <>
      <button
        onClick={openAuth}
        aria-label="Mi Cuenta"
        className="auth-trigger header__utility-button flex items-center justify-center w-10 h-10 text-gold hover:text-light-gold transition-colors"
      >
        <Icon name="icon-user" size={24} />
      </button>

      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
    </>
  );
}
