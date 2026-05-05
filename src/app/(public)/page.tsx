import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedSection } from "@/components/landing/TrustedSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { FAQSection } from "@/components/landing/FAQSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <FeaturesSection />
      <RoadmapSection />
      <PricingSection />
      <CTASection />
      <FAQSection />
    </>
  );
}
