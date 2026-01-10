"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../ui/Icon";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulación de envío
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="newsletter-section py-20 px-6 bg-ivory text-center border-t border-gold/20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Icon name="icon-mail" size={32} className="mx-auto text-gold mb-4" />

          <h2 className="text-3xl md:text-4xl font-serif text-burgundy mb-4">
            Únete al Club Tracy
          </h2>

          <p className="text-gray-600 mb-8 font-light">
            Suscríbete para recibir noticias exclusivas, lanzamientos
            anticipados y un{" "}
            <span className="font-medium text-burgundy">10% de descuento</span>{" "}
            en tu primera compra.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200"
            >
              <p className="font-medium">
                ¡Gracias por suscribirte! Revisa tu correo.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 bg-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-gray-800 placeholder:text-gray-400"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`px-8 py-4 rounded-full bg-burgundy text-ivory font-medium tracking-wide uppercase transition-all duration-300 hover:bg-burgundy-light hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]`}
              >
                {status === "loading" ? "Enviando..." : "Suscribirse"}
              </button>
            </form>
          )}

          <p className="text-xs text-gray-400 mt-4">
            Al suscribirte, aceptas nuestros términos y condiciones. Puedes
            cancelar en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
