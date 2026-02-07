import AdminRegisterClient from "./AdminRegisterClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin-session");
  return adminSession?.value === "authenticated";
}

export default async function AdminRegisterPage() {
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return <AdminRegisterClient />;
}
