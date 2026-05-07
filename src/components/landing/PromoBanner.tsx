"use client";

import { useState, useEffect } from "react";
import { TicketPercent, Timer, Sparkles } from "lucide-react";

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: May 20, 2026 at 23:59:59
    const targetDate = new Date("2026-05-20T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-800 p-6 sm:p-8 mb-10 shadow-lg border border-violet-500/30 text-white">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10">
        <Sparkles size={160} />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-8 -translate-x-8 opacity-10">
        <TicketPercent size={120} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-amber-300" />
            <span className="text-amber-100">Promo Spesial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight text-white">
            Diskon Rp 250.000!
          </h2>
          <p className="text-violet-100 text-sm sm:text-base leading-relaxed">
            Gunakan kode voucher <span className="inline-block bg-white text-violet-900 font-mono font-bold px-2 py-0.5 rounded shadow-sm mx-1 selection:bg-violet-200">LVBOOT</span> pada formulir di bawah untuk mendapatkan potongan harga eksklusif.
          </p>
        </div>

        <div className="flex flex-col items-center shrink-0">
          <div className="flex items-center gap-2 text-violet-200 text-sm mb-3">
            <Timer size={16} />
            <span>Berakhir dalam:</span>
          </div>
          <div className="flex gap-3">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item, i) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-inner mb-1">
                  <span className="text-xl sm:text-2xl font-bold font-mono">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-violet-200 uppercase font-medium tracking-wider">
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
