"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const baseLogos = [
  { name: "Partner 1", src: "/logos/partner-1.jpg", width: 110 },
  { name: "Partner 2", src: "/logos/partner-2.jpg", width: 110 },
  { name: "Partner 3", src: "/logos/partner-3.jpg", width: 110 },
  { name: "Partner 4", src: "/logos/partner-4.jpg", width: 110 },
  { name: "Partner 6", src: "/logos/partner-6.jpg", width: 110 },
  { name: "SMK Budi Mulia", src: "/logos/smk.jpeg", width: 110 },
];

// Buat 16 item untuk mengisi 2 baris (8 item per baris) agar penuh dan tidak terlihat kosong
const logos = [
  ...baseLogos,
  baseLogos[0], baseLogos[1],
  ...baseLogos,
  baseLogos[2], baseLogos[3],
];

const ROW_1 = logos.slice(0, 8);
const ROW_2 = logos.slice(8);

function LogoCard({ name, src, width }: { name: string; src: string; width: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white border border-slate-200 rounded-xl px-4 py-4 min-w-[150px] w-[150px] h-[80px] transition-all duration-200 hover:border-violet-300 hover:shadow-[0_4px_20px_rgba(124,58,237,0.12)] hover:-translate-y-0.5 shrink-0 group">
      {!imgError ? (
        <img
          src={src}
          alt={`Logo ${name}`}
          className="object-contain max-h-[40px] w-auto transition-all duration-300 mix-blend-multiply filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
          style={{ maxWidth: width }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-semibold text-slate-400 text-xs tracking-wide text-center">{name}</span>
      )}
    </div>
  );
}

function MarqueeRow({ items, direction = "left", speed = 30 }: { items: typeof logos; direction?: "left" | "right"; speed?: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (rowRef.current) {
      rowRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (rowRef.current) {
      rowRef.current.style.animationPlayState = "running";
    }
  };

  const duplicated = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        ref={rowRef}
        className={cn("flex gap-4 w-max", direction === "left" ? "animate-marquee-left" : "animate-marquee-right")}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

export function TrustedSection() {
  return (
    <section className="py-20 overflow-hidden bg-white relative">
      <div className="text-center mb-14 px-6 relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-3.5 py-1.5 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Dipercaya
        </span>
        <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.2] text-slate-900 tracking-tight mb-4">
          Creativemu Academy telah<br />
          <span className="bg-gradient-to-br from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            dipercaya oleh
          </span>
        </h2>
        <p className="text-base text-slate-500 m-0 leading-relaxed">
          Ribuan profesional dan institusi terkemuka telah bergabung bersama kami
        </p>
      </div>

      <div className="relative flex flex-col gap-4">
        {/* Fade gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-[200px] z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-[200px] z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        
        <MarqueeRow items={ROW_1} direction="left" speed={35} />
        <MarqueeRow items={ROW_2} direction="right" speed={28} />
      </div>

      {/* Global styles for the keyframes since Tailwind arbitrary values for keyframes can be messy */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: scrollLeft linear infinite;
        }
        .animate-marquee-right {
          animation: scrollRight linear infinite;
        }
      `}} />
    </section>
  );
}
