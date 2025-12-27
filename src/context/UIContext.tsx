"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  toggleAuth: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);
  const toggleAuth = () => setIsAuthOpen((prev) => !prev);

  return (
    <UIContext.Provider
      value={{
        isAuthOpen,
        openAuth,
        closeAuth,
        toggleAuth,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
