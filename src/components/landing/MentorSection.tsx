import {
  CheckCircle2,
  MonitorPlay,
  Bug,
  FileCode2,
  CalendarCheck,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────

interface MethodFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────


const PROFILE_HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "Pedagogy & Teaching Authority",
    text: "4+ Tahun Pengalaman Mengajar Coding. Aktif sebagai Academic Coding Instructor di ekosistem Pijar Camp dan mantan Asisten Dosen UTDI yang telah membimbing ratusan pemula menjadi developer siap kerja.",
  },
  {
    icon: Briefcase,
    title: "Full-Stack Industry Track Record",
    text: "Eksperiens Lintas Industri. Berpengalaman membangun dan me-revamp aplikasi produksi berskala enterprise di sektor FinTech (amalan international), platform investasi (Emtrade/Ellen May Institute), hingga Software House menggunakan ekosistem Laravel, Vue.js, dan Next.js.",
  },
  {
    icon: Award,
    title: "Elite Academic & Global Certified",
    text: "Lulusan Terbaik Informatika (IPK 3.91). Peraih Juara 1 Beasiswa Widya Bakti, didukung oleh puluhan sertifikasi kompetensi industri dari Dicoding Academy, DQLab (Python & Data Science), hingga Progate.",
  },
] as const;

const METHOD_FEATURES: MethodFeature[] = [
  {
    icon: MonitorPlay,
    title: "Live Coding & Interactive Zoom Session",
    description:
      "Tatap muka langsung, bukan nonton video jadul.",
  },
  {
    icon: Bug,
    title: "Real-time Troubleshooting",
    description:
      "Eror saat koding? Mentor langsung bantu perbaiki via share screen saat itu juga.",
  },
  {
    icon: FileCode2,
    title: "1-on-1 Code Review",
    description:
      "Aset kode proyek Anda diperiksa standar industrinya langsung oleh mentor.",
  },
  {
    icon: CalendarCheck,
    title: "High-Accountability Ecosystem",
    description:
      "Jadwal terstruktur yang menjaga motivasi belajar Anda tetap stabil selama 6 bulan.",
  },
];

// ─── Component ────────────────────────────────────────────────

export function MentorSection() {
  return (
    <section id="mentor" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 mb-6">
            <span className="text-base">👨‍🏫</span>
            <span className="text-sm font-semibold text-violet-700 tracking-wide">
              Mentor & Metodologi
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
            Belajar Langsung dari{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Praktisi Industri
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Bukan kelas teori biasa — kamu akan dibimbing langsung oleh engineer
            aktif yang setiap hari menulis production code.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ─── Left Column: Mentor Profile ──────────────── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 h-full">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-32 h-32 min-w-[128px] rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 border-2 border-violet-200 overflow-hidden flex items-center justify-center">
                    <img
                      src="/images/avatar.png"
                      alt="Zaki Maliki"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-top rounded-full"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-2xl font-bold text-slate-900 mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Zaki Maliki
                  </h3>
                  <p className="text-sm font-semibold text-violet-600 mb-4">
                    Academic Coding Instructor & Full-Stack Engineer
                  </p>
                  {/* Profile Highlights as Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs font-medium border border-violet-100">
                      Active Bootcamp Coding Instructor
                    </span>
                    <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs font-medium border border-violet-100">
                      Ex-Informatics Assistant Lecturer
                    </span>
                    <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs font-medium border border-violet-100">
                      Full-Stack Web Engineer
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Highlights Details */}
              <div className="mt-8 flex flex-col gap-4">
                {PROFILE_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="size-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0 mt-0.5 border border-violet-100/60">
                        <Icon size={16} className="text-violet-600" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        <strong className="text-slate-900 font-semibold">{item.title}:</strong>{" "}
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom quote */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="bg-slate-50/50 p-4 border-l-4 border-violet-600 rounded-r-xl">
                  <blockquote className="text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;Saya percaya setiap orang bisa jadi developer handal —
                    asal dibimbing dengan cara yang benar, bukan cuma disuruh
                    nonton video.&rdquo;
                  </blockquote>
                  <p className="text-xs text-slate-500 mt-2 font-semibold">
                    — Zaki Maliki, Lead Mentor Creativemu Academy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Anti-Ecourse Card ──────────── */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-8 sm:p-10 text-white shadow-xl overflow-hidden h-full flex flex-col">
              {/* Decorative orb */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 pointer-events-none -translate-y-10 translate-x-10"
                style={{
                  background:
                    "radial-gradient(circle, white, transparent 70%)",
                }}
              />

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Anti-Ecourse Guarantee
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold leading-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                100% Live Interactive
                <br />
                On-Class
              </h3>
              <p className="text-violet-200 text-sm leading-relaxed mb-8">
                Kami tahu rasanya beli ecourse murah tapi berakhir ditumpuk dan
                tidak ditonton. Di Creativemu, Anda{" "}
                <strong className="text-white">dipaksa bisa</strong> melalui
                sistem kelas langsung.
              </p>

              {/* Feature Checklist */}
              <div className="flex flex-col gap-5 flex-1">
                {METHOD_FEATURES.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-violet-200" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-snug">
                          {feature.title}
                        </p>
                        <p className="text-xs text-violet-200/80 mt-0.5 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom accent */}
              <div className="mt-8 pt-5 border-t border-white/15 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                <p className="text-xs text-violet-200 leading-relaxed">
                  <strong className="text-white">Bukan video rekaman.</strong>{" "}
                  Setiap sesi dijadwalkan live — interaktif dan bisa tanya jawab
                  langsung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
