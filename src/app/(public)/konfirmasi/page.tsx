import type { Metadata } from "next";
import { ConfirmationContent } from "@/components/landing/ConfirmationContent";

export const metadata: Metadata = {
  title: "Konfirmasi Pendaftaran",
  description: "Pendaftaran Anda berhasil. Hubungi admin untuk konfirmasi lebih lanjut.",
  robots: { index: false, follow: false },
};

export default function KonfirmasiPage() {
  return (
    <div className="min-h-screen landing-bg flex items-center justify-center py-20">
      <div className="container mx-auto px-4 max-w-xl">
        <ConfirmationContent />
      </div>
    </div>
  );
}
