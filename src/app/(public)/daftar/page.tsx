import type { Metadata } from "next";
import { StudentRegistrationForm } from "@/components/landing/StudentRegistrationForm";

export const metadata: Metadata = {
  title: "Daftar Sekarang",
  description:
    "Daftarkan diri Anda ke program Creativemu Academy dan mulai perjalanan karir digital Anda.",
};

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
        <StudentRegistrationForm />
      </div>
    </div>
  );
}
