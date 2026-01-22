"use client";

import OrderCard from "./OrderCard";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Order } from "@/services/WooCommerceService";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/user/orders");
        if (!response.ok) {
          throw new Error("Error al cargar las órdenes");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err: unknown) {
        console.error("Error fetching orders:", err);
        setError("No pudimos cargar tus órdenes recientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="order-list w-full space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="order-list__skeleton p-6 bg-gray-50 rounded-xl animate-pulse h-48 border border-gray-100"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-list__error text-center py-10 bg-red-50 rounded-xl border border-red-100 p-8">
        <Icon
          name="icon-alert-circle"
          size={48}
          className="mx-auto text-red-300 mb-4"
        />
        <p className="text-red-800 font-medium mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-red-600 underline hover:text-red-800 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-list__empty text-center py-12 bg-ivory rounded-xl border border-burgundy/10 p-8">
        <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-burgundy/5 mb-6">
          <Icon name="icon-bag" size={40} className="text-burgundy/40" />
        </div>
        <h3 className="text-xl font-serif text-burgundy mb-2">
          Aún no tienes pedidos
        </h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Descubre nuestra colección exclusiva y realiza tu primera compra.
        </p>
        <Link
          href="/"
          className="order-list__shop-btn inline-block bg-burgundy text-white px-8 py-3 rounded-full font-medium tracking-wide hover:bg-burgundy-light transition-all shadow-md hover:translate-y-px"
        >
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="order-list w-full">
      <h2 className="order-list__title text-2xl font-serif text-burgundy mb-6 border-b border-gray-200 pb-2">
        Mis Pedidos Recientes
      </h2>
      <div className="order-list__items">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
