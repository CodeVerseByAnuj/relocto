"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { cn, isNavItemActive } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { LocationSearch } from "@/components/sections/locations/LocationSearch";
import {
  ABOUT_NAV_HREF,
  MAIN_NAV_ITEMS,
  SERVICES_NAV_HREF,
} from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";
import { useVisitorCity } from "@/lib/useVisitorCity";
import type {
  AboutMenuItem,
  LocationMenuItem,
  ServiceMenuCategory,
} from "@/types/navigation";

interface MobileMenuProps {
  serviceMenu?: ServiceMenuCategory[];
  locationMenu?: LocationMenuItem[];
  aboutMenu?: AboutMenuItem[];
}

export function MobileMenu({
  serviceMenu = [],
  locationMenu = [],
  aboutMenu = [],
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const visitorCity = useVisitorCity(locationMenu);
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-brand-navy/5 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-navy-dark/50 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-xs flex-col gap-8 overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
          <div className="flex items-center justify-between">
            <Logo />
            <Dialog.Close
              aria-label="Close menu"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-brand-navy/5"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <LocationSearch
            tone="light"
            placeholder="Find your city"
            className="max-w-none"
            onNavigate={() => setOpen(false)}
          />

          <nav className="flex flex-col gap-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium text-brand-navy/90 transition-colors hover:bg-brand-navy/5 hover:text-brand-navy",
                    isNavItemActive(pathname, item.href) &&
                      "bg-brand-navy/5 font-semibold text-brand-navy"
                  )}
                >
                  {item.label}
                </Link>
                {item.href === ABOUT_NAV_HREF && aboutMenu.length > 0 ? (
                  <div className="mb-1 ml-3 flex flex-col border-l border-brand-navy/10 pl-2">
                    {aboutMenu.map((page) => (
                      <Link
                        key={page.slug}
                        href={page.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-navy/80 transition-colors hover:bg-brand-navy/5 hover:text-brand-navy"
                      >
                        {page.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
                {item.href === SERVICES_NAV_HREF && serviceMenu.length > 0 ? (
                  <div className="mb-1 ml-3 flex flex-col border-l border-brand-navy/10 pl-2">
                    {serviceMenu.map((category) => (
                      <Link
                        key={category.slug}
                        href={category.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-navy/80 transition-colors hover:bg-brand-navy/5 hover:text-brand-navy"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
                {item.href === SERVICES_NAV_HREF && locationMenu.length > 0 ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={locationsOpen}
                      onClick={() => setLocationsOpen((value) => !value)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-brand-navy/90 transition-colors hover:bg-brand-navy/5 hover:text-brand-navy"
                    >
                      Locations
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-200",
                          locationsOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {visitorCity ? (
                      <Link
                        href={visitorCity.location.href}
                        onClick={() => setOpen(false)}
                        className="ml-3 flex items-center gap-2 rounded-lg bg-brand-accent/15 px-3 py-2.5 text-sm font-semibold text-brand-navy"
                      >
                        <MapPin className="size-4 shrink-0" aria-hidden="true" />
                        {visitorCity.source === "detected"
                          ? "Your city"
                          : "Recently viewed"}
                        : {visitorCity.location.city}
                      </Link>
                    ) : null}
                    {locationsOpen ? (
                      <div className="mb-1 ml-3 flex flex-col border-l border-brand-navy/10 pl-2">
                        {locationMenu.map((location) => (
                          <Link
                            key={location.slug}
                            href={location.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-navy/80 transition-colors hover:bg-brand-navy/5 hover:text-brand-navy"
                          >
                            {location.city}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </Fragment>
            ))}
          </nav>

          <Button
            variant="primary"
            size="xl"
            className="mt-auto w-full"
            render={<a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} />}
          >
            <Phone data-icon="inline-start" />
            Call Now {SITE_CONFIG.phone}
          </Button>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
