import { Order } from "@/services/WooCommerceService";
import { formatPrice } from "@/lib/utils/currency";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  // Función auxiliar para determinar el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "pending":
      case "on-hold":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "processing":
        return "Procesando";
      case "pending":
        return "Pendiente de Pago";
      case "on-hold":
        return "En Espera";
      case "cancelled":
        return "Cancelado";
      case "failed":
        return "Fallido";
      case "refunded":
        return "Reembolsado";
      default:
        return status;
    }
  };

  const statusClass = getStatusColor(order.status);
  const statusLabel = getStatusLabel(order.status);
  const date = new Date(order.date_created).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="order-card p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 transition-all hover:shadow-md">
      <div className="order-card__header flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="order-card__number text-lg font-serif text-burgundy font-bold">
            Orden #{order.number}
          </h3>
          <p className="order-card__date text-sm text-gray-500 mt-1">{date}</p>
        </div>
        <div
          className={`order-card__status px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusClass}`}
        >
          {statusLabel}
        </div>
      </div>

      <div className="order-card__content">
        <div className="order-card__items space-y-2 mb-4">
          <p className="text-sm font-medium text-gray-700">Resumen:</p>
          <ul className="text-sm text-gray-600 pl-4 list-disc space-y-1">
            {order.line_items.slice(0, 3).map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.name}
              </li>
            ))}
            {order.line_items.length > 3 && (
              <li className="text-gray-400 italic">
                y {order.line_items.length - 3} más...
              </li>
            )}
          </ul>
        </div>

        <div className="order-card__footer flex justify-between items-center pt-2">
          <div className="order-card__total">
            <span className="text-xs text-gray-500 block">Total</span>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(order.total)}
            </span>
          </div>
          {/* 
            Nota: En un futuro se podría agregar un botón para "Ver Detalles" 
            que lleve a una página dinámica /perfil/orden/[id]
          */}
        </div>
      </div>
    </div>
  );
}
