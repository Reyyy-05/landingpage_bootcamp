import type { Metadata } from "next";
import { Suspense } from "react";
import { StudentRegistrationForm } from "@/components/landing/StudentRegistrationForm";
import { PromoBanner } from "@/components/landing/PromoBanner";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Daftar Sekarang",
  description:
    "Daftarkan diri Anda ke program Creativemu Academy dan mulai perjalanan karir digital Anda.",
};

function FormFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <Loader2 size={28} className="animate-spin text-violet-500" />
        <p className="text-sm">Memuat formulir...</p>
      </div>
    </div>
  );
}

export default function DaftarPage() {
  return (
    <div className="min-h-screen landing-bg py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <span className="section-label">Bergabung Sekarang</span>
          <h1 className="heading-lg mt-2 mb-3">Formulir Pendaftaran</h1>
          <p className="text-gray-600">
            Isi data diri Anda dengan lengkap dan benar. Setelah mendaftar,
            Anda akan diarahkan untuk konfirmasi via WhatsApp.
          </p>
        </div>
        
        <PromoBanner />
        
        <Suspense fallback={<FormFallback />}>
          <StudentRegistrationForm />
        </Suspense>
      </div>
    </div>
  );
}
