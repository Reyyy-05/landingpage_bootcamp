import {
  Award,
  GraduationCap,
  BriefcaseBusiness,
  Handshake,
  LifeBuoy,
  BookOpen,
} from "lucide-react";
import { FEATURES } from "@/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  Award,
  GraduationCap,
  BriefcaseBusiness,
  Handshake,
  LifeBuoy,
  BookOpen,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Kenapa Creativemu?</span>
          <h2 className="heading-lg mt-2 mb-4">Keunggulan Program</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Kami bukan bootcamp biasa — setiap detail dirancang agar kamu siap
            kerja, bukan sekadar lulus.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 group">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? Award;
            
            // Bento layout sizing
            const colSpans = [
              "md:col-span-12 lg:col-span-8", // 1. BNSP (Large)
              "md:col-span-6 lg:col-span-4",  // 2. Mentor (Small)
              "md:col-span-6 lg:col-span-4",  // 3. Proyek (Small)
              "md:col-span-12 lg:col-span-8", // 4. Hire & Connection (Large)
              "md:col-span-6 lg:col-span-6",  // 5. Career Support (Medium)
              "md:col-span-6 lg:col-span-6",  // 6. Kurikulum Update (Medium)
            ];

            return (
              <div
                key={feature.title}
                className={`relative overflow-hidden p-8 sm:p-10 rounded-[2rem] border border-gray-200/60 bg-white/50 backdrop-blur-sm 
                  hover:bg-white hover:border-violet-200 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.1)] 
                  transition-all duration-500 ease-out scroll-animate 
                  group-hover:opacity-50 hover:!opacity-100 hover:-translate-y-1.5
                  ${colSpans[i] || "md:col-span-12"}
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Background Watermark Number */}
                <div className="absolute -right-8 -bottom-10 text-[180px] lg:text-[220px] leading-none font-bold text-gray-900/[0.03] pointer-events-none select-none" style={{ fontFamily: "var(--font-display)" }}>
                  0{i + 1}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-50 border border-violet-100/50 flex items-center justify-center mb-10 shadow-inner">
                    <Icon className="text-violet-600" size={26} strokeWidth={1.5} />
                  </div>
                  
                  <div className="mt-auto">
                    <h3
                      className={`font-bold text-gray-900 mb-3 ${i === 0 || i === 3 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                    >
                      {feature.title}
                    </h3>
                    <p className={`text-gray-500 leading-relaxed ${i === 0 || i === 3 ? 'text-base lg:text-lg max-w-xl' : 'text-sm'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
