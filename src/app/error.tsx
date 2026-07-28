"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Router Error Caught]:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 max-w-md w-full">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Terjadi Kesalahan Sistem
        </h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Mohon maaf, terjadi kendala saat memuat halaman ini. Silakan klik tombol di bawah untuk mencoba kembali.
        </p>
        <button
          onClick={() => reset()}
          className="w-full py-3 px-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md active:scale-[0.98] inline-flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} /> Coba Muat Ulang
        </button>
      </div>
    </div>
  );
}
