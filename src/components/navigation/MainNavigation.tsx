"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { cn, isNavItemActive } from "@/lib/utils";
import {
  ABOUT_NAV_HREF,
  MAIN_NAV_ITEMS,
  SERVICES_NAV_HREF,
} from "@/constants/navigation";
import {
  NavDropdown,
  NavDropdownLink,
} from "@/components/navigation/NavDropdown";
import { NavLink } from "@/components/navigation/NavLink";
import { ServicesDropdown } from "@/components/navigation/ServicesDropdown";
import { LocationsDropdown } from "@/components/navigation/LocationsDropdown";
import type {
  AboutMenuItem,
  LocationMenuItem,
  ServiceMenuCategory,
} from "@/types/navigation";

interface MainNavigationProps {
  className?: string;
  serviceMenu?: ServiceMenuCategory[];
  locationMenu?: LocationMenuItem[];
  aboutMenu?: AboutMenuItem[];
}

export function MainNavigation({
  className,
  serviceMenu = [],
  locationMenu = [],
  aboutMenu = [],
}: MainNavigationProps) {
  const pathname = usePathname();
  // City pages live under /services/<slug> but belong to "Locations".
  const onCityPage = locationMenu.some((l) => l.href === pathname);

  return (
    <nav className={cn("hidden items-center gap-8 lg:flex", className)}>
      {MAIN_NAV_ITEMS.map((item) => {
        if (item.href === ABOUT_NAV_HREF && aboutMenu.length > 0) {
          return (
            <NavDropdown
              key={item.href}
              label={item.label}
              isActive={pathname.startsWith("/about/")}
            >
              {(close) =>
                aboutMenu.map((page) => (
                  <NavDropdownLink
                    key={page.slug}
                    href={page.href}
                    onClick={close}
                  >
                    {page.title}
                  </NavDropdownLink>
                ))
              }
            </NavDropdown>
          );
        }

        if (item.href !== SERVICES_NAV_HREF) {
          return (
            <NavLink
              key={item.href}
              item={item}
              isActive={isNavItemActive(pathname, item.href)}
            />
          );
        }

        const isActive = isNavItemActive(pathname, item.href) && !onCityPage;
        return (
          <Fragment key={item.href}>
            {serviceMenu.length > 0 ? (
              <ServicesDropdown
                item={item}
                categories={serviceMenu}
                isActive={isActive}
              />
            ) : (
              <NavLink item={item} isActive={isActive} />
            )}
            {locationMenu.length > 0 ? (
              <LocationsDropdown
                locations={locationMenu}
                isActive={onCityPage}
              />
            ) : null}
          </Fragment>
        );
      })}
    </nav>
  );
}
