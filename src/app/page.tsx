import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { ServicesShowcaseSection } from "@/components/sections/services/ServicesShowcaseSection";
import { WhyChooseUsSection } from "@/components/sections/features/WhyChooseUsSection";
import { IndustriesSection } from "@/components/sections/industries/IndustriesSection";
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
      <ServicesShowcaseSection />
      <WhyChooseUsSection />
      <AboutSection />
      <RelocationMethodSection />
      <IndustriesSection />
      <GlobalCoverageSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
