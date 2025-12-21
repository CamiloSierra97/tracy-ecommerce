"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import dynamic from "next/dynamic";
const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });

export default function AuthTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Mi Cuenta"
        className="auth-trigger header__utility-button cursor-pointer flex items-center text-gold hover:text-light-gold transition-colors"
      >
        <Icon name="icon-user" />
      </button>

      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
