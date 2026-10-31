import { Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { MainNavigation } from "@/components/navigation/MainNavigation";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";
import { getAboutMenu } from "@/lib/queries/aboutPage";
import { getLocationMenu } from "@/lib/queries/location";
import { getServiceMenu } from "@/lib/queries/serviceCategory";

export async function Header() {
  const [serviceMenu, locationMenu, aboutMenu] = await Promise.all([
    getServiceMenu(),
    getLocationMenu(),
    getAboutMenu(),
  ]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-b-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6 lg:gap-6 lg:px-10 lg:py-4">
        <div className="flex flex-1 justify-start">
          <Logo />
        </div>
        <MainNavigation
          className="lg:gap-6"
          serviceMenu={serviceMenu}
          locationMenu={locationMenu}
          aboutMenu={aboutMenu}
        />
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="primary"
            size="icon-lg"
            render={
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                aria-label={`Call ${SITE_CONFIG.phone}`}
              />
            }
          >
            <Phone />
          </Button>
          <MobileMenu
            serviceMenu={serviceMenu}
            locationMenu={locationMenu}
            aboutMenu={aboutMenu}
          />
        </div>
      </div>
    </header>
  );
}
