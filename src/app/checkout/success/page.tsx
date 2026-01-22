"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="mb-8 flex justify-center">
        <div className="size-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce-slow">
          <Icon name="icon-check" size={48} />
        </div>
      </div>

      <h1 className="text-4xl font-serif text-burgundy mb-4">
        ¡Gracias por tu compra!
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Tu pedido ha sido recibido correctamente. Hemos enviado un correo
        electrónico con los detalles.
      </p>

      {orderId && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10 max-w-sm mx-auto">
          <span className="block text-sm text-gray-500 uppercase tracking-widest mb-1">
            Número de Orden
          </span>
          <span className="text-3xl font-bold text-gray-900 font-mono">
            #{orderId}
          </span>
        </div>
      )}

      <div className="space-y-4">
        <Link
          href="/tienda"
          className="inline-block bg-burgundy text-golden px-8 py-4 rounded-xl font-bold tracking-widest hover:bg-opacity-90 transition-all shadow-premium"
        >
          SEGUIR COMPRANDO
        </Link>

        <div>
          <Link
            href="/"
            className="inline-block text-gray-500 hover:text-burgundy underline text-sm mt-4"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <PageHero title="Pedido Confirmado" image="/images/hero-bg.webp" />

      <Suspense
        fallback={<div className="py-20 text-center">Cargando detalles...</div>}
      >
        <SuccessContent />
      </Suspense>
    </>
  );
}
