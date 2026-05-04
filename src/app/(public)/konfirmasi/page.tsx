import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmationContent } from "@/components/landing/ConfirmationContent";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Konfirmasi Pendaftaran",
  description: "Pendaftaran Anda berhasil. Hubungi admin untuk konfirmasi lebih lanjut.",
  robots: { index: false, follow: false },
};

function ConfirmationFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-12 flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-green-500" />
    </div>
  );
}

export default function KonfirmasiPage() {
  return (
    <div className="min-h-screen landing-bg flex items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-xl">
        <Suspense fallback={<ConfirmationFallback />}>
          <ConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}
