import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { OrderData, BillingAddress } from "@/services/WooCommerceService";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  notes: string;
}

export type PaymentMethod = "cod" | "wompi";

export function useCheckout() {
  const { cartItems, cartTotal, clearCart, coupon } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CheckoutFormData>({
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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWompiPayment = async (orderId: string, total: number) => {
    try {
      const response = await fetch("/api/payment/wompi-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: orderId,
          amount: total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error al iniciar pago con Wompi");
      }

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

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (cartItems.length === 0) {
        throw new Error(
          "El carrito está vacío. Agrega productos antes de pagar.",
        );
      }

      const billingData: BillingAddress = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address_1: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode || "00000",
        country: "CO",
      };

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
          ...billingData,
        },
        line_items: lineItems,
        coupon_lines: coupon ? [{ code: coupon.code }] : undefined,
      };

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
      const orderNumber = result.orderNumber || orderId.toString();

      if (paymentMethod === "wompi") {
        await handleWompiPayment(orderNumber, cartTotal);
      } else {
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

  return {
    formData,
    handleChange,
    paymentMethod,
    setPaymentMethod,
    isSubmitting,
    error,
    submitOrder,
    cartTotal,
  };
}
