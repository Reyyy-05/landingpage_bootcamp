import Link from "next/link";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
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
      className="hero-section relative landing-bg flex items-center pt-10 overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 lg:py-12">
          {/* Left: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Headline — P7: gradient shimmer on "Belum Siap Kerja?" */}
            <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] text-slate-900 mb-4 tracking-tight scroll-animate">
              Sudah Lama Belajar,{" "}
              <br />
              Tapi{" "}
              <span className="headline-gradient">
                Belum Siap Kerja?
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg text-slate-600 mb-3 leading-relaxed max-w-xl scroll-animate scroll-animate-delay-100">
              Ubah kebingunganmu menjadi keahlian Full-Stack Laravel Developer
              siap industri dalam 6 bulan. Belajar lewat real-world project,
              mentoring 1-on-1, dan kunci sertifikasi resmi BNSP kamu.
            </p>

            {/* P3: Benefit Chips */}
            <div className="grid grid-cols-2 gap-3 max-w-max mb-5 scroll-animate scroll-animate-delay-100">
              <span className="chip">✓ Project Nyata</span>
              <span className="chip">✓ Mentoring 1-on-1</span>
              <span className="chip">✓ Sertifikat BNSP</span>
              <span className="chip">✓ Job Referral</span>
            </div>

            {/* CTA Buttons — P2: fix outline button visibility */}
            <div className="flex flex-col sm:flex-row gap-4 scroll-animate scroll-animate-delay-200">
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
                className="btn-secondary inline-flex items-center justify-center"
              >
                Konsultasi Program
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end scroll-animate scroll-animate-delay-300">
            <div className="relative w-full">
              <div className="w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-frustrated.jpeg" 
                  alt="Frustrasi belajar coding sendiri — error terus tanpa mentor" 
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* P5: Revamped Stats Bar */}
        <div className="mt-4 mb-4">
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-icon stat-icon-purple">
                <Users size={24} />
              </div>
              <div className="stat-text">
                <span className="stat-number">100+</span>
                <span className="stat-label">Alumni Sukses</span>
                <span className="stat-sub">Tersebar di 30+ perusahaan</span>
              </div>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <div className="stat-icon stat-icon-amber">
                <Shield size={24} />
              </div>
              <div className="stat-text">
                <span className="stat-number">BNSP</span>
                <span className="stat-label">Sertifikasi Resmi</span>
                <span className="stat-sub">Diakui secara nasional</span>
              </div>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <div className="stat-icon stat-icon-emerald">
                <Clock size={24} />
              </div>
              <div className="stat-text">
                <span className="stat-number">6 Bulan</span>
                <span className="stat-label">Program Intensif</span>
                <span className="stat-sub">Terstruktur & terbimbing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
