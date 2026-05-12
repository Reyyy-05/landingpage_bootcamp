"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MessageSquareMore, ArrowLeft, Copy } from "lucide-react";
import { toast } from "sonner";
import { sendGAEvent } from "@next/third-parties/google";

export function ConfirmationContent() {
  const params = useSearchParams();

  const studentId = params.get("id") ?? "";
  const studentName = params.get("name") ?? "Peserta";
  const programName = params.get("program") ?? "Program Creativemu Academy";
  const waLink = params.get("wa") ?? `https://wa.me/6285177114036`;

  const shortId = studentId.slice(0, 8).toUpperCase();

  // Trigger conversion tracking saat halaman berhasil dimuat
  useEffect(() => {
    // 1. Google Analytics Event
    sendGAEvent("event", "generate_lead", {
      event_category: "registration",
      event_label: programName,
    });

    // 2. Meta Pixel Event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: programName,
        currency: "IDR",
      });
    }
  }, [programName]);

  const copyId = () => {
    navigator.clipboard.writeText(studentId);
    toast.success("Nomor registrasi disalin!");
  };

  return (
    <div className="flex flex-col items-center">
      {/* Success icon */}
      <div className="relative mb-6">
        <div className="size-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={52} className="text-green-500" />
        </div>
        {/* Ring animation */}
        <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping opacity-40" />
      </div>

      {/* Main card */}
      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 px-8 py-6 text-white text-center">
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pendaftaran Berhasil! 🎉
          </h1>
          <p className="text-green-100 text-sm mt-1">
            Data kamu sudah kami terima
          </p>
        </div>

        <div className="p-8">
          {/* Registrant info */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 flex flex-col gap-3">
            <div className="flex justify-between items-start text-sm">
              <span className="text-gray-500 font-medium">Nama</span>
              <span className="text-gray-900 font-semibold text-right max-w-[60%]">
                {studentName}
              </span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between items-start text-sm">
              <span className="text-gray-500 font-medium">Program</span>
              <span className="text-gray-900 font-semibold text-right max-w-[60%]">
                {programName}
              </span>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                <span className="size-1.5 rounded-full bg-amber-400" />
                Menunggu Konfirmasi
              </span>
            </div>
            {studentId && (
              <>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">No. Registrasi</span>
                  <button
                    onClick={copyId}
                    className="flex items-center gap-1.5 text-violet-700 font-mono font-semibold hover:text-violet-900 transition-colors"
                  >
                    #{shortId}
                    <Copy size={12} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h2
              className="font-semibold text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Langkah Selanjutnya
            </h2>
            <ol className="flex flex-col gap-3">
              {[
                "Klik tombol di bawah untuk chat dengan Admin via WhatsApp",
                'Kirimkan pesan konfirmasi pendaftaran dengan menyebut nomor registrasi (#' + shortId + ')',
                "Admin akan memverifikasi data dan mengirimkan informasi pembayaran",
                "Setelah pembayaran dikonfirmasi, kamu resmi terdaftar!",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-600">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA: WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all hover:shadow-lg text-base"
          >
            <MessageSquareMore size={20} />
            Chat Admin via WhatsApp
          </a>

          {/* Back to home */}
          <Link
            href="/"
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-medium text-sm hover:border-gray-300 hover:text-gray-700 transition-all"
          >
            <ArrowLeft size={15} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-gray-400 text-center max-w-xs">
        Simpan nomor registrasi kamu. Jika ada kendala, hubungi admin dengan menyebutkan nomor tersebut.
      </p>
    </div>
  );
}
