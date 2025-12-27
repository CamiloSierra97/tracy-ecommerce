import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import AuthTrigger from "./AuthTrigger";

export default async function UserMenu() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="user-menu flex items-center gap-3">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "User Avatar"}
            width={24}
            height={24}
            className="user-menu__avatar rounded-full border border-gold"
          />
        ) : (
          <div className="user-menu__avatar-placeholder size-6 rounded-full bg-gold/20 flex items-center justify-center text-gold">
            <span className="text-[10px] font-bold">
              {session.user.name?.[0] ?? "U"}
            </span>
          </div>
        )}
        <form
          className="user-menu__logout-form"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="user-menu__logout-btn text-sm font-secondary font-medium hover:underline text-gold"
          >
            Salir
          </button>
        </form>
      </div>
    );
  }

  return <AuthTrigger />;
}
