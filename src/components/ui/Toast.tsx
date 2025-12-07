"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ToastProps {
    message: string | null;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && message && (
                <div className="fixed bottom-6 right-6 z-[9999]">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-[#580a1e] border border-[#d9b338] text-[#f4f1ec] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[320px]"
                    >
                        <div className="text-[#d9b338] text-xl">
                            🛍️
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm tracking-wide">{message}</p>
                        </div>
                        <button onClick={onClose} className="text-[#d9b338]/80 hover:text-[#d9b338] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
