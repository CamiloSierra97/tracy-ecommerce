"use client";

import Icon from "@/components/ui/Icon";
import { useCheckout } from "@/hooks/useCheckout";
import InputGroup from "@/components/ui/InputGroup";
import PaymentMethodSelector from "./PaymentMethodSelector";

export default function CheckoutForm() {
  const {
    formData,
    handleChange,
    paymentMethod,
    setPaymentMethod,
    isSubmitting,
    error,
    submitOrder,
    cartTotal,
  } = useCheckout();

  return (
    <form onSubmit={submitOrder} className="checkout-form space-y-6">
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
          <label
            htmlFor="checkout-notes"
            className="checkout-form__label block text-sm font-medium text-gray-700 mb-1"
          >
            Notas del Pedido (Opcional)
          </label>
          <textarea
            id="checkout-notes"
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

        <PaymentMethodSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
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
