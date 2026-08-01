"use client";

import { useState, useEffect } from "react";
import { Sparkles, Timer, Award } from "lucide-react";
import { OFFER_DEADLINE } from "@/constants/data";

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(OFFER_DEADLINE).getTime();

    const tick = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 p-5 sm:p-7 mb-8 shadow-xl border border-red-500/50 text-white">
      {/* Subtle decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative icon */}
      <div className="absolute top-2 right-4 opacity-10 pointer-events-none">
        <Award size={120} />
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        {/* Top Header Block */}
        <div className="text-center sm:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider mb-2.5 shadow-sm">
            <span className="text-sm leading-none">🇮🇩</span>
            <span className="text-white">PROMO SPESIAL HUT RI KE-81</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight mb-2">
            Promo Kemerdekaan: Cukup Bayar 81%!
          </h2>

          <p className="text-red-100 text-xs sm:text-sm leading-relaxed max-w-xl">
            Sambut semangat kemerdekaan dengan tingkatkan skill coding! Gunakan kode voucher{" "}
            <span className="inline-block bg-white text-red-700 font-mono font-extrabold px-2 py-0.5 rounded shadow-sm mx-0.5 tracking-wider text-xs sm:text-sm">
              MERDEKA81
            </span>{" "}
            untuk klaim promo — Anda hanya perlu membayar 81% saja!
          </p>
        </div>

        {/* Timer Section - Clean Row / Grid */}
        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-red-100 text-xs sm:text-sm font-medium">
            <Timer size={16} className="text-yellow-300 animate-pulse" />
            <span>Berakhir Dalam:</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full sm:w-auto">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-full sm:w-12 h-11 sm:h-13 flex items-center justify-center bg-black/25 backdrop-blur-md rounded-xl border border-white/20 shadow-inner px-2">
                  <span className="text-sm sm:text-lg font-bold font-mono text-white">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-red-100 uppercase font-semibold tracking-wider mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
