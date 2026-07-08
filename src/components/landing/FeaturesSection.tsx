import {
  Award,
  GraduationCap,
  BriefcaseBusiness,
  Handshake,
  LifeBuoy,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { FEATURES } from "@/constants";
import { HoverSpotlight } from "@/components/ui/HoverSpotlight";

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
          <span className="section-label inline-flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-violet-600 shrink-0" />
            Solusi yang Tepat
          </span>
          <h2 className="heading-lg mt-2 mb-4">Inilah yang Membedakan Creativemu Academy</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Semua masalah di atas? Kami sudah merancang solusinya satu per satu
            — supaya kamu nggak cuma belajar, tapi benar-benar siap kerja.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? Award;
            return (
              <HoverSpotlight
                key={feature.title}
                className="card-feature scroll-animate"
                style={{ animationDelay: `${i * 0.1}s` }}
                glowColor="rgba(139, 92, 246, 0.08)"
              >
                {/* Icon */}
                <div className="size-11 rounded-xl bg-violet-50 flex items-center justify-center mb-4 relative z-20">
                  <Icon className="text-violet-600" size={22} />
                </div>
                <h3
                  className="font-semibold text-gray-900 mb-2 relative z-20"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed relative z-20">
                  {feature.description}
                </p>
              </HoverSpotlight>
            );
          })}
        </div>
      </div>
    </section>
  );
}
