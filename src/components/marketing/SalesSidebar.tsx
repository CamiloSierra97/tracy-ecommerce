"use client";

import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function SalesSidebar() {
  return (
    <aside className="sales-sidebar hidden lg:block w-full sticky top-24 self-start space-y-8 font-sans">
      {/* 1. Tarjeta de Producto Destacado */}
      <div className="sales-sidebar__widget bg-white p-6 rounded-2xl shadow-sm border border-gold/10 text-center group hover:shadow-md transition-shadow">
        <span className="sales-sidebar__widget-label text-xs font-bold tracking-[0.2em] text-burgundy uppercase mb-3 block">
          Favorito del Mes
        </span>

        {/* Marcador de posición para imagen de producto */}
        <div className="sales-sidebar__product-image-container relative w-full aspect-3/4 bg-ivory mb-4 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-burgundy/5" />
          <Icon name="icon-bag" size={32} className="text-gold/50" />
          <span className="absolute bottom-2 text-xs text-black/50">
            Bata Silk Edition
          </span>
        </div>

        <h3 className="sales-sidebar__product-name text-lg font-serif text-black mb-1">
          Bata Silk Edition
        </h3>
        <p className="sales-sidebar__product-price text-gold font-medium mb-4">
          $180.000 COP
        </p>

        <Link
          href="/tienda"
          className="sales-sidebar__cta block w-full py-3 bg-burgundy text-white text-sm font-medium tracking-wide uppercase rounded-lg hover:bg-black transition-colors"
        >
          Ver Detalle
        </Link>
      </div>

      {/* 2. Enlaces Rápidos */}
      <div className="sales-sidebar__links-widget bg-ivory/50 p-6 rounded-2xl border border-black/5">
        <h4 className="sales-sidebar__widget-title font-serif text-lg text-black mb-4 flex items-center gap-2">
          <Icon name="icon-star" size={16} className="text-gold" />
          Explora
        </h4>
        <nav className="sales-sidebar__nav space-y-3">
          <Link
            href="/tienda"
            className="sales-sidebar__link flex items-center justify-between text-gray-600 hover:text-burgundy transition-colors group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              Nuevos Lanzamientos
            </span>
            <Icon
              name="icon-arrow-right-dashed"
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          <Link
            href="/tienda"
            className="sales-sidebar__link flex items-center justify-between text-gray-600 hover:text-burgundy transition-colors group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              Batas de Seda
            </span>
            <Icon
              name="icon-arrow-right-dashed"
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          <Link
            href="/tienda"
            className="sales-sidebar__link flex items-center justify-between text-gray-600 hover:text-burgundy transition-colors group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              Pijamas Premium
            </span>
            <Icon
              name="icon-arrow-right-dashed"
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          <Link
            href="/tienda"
            className="sales-sidebar__link flex items-center justify-between text-gray-600 hover:text-burgundy transition-colors group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              Sets de Regalo
            </span>
            <Icon
              name="icon-arrow-right-dashed"
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
        </nav>
      </div>

      {/* 3. Insignias de Confianza */}
      <div className="sales-sidebar__badges text-center space-y-4 px-4">
        <div className="sales-sidebar__badge flex items-center gap-3 justify-center text-gray-500 text-sm">
          <Icon name="icon-truck" size={18} />
          <span>Envíos a toda Colombia</span>
        </div>
        <div className="sales-sidebar__badge flex items-center gap-3 justify-center text-gray-500 text-sm">
          <Icon name="icon-check" size={18} />
          <span>Pagos 100% Seguros</span>
        </div>
      </div>
    </aside>
  );
}
