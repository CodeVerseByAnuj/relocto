import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import { ServicesSection } from "@/components/sections/services/ServicesSection";
import { ServicesShowcaseSection } from "@/components/sections/services/ServicesShowcaseSection";
import { WhyChooseUsSection } from "@/components/sections/features/WhyChooseUsSection";
import { MobilityStatsSection } from "@/components/sections/features/MobilityStatsSection";
import { RelocationMethodSection } from "@/components/sections/process/RelocationMethodSection";
import { PartnersSection } from "@/components/sections/partners/PartnersSection";
import { GlobalCoverageSection } from "@/components/sections/coverage/GlobalCoverageSection";
import { TestimonialsSection } from "@/components/sections/testimonials/TestimonialsSection";
import { CTASection } from "@/components/sections/cta/CTASection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <HeroSection imageSrc="/images/poster.png" />
      <QuoteSection />
      <ServicesSection />
      <ServicesShowcaseSection />
      <WhyChooseUsSection />
      <MobilityStatsSection />
      <RelocationMethodSection />
      <PartnersSection />
      <GlobalCoverageSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
