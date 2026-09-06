"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  searchLocations,
  type LocationSearchEntry,
  type LocationSearchResult,
} from "@/lib/locationSearch";

interface LocationSearchProps {
  /** When provided, search runs locally & instantly. Otherwise it calls the API. */
  entries?: LocationSearchEntry[];
  tone?: "dark" | "light";
  placeholder?: string;
  className?: string;
  /** Called after a result is picked — e.g. to close a mobile menu. */
  onNavigate?: () => void;
}

export function LocationSearch({
  entries,
  tone = "dark",
  placeholder = "Search your city or area…",
  className,
  onNavigate,
}: LocationSearchProps) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [remote, setRemote] = useState<LocationSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const trimmed = query.trim();
  const useLocal = Array.isArray(entries);

  const localResults = useMemo(
    () => (useLocal ? searchLocations(query, entries!, 6) : []),
    [useLocal, query, entries]
  );

  // Remote mode: debounced fetch against /api/locations/search.
  useEffect(() => {
    if (useLocal || trimmed.length < 2) {
      setRemote([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/locations/search?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : { results: [] }))
        .then((data) => setRemote(data.results ?? []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 200);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [useLocal, trimmed]);

  const results = useLocal ? localResults : remote;

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    router.push(`/services/${slug}`);
  }

  const showDropdown = open && trimmed.length >= 2;
  const dark = tone === "dark";

  return (
    <div ref={rootRef} className={cn("relative w-full max-w-sm", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors",
          dark
            ? "border-white/20 bg-white/10 text-white focus-within:border-white/40"
            : "border-border bg-white text-brand-navy-dark focus-within:border-brand-navy-light"
        )}
      >
        <Search
          className={cn(
            "size-4 shrink-0",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
          aria-hidden="true"
        />
        <input
          type="text"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          placeholder={placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (!showDropdown) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((i) => Math.min(i + 1, results.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              go(results[active].slug);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          className={cn(
            "w-full bg-transparent focus:outline-none",
            dark
              ? "placeholder:text-white/50"
              : "placeholder:text-muted-foreground"
          )}
        />
      </div>

      {showDropdown && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 w-full min-w-[16rem] overflow-hidden rounded-2xl border border-border bg-white py-1 text-left shadow-xl shadow-brand-navy-dark/10"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted-foreground">
              {loading ? (
                "Searching…"
              ) : (
                <>
                  No matching location. Try a nearby city or{" "}
                  <Link
                    href="/services#contact"
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                    className="font-semibold text-brand-navy-light"
                  >
                    request a quote
                  </Link>
                  .
                </>
              )}
            </li>
          ) : (
            results.map((result, index) => (
              <li
                key={result.slug}
                role="option"
                aria-selected={index === active}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(result.slug)}
                  className={cn(
                    "flex w-full items-start gap-2.5 px-4 py-2.5 text-sm transition-colors",
                    index === active
                      ? "bg-secondary/70"
                      : "hover:bg-secondary/50"
                  )}
                >
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-brand-navy-light"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold text-brand-navy-dark">
                      {result.city}
                    </span>
                    <span className="text-muted-foreground">
                      , {result.state}
                    </span>
                    {result.matchedArea && (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        Covers “{result.matchedArea}”
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
