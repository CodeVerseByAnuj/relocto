"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import type { LocationListItem } from "@/lib/queries/location";

interface LocationSwitcherProps {
  locations: LocationListItem[];
  currentSlug: string;
}

export function LocationSwitcher({
  locations,
  currentSlug,
}: LocationSwitcherProps) {
  const router = useRouter();

  if (locations.length < 2) return null;

  return (
    <label className="inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pr-2 pl-3 text-xs font-semibold text-white backdrop-blur-sm">
      <MapPin className="size-3.5 text-brand-accent" aria-hidden="true" />
      <span className="sr-only">Change location</span>
      <select
        value={currentSlug}
        onChange={(event) => {
          const slug = event.target.value;
          if (slug !== currentSlug) router.push(`/services/${slug}`);
        }}
        className="cursor-pointer rounded-full bg-transparent py-0.5 pr-1 text-xs font-semibold text-white uppercase tracking-[0.1em] focus:outline-none [&>option]:text-brand-navy-dark [&>option]:normal-case"
      >
        {locations.map((location) => (
          <option key={location.slug} value={location.slug}>
            {location.city}, {location.state}
          </option>
        ))}
      </select>
    </label>
  );
}
