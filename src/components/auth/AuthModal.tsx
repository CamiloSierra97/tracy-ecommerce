"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login")

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-white overflow-hidden shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gold/20">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveTab("login")}
                                className={`text-lg font-secondary transition-colors ${activeTab === 'login' ? 'text-burgundy font-bold border-b-2 border-burgundy' : 'text-gray-400 hover:text-burgundy'}`}
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                onClick={() => setActiveTab("register")}
                                className={`text-lg font-secondary transition-colors ${activeTab === 'register' ? 'text-burgundy font-bold border-b-2 border-burgundy' : 'text-gray-400 hover:text-burgundy'}`}
                            >
                                Registrarse
                            </button>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-burgundy">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {activeTab === "login" ? (
                            <LoginForm />
                        ) : (
                            <RegisterForm />
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
