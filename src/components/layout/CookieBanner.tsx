"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function CookieBanner({
  onHeightChange,
}: {
  onHeightChange?: (height: number) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar si ya se ha dado el consentimiento
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Mostrar el banner después de un pequeño retraso para una mejor experiencia de usuario (UX)
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!onHeightChange) return;

    if (!isVisible) {
      onHeightChange(0);
      return;
    }

    const updateHeight = () => {
      if (bannerRef.current) {
        onHeightChange(bannerRef.current.offsetHeight);
      }
    };

    // Initial measure - defer to avoid forced reflow
    requestAnimationFrame(updateHeight);

    // Observe changes
    const resizeObserver = new ResizeObserver(updateHeight);
    if (bannerRef.current) {
      resizeObserver.observe(bannerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [isVisible, onHeightChange]);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de cookies"
      className="cookie-banner fixed bottom-0 left-0 right-0 z-200 bg-ivory p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-burgundy-light/30 md:m-4 md:rounded-xl"
    >
      <div className="cookie-banner__container container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="cookie-banner__content flex-1 text-sm leading-relaxed">
          <p className="cookie-banner__text text-black">
            Utilizamos cookies para mejorar tu experiencia. Al continuar
            navegando, aceptas nuestra{" "}
            <Link
              href="/cookies"
              className="cookie-banner__link text-burgundy font-medium underline decoration-burgundy/50 underline-offset-4 hover:text-gold hover:decoration-gold transition-all"
            >
              Política de Cookies
            </Link>{" "}
            y{" "}
            <Link
              href="/privacidad"
              className="cookie-banner__link text-burgundy font-medium underline decoration-burgundy/50 underline-offset-4 hover:text-gold hover:decoration-gold transition-all"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
        <div className="cookie-banner__actions flex items-center gap-3">
          <button
            onClick={acceptCookies}
            className="cookie-banner__btn--accept bg-burgundy text-ivory px-6 py-2 rounded-full font-medium text-sm hover:bg-burgundy-light hover:text-black transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
          >
            Aceptar todo
          </button>
          <button
            onClick={() => setIsVisible(false)} // Solo ocultar por la sesión si se cierra sin aceptar. Comúnmente la X solo lo oculta.
            className="cookie-banner__btn--close p-2 hover:bg-burgundy-light/20 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
            aria-label="Cerrar"
          >
            <X size={20} className="cookie-banner__icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
