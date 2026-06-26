const CURRICULUM = [
  {
    month: 1,
    title: "PHP Fundamentals & OOP",
    description: "Bangun fondasi kuat dalam PHP mencakup sintaks dasar, logika, dan konsep OOP termasuk kelas, objek, pewarisan, serta praktik clean code.",
    isFinal: false,
    colorClass: "bg-blue-600",
  },
  {
    month: 2,
    title: "Laravel Fundamentals & Implementation",
    description: "Pelajari arsitektur MVC, routing, manajemen database, lalu terapkan keahlianmu dengan membangun proyek dunia nyata secara mandiri dan kolaborasi tim.",
    isFinal: false,
    colorClass: "bg-violet-600",
  },
  {
    month: 3,
    title: "Capstone Project & Portfolio Showcase",
    description: "Selesaikan proyek akhir berstandar industri, bangun portfolio profesional, dan siapkan dirimu untuk memasuki dunia kerja sebagai Full-Stack Developer.",
    isFinal: true,
    colorClass: "bg-orange-600",
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 landing-bg">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-slate-900 leading-[1.2] tracking-tight mb-4">
            Perjalanan Belajar 3 Bulanmu
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kurikulum komprehensif dari dasar hingga menjadi ahli yang siap kerja.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-6">
          {/* Vertical line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-slate-200 hidden sm:block" />

          {CURRICULUM.map((item, i) => (
            <div
              key={item.month}
              className="relative flex gap-6 scroll-animate"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Number badge */}
              <div className="relative z-10 shrink-0">
                <div className={`size-16 rounded-full text-white flex items-center justify-center font-bold text-xl shadow-lg ${item.colorClass}`}>
                  {item.month}
                </div>
              </div>

              {/* Card */}
              <div
                className={`flex-1 bg-white rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md ${
                  item.isFinal
                    ? "border-orange-300 ring-1 ring-orange-100"
                    : "border-slate-100 hover:border-slate-300"
                }`}
              >
                {item.isFinal && (
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 mb-3 uppercase tracking-wider">
                    Final Stage
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Bulan {item.month}: {item.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
