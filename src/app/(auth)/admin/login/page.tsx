import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/dashboard/AdminLoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login Admin | Creativemu Academy",
  description: "Halaman login admin Creativemu Academy",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[var(--color-sidebar)] flex items-center justify-center p-4">
      <Suspense fallback={<div className="w-full max-w-sm h-96 bg-white rounded-2xl animate-pulse"></div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
