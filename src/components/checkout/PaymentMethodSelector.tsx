import { PaymentMethod } from "@/hooks/useCheckout";

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Opción Contra Entrega */}
      <label
        className={`checkout-form__payment-option payment-option border p-4 rounded-lg flex items-start gap-3 cursor-pointer transition-all ${
          paymentMethod === "cod"
            ? "border-gold bg-gold/5 ring-1 ring-gold"
            : "border-gray-200 hover:border-gold/50"
        }`}
      >
        <div className="mt-1">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
            className="text-gold focus:ring-gold accent-burgundy"
          />
        </div>
        <div>
          <span className="font-bold text-gray-900 block">
            Pago Contra Entrega
          </span>
          <span className="text-sm text-gray-600">
            Paga en efectivo o transferencia al recibir tu pedido.
          </span>
        </div>
      </label>

      {/* Opción Wompi */}
      <label
        className={`checkout-form__payment-option payment-option border p-4 rounded-lg flex items-start gap-3 cursor-pointer transition-all ${
          paymentMethod === "wompi"
            ? "border-gold bg-gold/5 ring-1 ring-gold"
            : "border-gray-200 hover:border-gold/50"
        }`}
      >
        <div className="mt-1">
          <input
            type="radio"
            name="paymentMethod"
            value="wompi"
            checked={paymentMethod === "wompi"}
            onChange={() => setPaymentMethod("wompi")}
            className="text-gold focus:ring-gold accent-burgundy"
          />
        </div>
        <div>
          <span className="font-bold text-gray-900 flex items-center gap-2">
            Pago Online (Wompi)
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Seguro
            </span>
          </span>
          <span className="text-sm text-gray-600 block mb-2">
            Tarjetas de Crédito, PSE, Nequi y Bancolombia.
          </span>
          <div className="flex gap-2 opacity-70">
            {/* Aquí se podrían poner logos de tarjetas si se tienen assets */}
            <span className="text-xs border border-gray-300 rounded px-1">
              VISA
            </span>
            <span className="text-xs border border-gray-300 rounded px-1">
              Mastercard
            </span>
            <span className="text-xs border border-gray-300 rounded px-1">
              PSE
            </span>
          </div>
        </div>
      </label>
    </div>
  );
}
