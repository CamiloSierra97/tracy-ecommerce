import OrderCard from "./OrderCard";
import Icon from "@/components/shared/ui/Icon";
import Link from "next/link";
import { Order } from "@/services/WooCommerceService";

export default function OrderList({ initialOrders = [] }: { initialOrders?: Order[] }) {
  if (initialOrders.length === 0) {
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
        {initialOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
