import { PROBLEM_POINTS } from "@/constants/data";

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-6">
            <span className="text-base">😵</span>
            <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Realitas Developer Otodidak
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
            Familiar dengan situasi yang{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              membuat frustrasi ini?
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Kalau salah satu dari ini pernah kamu rasakan, kamu tidak sendirian.
          </p>
        </div>

        {/* ── Pain Point Cards ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROBLEM_POINTS.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white rounded-2xl border border-slate-200 p-6 transition-all hover:border-slate-300 hover:shadow-sm scroll-animate"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Emoji */}
              <div className="size-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-2xl">
                {point.emoji}
              </div>

              {/* Text */}
              <p className="text-[15px] text-slate-700 leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* ── Closing Empathy Line ────────────────────────── */}
        <div className="mt-10 text-center scroll-animate">
          <p className="text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Masalah utamanya bukan di kamu — tapi di{" "}
            <span className="font-semibold text-slate-900">
              cara belajarnya yang nggak terstruktur.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
