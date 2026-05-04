// Hardcoded curriculum roadmap — can be migrated to DB later
const CURRICULUM = [
  {
    month: 1,
    title: "Fondasi Digital Marketing",
    description:
      "Pengenalan dunia digital marketing, mindset marketer profesional, penguasaan tools dasar, dan strategi konten media sosial.",
    isFinal: false,
  },
  {
    month: 2,
    title: "Social Media Marketing",
    description:
      "Pengelolaan Instagram, TikTok, Facebook secara profesional. Membuat konten viral, jadwal posting, dan analisis engagement.",
    isFinal: false,
  },
  {
    month: 3,
    title: "Paid Advertising (Meta & Google Ads)",
    description:
      "Membuat dan mengoptimalkan iklan berbayar di Meta Ads dan Google Ads. Targeting, copywriting iklan, dan optimasi ROAS.",
    isFinal: false,
  },
  {
    month: 4,
    title: "SEO & Content Marketing",
    description:
      "Riset kata kunci, on-page & off-page SEO, pembuatan konten SEO-friendly, dan strategi inbound marketing.",
    isFinal: false,
  },
  {
    month: 5,
    title: "E-Commerce & Marketplace Marketing",
    description:
      "Optimasi toko di Shopee, Tokopedia, dan Lazada. Iklan marketplace, manajemen produk, dan analisis penjualan.",
    isFinal: false,
  },
  {
    month: 6,
    title: "Capstone Project & Sertifikasi BNSP",
    description:
      "Mengerjakan proyek akhir berskala nyata secara tim. Persiapan intensif dan pelaksanaan ujian sertifikasi kompetensi BNSP.",
    isFinal: true,
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 landing-bg">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="heading-lg mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Perjalanan 6 Bulan Anda
          </h2>
          <p className="text-gray-500">
            Kurikulum komprehensif dari fundamental hingga tingkat mahir.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-6">
          {/* Vertical line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-violet-200 hidden sm:block" />

          {CURRICULUM.map((item, i) => (
            <div
              key={item.month}
              className="relative flex gap-6 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Number badge */}
              <div className="relative z-10 shrink-0">
                <div className="size-16 rounded-full bg-violet-700 text-white flex items-center justify-center font-bold text-lg shadow-lg"
                  style={{ fontFamily: "var(--font-display)" }}>
                  {item.month}
                </div>
              </div>

              {/* Card */}
              <div
                className={`flex-1 bg-white rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md ${
                  item.isFinal
                    ? "border-violet-300 ring-1 ring-violet-200"
                    : "border-gray-100"
                }`}
              >
                {item.isFinal && (
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-600 mb-3 uppercase tracking-wider">
                    Final Stage
                  </span>
                )}
                <h3
                  className="font-semibold text-gray-900 mb-1.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Bulan {item.month}: {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
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
