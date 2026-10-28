"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LocationInput,
  type SelectedPlace,
} from "@/components/sections/quote/LocationInput";
import { cn } from "@/lib/utils";

export interface CalculatorCategory {
  id: string;
  name: string;
  items: { id: string; name: string }[];
}

const STEPS = ["Locations", "Items", "Your Details"] as const;
const LAST_STEP = STEPS.length - 1;
const MAX_QUANTITY = 50;

export function QuoteCalculator({
  categories,
}: {
  categories: CalculatorCategory[];
}) {
  const [step, setStep] = useState(0);
  const [fromSession] = useState(() => crypto.randomUUID());
  const [toSession] = useState(() => crypto.randomUUID());
  const [from, setFrom] = useState<SelectedPlace | null>(null);
  const [to, setTo] = useState<SelectedPlace | null>(null);
  const [km, setKm] = useState<number | null>(null);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [loadingDistance, setLoadingDistance] = useState(false);
  const [items, setItems] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const addedCount = Object.values(items).reduce((sum, qty) => sum + qty, 0);

  useEffect(() => {
    setKm(null);
    setDistanceError(null);
    if (!from || !to) return;

    const controller = new AbortController();
    setLoadingDistance(true);
    const params = new URLSearchParams({ from: from.placeId, to: to.placeId });
    fetch(`/api/distance?${params}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(data?.error ?? "Could not calculate the distance.");
        }
        setKm(data.km);
        setLoadingDistance(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setDistanceError(
          err instanceof Error ? err.message : "Could not calculate the distance."
        );
        setLoadingDistance(false);
      });

    return () => controller.abort();
  }, [from, to]);

  function changeItem(id: string, delta: number) {
    setItems((current) => ({
      ...current,
      [id]: Math.min(Math.max((current[id] ?? 0) + delta, 0), MAX_QUANTITY),
    }));
  }

  function canContinue() {
    if (step === 0) return km !== null;
    if (step === 1) return addedCount > 0;
    return true;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!from || !to) return;
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromPlaceId: from.placeId,
          toPlaceId: to.placeId,
          fromLabel: from.description,
          toLabel: to.description,
          items,
          name,
          email,
          phone,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-2xl rounded-[28px] bg-white p-8 text-center shadow-2xl shadow-brand-navy-dark/20">
        <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase">
          Request received
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-brand-navy sm:text-3xl">
          Thank you, {name}!
        </h2>
        <p className="mt-4 text-sm text-muted-foreground">
          {from?.description} → {to?.description}
          <br />
          {km} km · {addedCount} item{addedCount === 1 ? "" : "s"}
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Your price will be shared by our team. We will contact you on {phone}{" "}
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl shadow-brand-navy-dark/20 sm:p-8"
    >
      <ol className="flex items-center gap-2" aria-label="Progress">
        {STEPS.map((label, index) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span
              className={cn(
                "h-1.5 rounded-full",
                index <= step ? "bg-brand-navy" : "bg-brand-navy/10"
              )}
            />
            <span
              className={cn(
                "text-[11px] font-semibold",
                index === step ? "text-brand-navy" : "text-muted-foreground"
              )}
            >
              {index + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-5">
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold text-brand-navy">
              Where are you moving?
            </h2>
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
            <div className="min-h-6 text-center" aria-live="polite">
              {loadingDistance && (
                <p className="text-sm text-muted-foreground">Calculating distance...</p>
              )}
              {km !== null && (
                <p className="text-lg font-bold text-brand-navy">Distance: {km} km</p>
              )}
              {distanceError && (
                <p className="text-sm font-medium text-destructive">{distanceError}</p>
              )}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold text-brand-navy">
                What are you moving?
              </h2>
              <span className="text-xs text-muted-foreground">
                Added items: {addedCount}
              </span>
            </div>
            {categories.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No items are available yet. Please contact us directly.
              </p>
            )}
            {categories.map((category) => (
              <section key={category.id}>
                <h3 className="mb-2 text-sm font-bold tracking-wide text-brand-navy uppercase">
                  {category.name}
                </h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {category.items.map((item) => {
                    const quantity = items[item.id] ?? 0;
                    return (
                      <li
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-border px-3 py-2"
                      >
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            aria-label={`Remove one ${item.name}`}
                            disabled={quantity === 0}
                            onClick={() => changeItem(item.id, -1)}
                          >
                            <Minus />
                          </Button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {quantity}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            aria-label={`Add one ${item.name}`}
                            disabled={quantity >= MAX_QUANTITY}
                            onClick={() => changeItem(item.id, 1)}
                          >
                            <Plus />
                          </Button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-brand-navy">
              How can our team reach you?
            </h2>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-name">Name*</Label>
              <Input
                id="est-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-email">Email*</Label>
              <Input
                id="est-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-phone">Phone Number*</Label>
              <Input
                id="est-phone"
                type="tel"
                placeholder="+91 00000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="mt-4 text-center text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="rounded-full"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0 || submitting}
        >
          Back
        </Button>
        {step < LAST_STEP ? (
          <Button
            type="button"
            variant="primary"
            size="xl"
            disabled={!canContinue()}
            onClick={() => setStep((s) => s + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="xl" disabled={submitting}>
            {submitting ? "Sending..." : "Request Price"}
          </Button>
        )}
      </div>
    </form>
  );
}
