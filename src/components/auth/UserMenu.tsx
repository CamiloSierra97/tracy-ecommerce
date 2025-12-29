import { auth } from "@/auth";
import AuthTrigger from "./AuthTrigger";
import UserDropdown from "./UserDropdown";

export default async function UserMenu() {
  const session = await auth();

  if (session?.user) {
    return <UserDropdown user={session.user} />;
  }

  return <AuthTrigger />;
}
