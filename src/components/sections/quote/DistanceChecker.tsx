"use client";

import { useEffect, useState } from "react";
import {
  LocationInput,
  type SelectedPlace,
} from "@/components/sections/quote/LocationInput";

export function DistanceChecker() {
  const [fromSession] = useState(() => crypto.randomUUID());
  const [toSession] = useState(() => crypto.randomUUID());
  const [from, setFrom] = useState<SelectedPlace | null>(null);
  const [to, setTo] = useState<SelectedPlace | null>(null);
  const [km, setKm] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setKm(null);
    setError(null);
    if (!from || !to) return;

    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams({ from: from.placeId, to: to.placeId });
    fetch(`/api/distance?${params}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(data?.error ?? "Could not calculate the distance.");
        setKm(data.km);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Could not calculate the distance.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [from, to]);

  return (
    <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl shadow-brand-navy-dark/20 sm:p-8">
      <div className="flex flex-col gap-5">
        <LocationInput
          id="pickup"
          label="Pickup location*"
          sessionToken={fromSession}
          onSelect={setFrom}
        />
        <LocationInput
          id="drop"
          label="Drop location*"
          sessionToken={toSession}
          onSelect={setTo}
        />
      </div>

      <div className="mt-6 min-h-6 text-center" aria-live="polite">
        {loading && <p className="text-sm text-muted-foreground">Calculating distance...</p>}
        {km !== null && (
          <p className="text-lg font-bold text-brand-navy">Distance: {km} km</p>
        )}
        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      </div>
    </div>
  );
}
