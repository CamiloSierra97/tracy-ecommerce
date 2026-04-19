import { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login | Tracy Lencería",
  description: "Acceso administrativo para Tracy Lencería.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
