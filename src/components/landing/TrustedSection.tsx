"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const logos = [
  { name: "Google", src: "/logos/google.svg", width: 80 },
  { name: "Microsoft", src: "/logos/microsoft.svg", width: 110 },
  { name: "Amazon Web Services", src: "/logos/aws.svg", width: 60 },
  { name: "IBM", src: "/logos/ibm.svg", width: 70 },
  { name: "Samsung", src: "/logos/samsung.svg", width: 100 },
  { name: "Lenovo", src: "/logos/lenovo.svg", width: 90 },
  { name: "Intel", src: "/logos/intel.svg", width: 60 },
  { name: "Ericsson", src: "/logos/ericsson.svg", width: 100 },
  { name: "LINE", src: "/logos/line.svg", width: 60 },
  { name: "XL Axiata", src: "/logos/xl-axiata.svg", width: 90 },
  { name: "Indosat Ooredoo", src: "/logos/indosat.svg", width: 100 },
  { name: "Lintasarta", src: "/logos/lintasarta.svg", width: 100 },
  { name: "DBS Foundation", src: "/logos/dbs.svg", width: 90 },
  { name: "Kemkominfo", src: "/logos/kemkominfo.svg", width: 70 },
  { name: "Kampus Merdeka", src: "/logos/kampus-merdeka.svg", width: 80 },
  { name: "Bangkit", src: "/logos/bangkit.svg", width: 90 },
];

const ROW_1 = logos.slice(0, 8);
const ROW_2 = logos.slice(8);

function LogoCard({ name, src, width }: { name: string; src: string; width: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center justify-center bg-white border border-slate-200 rounded-xl px-7 py-4 min-w-[160px] h-[72px] transition-all duration-200 hover:border-violet-300 hover:shadow-[0_4px_20px_rgba(124,58,237,0.12)] hover:-translate-y-0.5 shrink-0">
      {!imgError ? (
        <img
          src={src}
          alt={`Logo ${name}`}
          style={{ objectFit: "contain", height: 36, width: "auto", maxWidth: width }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-semibold text-slate-400 text-sm tracking-wide">{name}</span>
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
