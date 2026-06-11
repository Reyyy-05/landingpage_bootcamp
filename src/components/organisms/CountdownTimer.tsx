"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Timer } from "lucide-react";
import { OFFER_DEADLINE, WA_CTA } from "@/constants/data";

// ─── Types ────────────────────────────────────────────────────

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Helpers ──────────────────────────────────────────────────

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function calculateTimeRemaining(deadline: string): TimeRemaining | null {
  const now = Date.now();
  const target = new Date(deadline).getTime();
  const diff = target - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

// ─── Component ────────────────────────────────────────────────

export function CountdownTimer() {
  // Hydration-safe: initialize as null, populate only after mount.
  const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>(null);
  const [mounted, setMounted] = useState(false);

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeRemaining(OFFER_DEADLINE));
  }, []);

  useEffect(() => {
    // First tick — populates real values after client mount
    tick();
    setMounted(true);

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  // ── Expired state ──────────────────────────────────────────
  if (mounted && timeLeft === null) {
    return (
      <section id="countdown" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-lg font-semibold text-slate-600">
              Promo telah berakhir.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Hubungi admin untuk informasi harga terbaru.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ── Timer units (show placeholder dashes until mounted) ────
  const units: { label: string; value: string }[] = mounted && timeLeft
    ? [
        { label: "Hari", value: pad(timeLeft.days) },
        { label: "Jam", value: pad(timeLeft.hours) },
        { label: "Menit", value: pad(timeLeft.minutes) },
        { label: "Detik", value: pad(timeLeft.seconds) },
      ]
    : [
        { label: "Hari", value: "--" },
        { label: "Jam", value: "--" },
        { label: "Menit", value: "--" },
        { label: "Detik", value: "--" },
      ];

  return (
    <section id="countdown" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* ── Header ──────────────────────────────────────── */}
          <div className="px-6 sm:px-8 pt-8 pb-2 text-center">
            <div className="inline-flex items-center gap-2 text-violet-600 mb-3">
              <Timer size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Penawaran Terbatas
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Harga Spesial Berakhir Dalam
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Setelah waktu habis, harga kembali ke Rp 7.500.000
            </p>
          </div>

          {/* ── Timer Grid ──────────────────────────────────── */}
          <div className="px-6 sm:px-8 py-8">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="flex flex-col items-center bg-violet-50 border border-violet-100 rounded-xl py-4 sm:py-5 transition-colors"
                >
                  <span
                    className="text-3xl sm:text-4xl font-extrabold text-violet-700 leading-none tabular-nums"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {unit.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider mt-2">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA Section ─────────────────────────────────── */}
          <div className="border-t border-slate-100 px-6 sm:px-8 py-6 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Link
                href="/daftar"
                className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-violet-700 text-white font-semibold text-sm hover:bg-violet-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Daftar Sekarang
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href={WA_CTA.getConsultationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-violet-200 text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-all"
              >
                <MessageCircle size={16} className="text-green-500" />
                Konsultasi Dulu
              </a>
            </div>
            <p className="text-xs text-slate-400 text-center mt-4">
              Klik Daftar Sekarang untuk mengisi formulir, atau Hubungi Konsultasi jika ada pertanyaan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
