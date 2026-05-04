import Link from "next/link";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
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
      .eq("is_open", true)
      .order("batch_number", { ascending: false })
      .limit(1)
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function HeroSection() {
  const bootcamp = await getActiveBootcamp();

  return (
    <section
      id="hero"
      className="relative min-h-screen landing-bg flex items-center pt-16 overflow-hidden"
    >
      {/* Background orbs */}
      <div
        className="absolute top-20 right-10 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(60% 0.22 285), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-60 h-60 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(65% 0.2 300), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200 mb-6 animate-fade-up">
              <Shield size={14} className="text-violet-600" />
              <span className="text-sm font-semibold text-violet-700">
                Sertifikasi Resmi BNSP
              </span>
            </div>

            {/* Headline */}
            <h1
              className="heading-xl mb-6 animate-fade-up delay-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Jadi Digital Marketer{" "}
              <span className="gradient-text">Profesional</span>{" "}
              Siap Kerja dalam 6 Bulan
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-up delay-200">
              Bootcamp intensif berbasis proyek nyata + mentoring hingga kamu
              siap masuk industri dan tersertifikasi BNSP.
            </p>

            {/* Urgency */}
            {bootcamp && (
              <p className="text-sm font-semibold text-violet-600 mb-6 animate-fade-up delay-300">
                ✨ Amankan Kursimu Sekarang!
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-400">
              <Link
                href="/daftar"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-violet-700 text-white font-semibold hover:bg-violet-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Daftar Batch Sekarang
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="https://wa.me/6285177114036?text=Halo+Admin+Creativemu+Academy%2C+saya+ingin+konsultasi+tentang+program"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-violet-300 text-violet-700 font-semibold hover:bg-violet-50 transition-all"
              >
                Konsultasi Gratis
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-6 mt-8 animate-fade-up delay-500">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users size={16} className="text-violet-500" />
                <span>100+ alumni</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield size={16} className="text-violet-500" />
                <span>Terverifikasi BNSP</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} className="text-violet-500" />
                <span>6 bulan program</span>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up delay-300">
            {/* Main image/mockup container */}
            <div className="relative">
              {/* Placeholder image frame */}
              <div
                className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                style={{ aspectRatio: "4/3" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎓</div>
                    <p className="text-violet-700 font-semibold">
                      Creativemu Academy
                    </p>
                    <p className="text-violet-500 text-sm mt-1">
                      Bootcamp Digital Marketing
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating batch info card */}
              {bootcamp && (
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-violet-100 min-w-[200px] animate-float">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-8 rounded-full bg-violet-100 flex items-center justify-center">
                      <span className="text-violet-600 text-xs font-bold">
                        {bootcamp.batch_number}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        Batch {bootcamp.batch_number}
                      </p>
                      <p className="text-xs text-orange-500 font-medium">
                        Pendaftaran Segera Ditutup
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Kapasitas Terisi</span>
                    <span className="font-bold text-violet-700">
                      Terbatas!
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 bg-violet-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              )}

              {/* Price chip */}
              {bootcamp && (
                <div className="absolute -top-3 -right-3 bg-violet-700 text-white rounded-2xl px-4 py-2 shadow-lg">
                  <p className="text-xs opacity-75">Mulai dari</p>
                  <p className="font-bold text-sm">
                    {formatCurrency(bootcamp.price_reguler)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
