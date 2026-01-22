"use client";

import Icon from "@/components/ui/Icon";
import { OrderData, BillingAddress } from "@/services/WooCommerceService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface CheckoutFormProps {
  onSuccess: (orderId: number) => void;
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const { cartItems, cartTotal, clearCart, coupon } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "wompi">("cod");

  // Función para manejar el pago con Wompi
  const handleWompiPayment = async (orderId: string, total: number) => {
    try {
      const response = await fetch("/api/payment/wompi-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: orderId, // Usamos el número de orden como referencia
          amount: total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error al iniciar pago con Wompi");
      }

      // Añadimos script de Wompi dinámicamente o redirigimos
      // Para MVP usaremos redirección directa a la URL de checkout si es posible,
      // O usaremos el widget mediante un botón oculto que activamos.
      // Wompi recomienda usar el botón con script, pero en React es mejor abrir la URL:
      // https://checkout.wompi.co/p/?public-key=...&currency=COP&amount-in-cents=...&reference=...&signature:integrity=...

      const checkoutUrl = `https://checkout.wompi.co/p/?public-key=${data.publicKey}&currency=${data.currency}&amount-in-cents=${data.amountInCents}&reference=${data.reference}&signature:integrity=${data.signature}&redirect-url=${window.location.origin}/checkout/confirmation`;

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error Wompi:", error);
      setError(
        "No se pudo iniciar la pasarela de pagos. Intenta con Contra Entrega.",
      );
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (cartItems.length === 0) {
        throw new Error(
          "El carrito está vacío. Agrega productos antes de pagar.",
        );
      }

      // Construir objeto para API
      const billingData: BillingAddress = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address_1: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode || "00000", // Default si no se usa
        country: "CO", // Colombia por defecto
      };

      // Mapear items del carrito a formato WooCommerce
      const lineItems = cartItems.map((item) => ({
        product_id: item.id,
        variation_id: item.variation_id,
        quantity: item.quantity,
      }));

      const orderData: OrderData = {
        payment_method: paymentMethod === "wompi" ? "wompi" : "cod",
        payment_method_title:
          paymentMethod === "wompi"
            ? "Wompi / Tarjetas / PSE"
            : "Contra entrega",
        set_paid: false,
        billing: billingData,
        shipping: {
          ...billingData, // Copiar facturación a envío por simplicidad inicial
        },
        line_items: lineItems,
        coupon_lines: coupon ? [{ code: coupon.code }] : undefined,
      };

      // Enviar a nuestra API segura para crear la orden en WC primero
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error al procesar la orden.");
      }

      const orderId = result.orderId;
      const orderNumber = result.orderNumber || orderId.toString(); // Preferimos el número de orden visible

      // Si es Wompi, iniciamos el flujo de pago
      if (paymentMethod === "wompi") {
        await handleWompiPayment(orderNumber, cartTotal);
      } else {
        // Contra entrega: éxito directo
        clearCart();
        router.push(`/checkout/success?orderId=${orderId}`);
      }
    } catch (err: unknown) {
      console.error("Error en Checkout:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado. Intenta de nuevo.";
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form space-y-6">
      {error && (
        <div className="checkout-form__error bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-sm">
          {error}
        </div>
      )}

      <div className="checkout-form__section space-y-4">
        <h3 className="checkout-form__section-title text-xl font-serif text-burgundy border-b border-gray-100 pb-2">
          Datos de Contacto
        </h3>
        <div className="checkout-form__grid grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputGroup
            label="Teléfono"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="checkout-form__section space-y-4 pt-4">
        <h3 className="checkout-form__section-title text-xl font-serif text-burgundy border-b border-gray-100 pb-2">
          Dirección de Envío
        </h3>
        <div className="checkout-form__grid grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup
            label="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <InputGroup
            label="Apellidos"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <InputGroup
          label="Dirección Completa (Calle, Cra, #, Torre, Apto)"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="checkout-form__grid grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputGroup
            label="Ciudad"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <InputGroup
            label="Departamento/Estado"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <InputGroup
            label="Código Postal (Opcional)"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
          />
        </div>

        <div className="checkout-form__input-group pt-2">
          <label className="checkout-form__label block text-sm font-medium text-gray-700 mb-1">
            Notas del Pedido (Opcional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="checkout-form__textarea w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
            placeholder="Ej: Dejar en portería, timbre dañado..."
          />
        </div>
      </div>

      <div className="checkout-form__section space-y-4 pt-4">
        <h3 className="checkout-form__section-title text-xl font-serif text-burgundy border-b border-gray-100 pb-2">
          Método de Pago
        </h3>

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
              <span className="font-bold text-gray-900 block flex items-center gap-2">
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
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="checkout-form__submit-btn w-full bg-burgundy text-golden py-4 rounded-xl font-bold tracking-widest hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-premium mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="size-6 border-2 border-golden border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <>
            <Icon
              name={paymentMethod === "wompi" ? "icon-credit-card" : "icon-bag"}
              size={20}
            />
            <span>
              {paymentMethod === "wompi"
                ? "PAGAR CON WOMPI"
                : "CONFIRMAR PEDIDO"}{" "}
              • ${cartTotal.toLocaleString()}
            </span>
          </>
        )}
      </button>

      <p className="checkout-form__terms text-xs text-center text-gray-500 mt-4">
        Al confirmar, aceptas nuestros términos y condiciones y política de
        privacidad.
      </p>
    </form>
  );
}

interface InputGroupProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function InputGroup({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: InputGroupProps) {
  const inputId = `input-${name}`;

  return (
    <div className="checkout-form__input-group">
      <label
        htmlFor={inputId}
        className="checkout-form__label block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="checkout-form__input w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
      />
    </div>
  );
}
