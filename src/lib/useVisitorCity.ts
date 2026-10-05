"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { LocationMenuItem } from "@/types/navigation";

const DETECTED_KEY = "relocato:detected-city";
const VISITED_KEY = "relocato:visited-city";

export interface VisitorCity {
  location: LocationMenuItem;
  /** "detected" = from the visitor's IP, "visited" = last city page they opened. */
  source: "detected" | "visited";
}

let detection: Promise<string> | undefined;

function read(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function write(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode); the menu just has no pinned city.
  }
}

/**
 * The city to pin at the top of the Locations menu: the one detected from the
 * visitor's IP (asked once per browser session), else the last city page they
 * opened. Null until known, so the server render never includes it.
 */
export function useVisitorCity(
  locations: LocationMenuItem[]
): VisitorCity | null {
  const pathname = usePathname();
  const [detectedSlug, setDetectedSlug] = useState<string | null>(null);
  const [visitedSlug, setVisitedSlug] = useState<string | null>(null);

  useEffect(() => {
    setVisitedSlug(read(localStorage, VISITED_KEY));

    const cached = read(sessionStorage, DETECTED_KEY);
    if (cached !== null) {
      setDetectedSlug(cached || null);
      return;
    }

    let cancelled = false;
    // Shared so the desktop and mobile menus trigger a single request.
    detection ??= fetch("/api/locations/nearby")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { location: { slug: string } | null } | null) => {
        const slug = data?.location?.slug ?? "";
        write(sessionStorage, DETECTED_KEY, slug);
        return slug;
      })
      .catch(() => "");
    detection.then((slug) => {
      if (!cancelled) setDetectedSlug(slug || null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Remember the city page the visitor is on.
  useEffect(() => {
    const current = locations.find(
      (location) => pathname === `/services/${location.slug}`
    );
    if (!current) return;
    write(localStorage, VISITED_KEY, current.slug);
    setVisitedSlug(current.slug);
  }, [pathname, locations]);

  const detected = locations.find((l) => l.slug === detectedSlug);
  if (detected) return { location: detected, source: "detected" };
  const visited = locations.find((l) => l.slug === visitedSlug);
  if (visited) return { location: visited, source: "visited" };
  return null;
}
