"use client";

import { useState, useEffect } from "react";
import { Flame, Timer, Zap } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 p-6 sm:p-8 mb-10 shadow-xl border border-orange-400/40 text-white">
      {/* Animated background pulse */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 via-transparent to-orange-300/10 animate-pulse" />
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-10 translate-x-10 opacity-10">
        <Flame size={160} />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-6 -translate-x-6 opacity-10">
        <Zap size={120} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex-1">
          {/* Flash Sale badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/30 backdrop-blur-md border border-yellow-300/50 text-xs font-bold uppercase tracking-wider mb-3 animate-bounce">
            <Flame size={14} className="text-yellow-200" />
            <span className="text-yellow-100">🔥 PROMO KILAT 1×24 JAM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight text-white drop-shadow-md">
            Potongan Rp 150.000!
          </h2>
          <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
            Gunakan kode voucher{" "}
            <span className="inline-block bg-white text-red-700 font-mono font-bold px-2.5 py-0.5 rounded shadow-md mx-1 selection:bg-orange-200 tracking-wider">
              FLASH150K
            </span>{" "}
            untuk mendapatkan potongan langsung Rp 150.000 setelah kelas gratis!
          </p>
        </div>

        <div className="flex flex-col items-center shrink-0">
          <div className="flex items-center gap-2 text-orange-200 text-sm mb-3">
            <Timer size={16} />
            <span>Berakhir dalam:</span>
          </div>
          <div className="flex gap-3">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-lg border border-white/20 shadow-inner mb-1">
                  <span className="text-xl sm:text-2xl font-bold font-mono">
                    {item.value.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-orange-200 uppercase font-medium tracking-wider">
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
