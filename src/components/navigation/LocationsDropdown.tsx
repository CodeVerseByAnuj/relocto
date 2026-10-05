"use client";

import { MapPin } from "lucide-react";
import {
  NavDropdown,
  NavDropdownLink,
} from "@/components/navigation/NavDropdown";
import { useVisitorCity } from "@/lib/useVisitorCity";
import type { LocationMenuItem } from "@/types/navigation";

interface LocationsDropdownProps {
  locations: LocationMenuItem[];
  isActive?: boolean;
}

export function LocationsDropdown({
  locations,
  isActive = false,
}: LocationsDropdownProps) {
  const visitorCity = useVisitorCity(locations);
  const others = visitorCity
    ? locations.filter((l) => l.slug !== visitorCity.location.slug)
    : locations;

  return (
    <NavDropdown
      label="Locations"
      isActive={isActive}
      className="max-h-[70vh] overflow-y-auto"
    >
      {(close) => (
        <>
          {visitorCity ? (
            <NavDropdownLink
              href={visitorCity.location.href}
              onClick={close}
              className="mb-2 flex items-center gap-3 border-b border-white/15 pb-4 text-white"
            >
              <MapPin
                className="size-5 shrink-0 text-brand-accent"
                aria-hidden="true"
              />
              <span className="flex flex-col">
                <span className="text-xs font-semibold tracking-wide text-brand-accent uppercase">
                  {visitorCity.source === "detected"
                    ? "Your city"
                    : "Recently viewed"}
                </span>
                <span className="font-semibold">
                  {visitorCity.location.city}
                </span>
              </span>
            </NavDropdownLink>
          ) : null}
          {others.map((location) => (
            <NavDropdownLink
              key={location.slug}
              href={location.href}
              onClick={close}
            >
              {location.city}
            </NavDropdownLink>
          ))}
        </>
      )}
    </NavDropdown>
  );
}
