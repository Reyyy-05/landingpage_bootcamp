import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/dashboard/AdminLoginForm";

export const metadata: Metadata = {
  title: "Login Admin | Creativemu Academy",
  description: "Halaman login admin Creativemu Academy",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[var(--color-sidebar)] flex items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  );
}
