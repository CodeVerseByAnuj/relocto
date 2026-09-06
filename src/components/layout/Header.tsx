import { Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { MainNavigation } from "@/components/navigation/MainNavigation";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { LocationSearch } from "@/components/sections/locations/LocationSearch";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-b-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6 lg:gap-6 lg:px-10 lg:py-4">
        <Logo />
        <MainNavigation className="lg:gap-6" />
        <LocationSearch
          tone="light"
          placeholder="Find your city"
          className="ml-auto hidden w-52 lg:block xl:w-60"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="icon-lg"
            className="lg:hidden"
            render={
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                aria-label={`Call ${SITE_CONFIG.phone}`}
              />
            }
          >
            <Phone />
          </Button>
          <Button
            variant="primary"
            size="xl"
            className="hidden lg:inline-flex"
            render={<a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} />}
          >
            <Phone data-icon="inline-start" />
            Call Now {SITE_CONFIG.phone}
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
