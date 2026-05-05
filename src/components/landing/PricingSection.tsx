import Link from "next/link";
import { Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";
import type { Bootcamp } from "@/types";

async function getActiveBootcamp(): Promise<Bootcamp | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("bootcamps")
      .select("*")
      .eq("is_active", true)
      .order("batch_number", { ascending: false })
      .limit(1)
      .single();
    return data;
  } catch {
    return null;
  }
}

const PACKAGE_FEATURES = {
  reguler: {
    label: "Reguler",
    description: "Cocok untuk belajar mandiri dengan komunitas",
    features: [
      { text: "Akses Materi 6 Bulan", included: true },
      { text: "Komunitas Discord", included: true },
      { text: "3 Proyek Portfolio", included: true },
      { text: "Sertifikasi BNSP", included: false },
      { text: "Mentoring 1-on-1", included: false },
    ],
    popular: false,
  },
  premium: {
    label: "Premium (BNSP)",
    description: "Paket lengkap menuju karir profesional",
    features: [
      { text: "Akses Materi Seumur Hidup", included: true },
      { text: "Ujian Sertifikasi BNSP", included: true },
      { text: "1-on-1 Mentoring", included: true },
      { text: "5+ Proyek Portfolio", included: true },
      { text: "Career Support & Hiring", included: true },
    ],
    popular: true,
  },
  intensif: {
    label: "Intensif",
    description: "Bootcamp offline full-time dengan fasilitas",
    features: [
      { text: "Semua Fitur Premium", included: true },
      { text: "Belajar Offline (Jogja)", included: true },
      { text: "Fasilitas Coworking Space", included: true },
      { text: "Jaminan Disalurkan Kerja", included: true },
    ],
    popular: false,
  },
} as const;

export async function PricingSection() {
  const bootcamp = await getActiveBootcamp();

  const prices = {
    reguler: bootcamp?.price_reguler ?? 3_500_000,
    premium: bootcamp?.price_premium ?? 5_800_000,
    intensif: bootcamp?.price_intensif ?? 12_500_000,
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Investasi Karir</span>
          <h2
            className="heading-lg mt-2 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pilih Paket Mu
          </h2>
          <p className="text-gray-500">
            Semua paket sudah termasuk akses materi seumur hidup + sertifikat
            BNSP.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {(["reguler", "premium", "intensif"] as const).map((key) => {
            const pkg = PACKAGE_FEATURES[key];
            const price = prices[key];
            const isPopular = pkg.popular;

            return (
              <div
                key={key}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  isPopular
                    ? "bg-violet-700 text-white shadow-2xl shadow-violet-900/20 scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      Paling Populer
                    </span>
                  </div>
                )}

                {/* Package info */}
                <div className="mb-5">
                  <h3
                    className={`text-xl font-bold mb-1 ${isPopular ? "text-white" : "text-gray-900"}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {pkg.label}
                  </h3>
                  <p
                    className={`text-sm ${isPopular ? "text-violet-200" : "text-gray-500"}`}
                  >
                    {pkg.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className={`text-4xl font-extrabold ${isPopular ? "text-white" : "text-gray-900"}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {formatCurrency(price)}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {pkg.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-sm">
                      {f.included ? (
                        <Check
                          size={16}
                          className={`shrink-0 ${isPopular ? "text-violet-200" : "text-violet-600"}`}
                        />
                      ) : (
                        <X
                          size={16}
                          className={`shrink-0 ${isPopular ? "text-violet-400" : "text-gray-300"}`}
                        />
                      )}
                      <span
                        className={
                          f.included
                            ? isPopular
                              ? "text-white"
                              : "text-gray-700"
                            : isPopular
                              ? "text-violet-400"
                              : "text-gray-400"
                        }
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/daftar"
                  className={`block text-center py-3 rounded-full font-semibold transition-all ${
                    isPopular
                      ? "bg-white text-violet-700 hover:bg-violet-50"
                      : "border-2 border-violet-700 text-violet-700 hover:bg-violet-50"
                  }`}
                >
                  Pilih {pkg.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
