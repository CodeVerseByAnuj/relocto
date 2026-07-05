import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/hero/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <HeroSection />
    </div>
  );
}
