import OrderList from "@/components/profile/OrderList";
import PageHero from "@/components/ui/PageHero";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mi Cuenta | Tracy",
  description: "Gestiona tus pedidos y datos personales en Tracy.",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/acceder?callbackUrl=/perfil");
  }

  const user = session.user;

  return (
    <div className="page-profile">
      <PageHero
        title={`Hola, ${user?.name || "Bienvenida"}`}
        subtitle="Aquí puedes ver el historial de tus compras y gestionar tu cuenta."
        image="/images/hero-profile.webp" // Aseguraremos que haya un fallback visual o imagen genérica
      />

      <div className="page-profile__content max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar / Información de Usuario (Simplificado para MVP) */}
        <aside className="page-profile__sidebar w-full md:w-1/3 shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="size-16 rounded-full bg-burgundy text-white flex items-center justify-center text-2xl font-serif">
                {user?.name?.[0] || "U"}
              </div>
              <div>
                <p className="font-bold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500 break-all">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                className="w-full text-left px-4 py-2 rounded-lg bg-burgundy/5 text-burgundy font-medium"
                aria-current="page"
              >
                Mis Pedidos
              </button>
              {/* Futuras mejoras: Direcciones, Métodos de Pago, etc. */}
              <button
                className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors opacity-50 cursor-not-allowed"
                disabled
                title="Próximamente"
              >
                Direcciones (Próximamente)
              </button>
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href="/api/auth/signout"
                className="text-sm text-red-600 hover:text-red-800 font-medium px-4"
              >
                Cerrar Sesión
              </a>
            </div>
          </div>
        </aside>

        {/* Área Principal: Lista de Órdenes */}
        <main className="page-profile__main flex-1 min-w-0">
          <OrderList />
        </main>
      </div>
    </div>
  );
}
