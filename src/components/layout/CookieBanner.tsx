"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent is already given
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner fixed bottom-0 left-0 right-0 z-50 bg-black text-white p-4 shadow-lg border-t border-gray-800 md:m-4 md:rounded-lg animate-in slide-in-from-bottom-full duration-500">
            <div className="cookie-banner__container container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="cookie-banner__content flex-1 text-sm text-gray-300">
                    <p className="cookie-banner__text">
                        Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra{" "}
                        <Link href="/cookies" className="cookie-banner__link text-white underline hover:text-gray-200">
                            Política de Cookies
                        </Link>{" "}
                        y{" "}
                        <Link href="/privacidad" className="cookie-banner__link text-white underline hover:text-gray-200">
                            Política de Privacidad
                        </Link>.
                    </p>
                </div>
                <div className="cookie-banner__actions flex items-center gap-3">
                    <button
                        onClick={acceptCookies}
                        className="cookie-banner__btn cookie-banner__btn--accept bg-white text-gray-900 px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
                    >
                        Aceptar todo
                    </button>
                    <button
                        onClick={() => setIsVisible(false)} // Just hide for session if closed without accepting? Or strictly required? Usually X just hides it.
                        className="cookie-banner__btn cookie-banner__btn--close p-2 hover:bg-gray-800 rounded-full transition-colors md:hidden"
                        aria-label="Cerrar"
                    >
                        <X size={20} className="cookie-banner__icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}
