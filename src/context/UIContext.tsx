"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  toggleAuth: () => void;
  toast: { message: string | null; isVisible: boolean };
  showToast: (message: string) => void;
  hideToast: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string | null;
    isVisible: boolean;
  }>({
    message: null,
    isVisible: false,
  });

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);
  const toggleAuth = () => setIsAuthOpen((prev) => !prev);

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <UIContext.Provider
      value={{
        isAuthOpen,
        openAuth,
        closeAuth,
        toggleAuth,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI debe ser usado dentro de un UIProvider");
  }
  return context;
};
