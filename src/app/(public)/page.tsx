import dynamic from "next/dynamic";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedSection } from "@/components/landing/TrustedSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { AgitationSection } from "@/components/landing/AgitationSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { MentorSection } from "@/components/landing/MentorSection";
import { ValueStackSection } from "@/components/organisms/ValueStackSection";

// Task 4: Dynamic import below-the-fold interactive components to optimize initial client bundle payload
const CountdownTimer = dynamic(
  () => import("@/components/organisms/CountdownTimer").then((mod) => mod.CountdownTimer),
  {
    loading: () => (
      <div className="py-12 bg-slate-50 text-center text-xs text-slate-400">
        Memuat penawaran...
      </div>
    ),
  }
);

const FAQSection = dynamic(
  () => import("@/components/landing/FAQSection").then((mod) => mod.FAQSection),
  {
    loading: () => (
      <div className="py-12 text-center text-xs text-slate-400">
        Memuat FAQ...
      </div>
    ),
  }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <ProblemSection />
      <AgitationSection />
      <FeaturesSection />
      <RoadmapSection />
      <MentorSection />
      <ValueStackSection />
      <CountdownTimer />
      <FAQSection />
    </>
  );
}
