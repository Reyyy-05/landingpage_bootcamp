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

const SINGLE_PACKAGE = {
  label: "Bootcamp Laravel Full Online",
  description: "Paket lengkap belajar dari dasar hingga mahir, full online selama Juni - Oktober.",
  features: [
    { text: "Akses Materi & Rekaman Selamanya", included: true },
    { text: "Sertifikasi Resmi BNSP", included: true },
    { text: "Mentoring & Tanya Jawab Langsung", included: true },
    { text: "Pembuatan 3+ Proyek Portfolio Nyata", included: true },
    { text: "Career Support & Kesempatan Job Connection", included: true },
  ],
};

export async function PricingSection() {
  const bootcamp = await getActiveBootcamp();

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Investasi Karir</span>
          <h2
            className="heading-lg mt-2 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Program & Fasilitas
          </h2>
          <p className="text-gray-500">
            Dapatkan pengalaman belajar terbaik dengan fasilitas komprehensif.
          </p>
        </div>

        {/* Single Pricing Card */}
        <div className="relative rounded-2xl p-8 md:p-10 bg-violet-700 text-white shadow-2xl shadow-violet-900/20 flex flex-col md:flex-row gap-10 items-center justify-between border border-violet-600">
          
          <div className="flex-1">
            {/* Package info */}
            <div className="mb-6">
              <span className="bg-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide inline-block mb-4">
                Pendaftaran Terbatas
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold mb-2 text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {SINGLE_PACKAGE.label}
              </h3>
              <p className="text-sm md:text-base text-violet-200">
                {SINGLE_PACKAGE.description}
              </p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 mb-8">
              {SINGLE_PACKAGE.features.map((f) => (
                <li key={f.text} className="flex items-start gap-3 text-sm md:text-base">
                  <Check
                    size={20}
                    className="shrink-0 text-violet-200 mt-0.5"
                  />
                  <span className="text-white">
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-auto flex flex-col items-center justify-center shrink-0 min-w-[250px] p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="text-violet-100 text-sm mb-4 text-center">Gunakan kode voucher <strong>LVBOOT</strong> untuk diskon tambahan!</p>
            <Link
              href="/daftar"
              className="w-full text-center py-4 px-8 rounded-full font-bold transition-all bg-white text-violet-700 hover:bg-violet-50 hover:scale-105 shadow-xl"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
