import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 mb-4 animate-bounce">
        <Loader2 size={24} className="animate-spin" />
      </div>
      <p className="text-sm font-semibold text-slate-600 tracking-wide">
        Memuat Halaman Creativemu Academy...
      </p>
    </div>
  );
}
