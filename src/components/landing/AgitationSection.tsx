import { DANGER_POINTS } from "@/constants/data";

export function AgitationSection() {
  return (
    <section id="agitation" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 mb-6">
            <span className="text-base">⚠️</span>
            <span className="text-sm font-semibold text-amber-800 tracking-wide uppercase">
              Konsekuensi Menunda
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
            Kalau Dibiarkan, Bukan Cuma{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Skill yang Tertinggal
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Setiap bulan yang terlewat tanpa aksi, konsekuensinya makin berat.
          </p>
        </div>

        {/* ── Danger Cards ───────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {DANGER_POINTS.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 transition-all hover:border-violet-300 hover:shadow-sm scroll-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number Badge */}
              <div className="size-10 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-violet-700">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-[16px] leading-snug mb-1.5">
                  {point.title}
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Closing Emotional Quote ─────────────────────── */}
        <div className="mt-12 text-center scroll-animate">
          <div className="inline-block max-w-2xl">
            <blockquote className="relative px-6 py-5">
              {/* Decorative quote marks */}
              <span
                className="absolute -top-2 -left-1 text-5xl text-violet-200 leading-none pointer-events-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed italic">
                Kalau caranya nggak berubah, hasilnya pun nggak akan berubah
                — berapapun banyak video tutorial yang kamu tonton.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
