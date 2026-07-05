import { Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { MainNavigation } from "@/components/navigation/MainNavigation";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 rounded-b-2xl bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md lg:px-10">
        <Logo />
        <MainNavigation />
        <Button
          variant="primary"
          size="xl"
          render={<a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} />}
        >
          <Phone data-icon="inline-start" />
          Call Now {SITE_CONFIG.phone}
        </Button>
      </div>
    </header>
  );
}
