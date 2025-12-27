import CartDetails from "@/components/cart/CartDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito de Compras | Tracy Lencería",
  description: "Revisa los artículos de la colección que has seleccionado.",
};

export default function CartPage() {
  return <CartDetails />;
}
