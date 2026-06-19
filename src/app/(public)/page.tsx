import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedSection } from "@/components/landing/TrustedSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { AgitationSection } from "@/components/landing/AgitationSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { MentorSection } from "@/components/landing/MentorSection";
import { ValueStackSection } from "@/components/organisms/ValueStackSection";
import { CountdownTimer } from "@/components/organisms/CountdownTimer";
import { FAQSection } from "@/components/landing/FAQSection";

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
