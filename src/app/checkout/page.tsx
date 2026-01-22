import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PageHero from "@/components/ui/PageHero";

export const metadata = {
  title: "Checkout | Tracy Lencería",
  description: "Finaliza tu compra segura en Tracy Lencería.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        title="Finalizar Compra"
        subtitle="Estás a un paso de tener tus prendas favoritas"
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Formulario (Izquierda) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <CheckoutForm
              onSuccess={(id) => console.log("Order success:", id)}
            />
          </div>

          {/* Resumen (Derecha Sticky) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
}
