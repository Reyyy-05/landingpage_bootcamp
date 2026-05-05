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
          <div className="flex flex-col justify-center">
            {/* Headline */}
            <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] text-slate-900 mb-6 tracking-tight animate-fade-up">
              Jadi Full-Stack <br />
              <span className="bg-gradient-to-br from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Laravel Developer
              </span>{" "}
              <br />
              Siap Kerja dalam 6 Bulan
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-slate-600 mb-6 leading-relaxed max-w-lg animate-fade-up delay-100">
              Bootcamp intensif berbasis project nyata + mentoring hingga kamu siap masuk industri dan tersertifikasi BNSP.
            </p>

            {/* Urgency */}
            <p className="text-sm font-semibold text-violet-600 mb-6 animate-fade-up delay-[150ms]">
              ✨ Amankan Kursimu Sekarang!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
              <Link
                href="/daftar"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Daftar Sekarang
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="https://wa.me/6285177114036?text=Halo+Admin+Creativemu+Academy%2C+saya+ingin+konsultasi+tentang+program"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm"
              >
                Konsultasi Program
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up delay-300">
            <div className="relative w-full max-w-lg">
              <img 
                src="/images/aset-landing-page.png" 
                alt="CreativeMU Bootcamp" 
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Banner (Batas Hero) */}
        <div className="mt-8 mb-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-violet-500"></div>
            
            <div className="flex items-center gap-4 px-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Users size={24} className="text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 leading-none mb-1">100+</p>
                <p className="text-sm text-slate-500 font-medium">Alumni Sukses</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4 px-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Shield size={24} className="text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 leading-none mb-1">BNSP</p>
                <p className="text-sm text-slate-500 font-medium">Sertifikasi Resmi</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4 px-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Clock size={24} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 leading-none mb-1">6 Bulan</p>
                <p className="text-sm text-slate-500 font-medium">Program Intensif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
