import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FolderGit2, Users, Clock, Check } from "lucide-react";
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

  const phrase1 = "Sudah Lama Belajar,";
  const phrase2 = "Tapi Belum Siap Kerja?";
  
  const words1 = phrase1.split(" ");
  const words2 = phrase2.split(" ");
  
  let globalWordIndex = 0;

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

      {/* Ambient Aura Glow - slow spinning JDM-inspired radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] origin-center animate-spin-slow opacity-75"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(232,32,42,0.12) 0%, rgba(139,92,246,0.08) 35%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 lg:py-12">
          {/* Left: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Headline — Kinetic Heading split layout for zero hydration mismatch and screen reader support */}
            <h1 
              className="text-3xl md:text-5xl font-bold leading-[1.15] text-slate-900 mb-4 tracking-tight"
              aria-label={`${phrase1} ${phrase2}`}
            >
              <span aria-hidden="true" className="block">
                {words1.map((word, i) => {
                  const delay = globalWordIndex * 0.08;
                  globalWordIndex++;
                  return (
                    <span
                      key={`w1-${i}`}
                      className="inline-block animate-char-fade-in opacity-0 mr-[0.25em]"
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {word}
                    </span>
                  );
                })}
                <span className="block mt-1 text-violet-600">
                  {words2.map((word, i) => {
                    const delay = globalWordIndex * 0.08;
                    globalWordIndex++;
                    return (
                      <span
                        key={`w2-${i}`}
                        className="inline-block animate-char-fade-in opacity-0 mr-[0.25em]"
                        style={{ animationDelay: `${delay}s` }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base md:text-lg text-slate-600 mb-3 leading-relaxed max-w-xl scroll-animate scroll-animate-delay-100">
              Ubah kebingunganmu menjadi keahlian Full-Stack Laravel Developer siap industri dalam 3 bulan. Belajar lewat real-world project, mentoring 1-on-1, dan langsung bangun portfolio nyata.
            </p>

            {/* P3: Benefit Chips */}
            <div className="flex flex-wrap gap-2 max-w-max mb-5 scroll-animate scroll-animate-delay-100">
              <span className="chip inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-600 shrink-0" /> Project Nyata</span>
              <span className="chip inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-600 shrink-0" /> Mentoring 1-on-1</span>
              <span className="chip inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-600 shrink-0" /> Career Support</span>
              <span className="chip inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-violet-600 shrink-0" /> Job Referral</span>
            </div>

            {/* CTA Buttons — P2: fix outline button visibility with metallic sweep shimmer effect */}
            <div className="flex flex-col sm:flex-row gap-4 scroll-animate scroll-animate-delay-200">
              <Link
                href="/daftar"
                className="group btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
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
                className="btn-secondary btn-shimmer inline-flex items-center justify-center"
              >
                Konsultasi Program
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end scroll-animate scroll-animate-delay-300">
            <div className="relative w-full">
              <div className="w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/hero-frustrated.jpeg" 
                  alt="Frustrasi belajar coding sendiri — error terus tanpa mentor" 
                  width={600}
                  height={400}
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* P5: Revamped Stats Bar with Staggered Spring-Pop animations */}
        <div className="mt-4 mb-4">
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-icon stat-icon-purple animate-pop-bounce" style={{ animationDelay: "0.8s" }}>
                <Users size={24} />
              </div>
              <div className="stat-text">
                <span className="stat-number animate-pop-bounce block" style={{ animationDelay: "0.9s" }}>100+</span>
                <span className="stat-label">Alumni Sukses</span>
                <span className="stat-sub">Tersebar di 30+ perusahaan</span>
              </div>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <div className="stat-icon stat-icon-amber animate-pop-bounce" style={{ animationDelay: "1.0s" }}>
                <FolderGit2 size={24} />
              </div>
              <div className="stat-text">
                <span className="stat-number animate-pop-bounce block" style={{ animationDelay: "1.1s" }}>3+</span>
                <span className="stat-label">Real Project</span>
                <span className="stat-sub">Portfolio siap kerja</span>
              </div>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <div className="stat-icon stat-icon-emerald animate-pop-bounce" style={{ animationDelay: "1.2s" }}>
                <Clock size={24} />
              </div>
              <div className="stat-text">
                <span className="stat-number animate-pop-bounce block" style={{ animationDelay: "1.3s" }}>3 Bulan</span>
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
