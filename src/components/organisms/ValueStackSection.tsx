import {
  Code,
  FolderGit2,
  Award,
  UserCheck,
  Handshake,
  PlayCircle,
  Check,
  Sparkles,
} from "lucide-react";
import { VALUE_STACK_DATA, PRICING } from "@/constants/data";

// ── Icon map — matches the `icon` string in VALUE_STACK_DATA ──
const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  FolderGit2,
  Award,
  UserCheck,
  Handshake,
  PlayCircle,
};

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ValueStackSection() {
  return (
    <section id="value-stack" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 mb-6">
            <span className="text-base">💎</span>
            <span className="text-sm font-semibold text-violet-700 tracking-wide">
              Inklusi Program
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
            Fasilitas Premium yang{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Kamu Dapatkan
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Semua yang kamu butuhkan untuk berubah dari pemula menjadi
            developer siap kerja — sudah termasuk dalam satu paket.
          </p>
        </div>

        {/* ── Value Stack Items ──────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {VALUE_STACK_DATA.map((item, index) => {
              const Icon = ICON_MAP[item.icon] ?? Code;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 sm:gap-5 px-6 sm:px-8 py-5 transition-colors hover:bg-slate-50/50 scroll-animate"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  {/* Icon */}
                  <div className="size-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={20} className="text-violet-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-[15px] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Value */}
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-semibold text-slate-700 tabular-nums whitespace-nowrap">
                      {formatRupiah(item.value)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Total Value (Strikethrough) ────────────────── */}
          <div className="border-t-2 border-dashed border-slate-200 px-6 sm:px-8 py-5 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600 text-sm uppercase tracking-wider">
                Total Value
              </span>
              <span className="text-xl font-bold text-slate-400 line-through decoration-red-400 decoration-2 tabular-nums">
                {formatRupiah(PRICING.totalValue)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Special Offer Card ─────────────────────────── */}
        <div className="mt-8 scroll-animate">
          <div className="relative rounded-2xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-8 sm:p-10 text-white shadow-xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-8 translate-x-8 opacity-10 pointer-events-none">
              <Sparkles size={140} />
            </div>
            <div className="absolute bottom-0 left-0 translate-y-6 -translate-x-6 opacity-10 pointer-events-none">
              <Sparkles size={100} />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Left — Label + Price */}
              <div className="text-center sm:text-left">
                <p className="text-violet-200 text-sm font-medium mb-2 uppercase tracking-wider">
                  🔥 Harga Spesial Gelombang Ini
                </p>
                <div className="flex items-baseline gap-3 justify-center sm:justify-start">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {formatRupiah(PRICING.offerPrice)}
                  </span>
                </div>
                <p className="text-violet-200 text-sm mt-2">
                  untuk 3 bulan program intensif full online
                </p>
              </div>

              {/* Right — Savings Badge */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white">
                  <Check size={16} className="text-emerald-300" />
                  <span className="font-bold text-sm">
                    Hemat {formatRupiah(PRICING.savings)}
                  </span>
                </div>
                <span className="text-xs text-violet-300">
                  Dibanding beli terpisah
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
