"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SelectedPlace {
  placeId: string;
  description: string;
}

interface LocationInputProps {
  id: string;
  label: string;
  /** Groups the typing + picking of one address into one billed session. */
  sessionToken: string;
  onSelect: (place: SelectedPlace | null) => void;
}

const DEBOUNCE_MS = 300;

export function LocationInput({
  id,
  label,
  sessionToken,
  onSelect,
}: LocationInputProps) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<SelectedPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const skipNextLookup = useRef(false);

  useEffect(() => {
    if (skipNextLookup.current) {
      skipNextLookup.current = false;
      return;
    }
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: value, session: sessionToken });
        const response = await fetch(`/api/places/autocomplete?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("lookup failed");
        const data = await response.json();
        setSuggestions(data.suggestions);
        setFailed(false);
        setOpen(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, sessionToken]);

  function choose(place: SelectedPlace) {
    skipNextLookup.current = true;
    setValue(place.description);
    setSuggestions([]);
    setOpen(false);
    onSelect(place);
  }

  return (
    <div className="relative flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        autoComplete="off"
        placeholder="Type an address or area"
        onChange={(event) => {
          setValue(event.target.value);
          onSelect(null);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {failed && (
        <p className="text-xs text-destructive" role="alert">
          Could not load suggestions. Please try again.
        </p>
      )}
      {open && suggestions.length > 0 && (
        <ul className="absolute top-full z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-border bg-white py-1 shadow-lg">
          {suggestions.map((place) => (
            <li key={place.placeId}>
              <button
                type="button"
                className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm hover:bg-brand-navy/5"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(place)}
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-navy-light" />
                {place.description}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
