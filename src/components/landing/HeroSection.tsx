import Link from "next/link";
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

  const phrase1 = "Belajar Laravel dari Dasar Hingga Mahir.";
  const phrase2 = "Bikin Portofolio Project & Siap Kerja dalam 3 Bulan.";

  const words1 = phrase1.split(" ");
  const words2 = phrase2.split(" ");

  let globalWordIndex = 0;

  return (
    <section
      id="hero"
      className="hero-section relative flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(170deg, #f8f6ff 0%, #ffffff 40%, #fafafa 100%)",
      }}
    >
      {/* Subtle top-left accent — single, restrained */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(90% 0.06 285), transparent 70%)",
          opacity: 0.5,
        }}
      />

      <div className="container mx-auto px-5 sm:px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-16">
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            {/* Small label */}
            <div className="mb-4 scroll-animate">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-3.5 py-1.5">
                Batch 1 — Pendaftaran Dibuka
              </span>
            </div>

            {/* Headline — Kinetic Heading */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold leading-[1.18] text-slate-900 mb-5 tracking-tight"
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
                <span className="block mt-1 headline-gradient">
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
            <p className="text-base lg:text-lg text-slate-500 mb-6 leading-relaxed max-w-lg scroll-animate scroll-animate-delay-100">
              Pelatihan intensif berbasis praktik langsung. Kamu akan dibimbing
              mentor praktisi untuk menyelesaikan proyek web mandiri dan menyusun
              portofolio yang siap dipakai melamar kerja.
            </p>

            {/* Benefit Chips */}
            <div className="flex flex-wrap gap-2 mb-7 scroll-animate scroll-animate-delay-100">
              <span className="chip inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-violet-600 shrink-0" />{" "}
                Praktik Langsung
              </span>
              <span className="chip inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-violet-600 shrink-0" />{" "}
                Bimbingan Mentor
              </span>
              <span className="chip inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-violet-600 shrink-0" />{" "}
                Portofolio Project
              </span>
              <span className="chip inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-violet-600 shrink-0" />{" "}
                Rekomendasi Kerja
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 scroll-animate scroll-animate-delay-200">
              <Link
                href="/daftar"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-violet-600 text-white font-semibold text-[15px] hover:bg-violet-700 transition-all hover:shadow-md active:scale-[0.98]"
              >
                Daftar Sekarang
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="https://wa.me/6285177114036?text=Halo+Admin+Creativemu+Academy%2C+saya+ingin+konsultasi+tentang+program"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium text-[15px] hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50/50 transition-all active:scale-[0.98]"
              >
                Konsultasi Program
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex justify-center lg:justify-end scroll-animate scroll-animate-delay-200">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Image */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <img
                  src="/images/hero-frustrated.jpeg"
                  alt="Belajar coding dengan mentor — dari pemula hingga siap kerja"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating mini-card — bottom-left overlap */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white rounded-xl shadow-md border border-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                  <FolderGit2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-tight">3+ Real Project</p>
                  <p className="text-xs text-slate-500">Portofolio siap kerja</p>
                </div>
              </div>
              {/* Floating mini-card — top-right overlap */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-xl shadow-md border border-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-tight">100+ Alumni</p>
                  <p className="text-xs text-slate-500">di 30+ perusahaan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact stats strip */}
        <div className="border-t border-slate-200/80 pt-6 pb-2 scroll-animate scroll-animate-delay-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600">
                <Users size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 leading-none">100+</p>
                <p className="text-xs text-slate-500 mt-0.5">Alumni Sukses</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-slate-200" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <FolderGit2 size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 leading-none">3+</p>
                <p className="text-xs text-slate-500 mt-0.5">Real Project</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-slate-200" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 leading-none">3 Bulan</p>
                <p className="text-xs text-slate-500 mt-0.5">Program Intensif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
