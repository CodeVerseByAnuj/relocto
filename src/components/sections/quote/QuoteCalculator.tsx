"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
  Route,
} from "lucide-react";
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

const STEPS = ["Locations", "Your Details", "Items"] as const;
const LAST_STEP = STEPS.length - 1;
const MAX_QUANTITY = 50;
const MAX_EXTRA_ITEMS = 20;

const STEP_INTRO = [
  {
    title: "Where are you moving?",
    hint: "Start typing and pick your pickup and drop locations from the list.",
  },
  {
    title: "How can we reach you?",
    hint: "Our team will share your price and a PDF estimate.",
  },
  {
    title: "What are you moving?",
    hint: "Add the items you want to move. You can change this later with our team.",
  },
] as const;

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
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [extraItems, setExtraItems] = useState<{ name: string; quantity: number }[]>([]);
  const [extraName, setExtraName] = useState("");

  const addedCount =
    Object.values(items).reduce((sum, qty) => sum + qty, 0) +
    extraItems.reduce((sum, item) => sum + item.quantity, 0);

  function addExtraItem() {
    const trimmed = extraName.trim().slice(0, 100);
    if (!trimmed || extraItems.length >= MAX_EXTRA_ITEMS) return;
    setExtraItems((current) => {
      const existing = current.find(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase()
      );
      return existing
        ? current.map((item) =>
            item === existing
              ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
              : item
          )
        : [...current, { name: trimmed, quantity: 1 }];
    });
    setExtraName("");
  }

  function changeExtraItem(name: string, delta: number) {
    setExtraItems((current) =>
      current
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.min(item.quantity + delta, MAX_QUANTITY) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }
  const visibleCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((category) => category.id === activeCategory);

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

  /** Saves the contact details as an admin lead; never blocks the flow. */
  function saveLead() {
    fetch("/api/estimate/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId,
        name,
        email,
        phone,
        fromLabel: from?.description,
        toLabel: to?.description,
      }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.leadId) setLeadId(data.leadId);
      })
      .catch(() => {});
  }

  function next() {
    if (step === 1) saveLead();
    setStep((s) => s + 1);
  }

  function canContinue() {
    if (step === 0) return km !== null;
    if (step === 1) {
      return (
        name.trim() !== "" && phone.trim() !== "" && /^\S+@\S+\.\S+$/.test(email.trim())
      );
    }
    return addedCount > 0;
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
          extraItems,
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
      <div className="w-full max-w-2xl rounded-[28px] bg-white p-8 text-center shadow-2xl shadow-brand-navy-dark/20 sm:p-12">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-extrabold text-brand-navy sm:text-3xl">
          Thank you, {name}!
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Your price will be shared by our team. We will contact you on{" "}
          <span className="font-semibold text-brand-navy">{phone}</span> shortly.
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-brand-navy/5 p-4 text-left text-sm text-brand-navy">
          <p className="font-semibold">
            {from?.description} → {to?.description}
          </p>
          <p className="mt-1 text-muted-foreground">
            {km} km · {addedCount} item{addedCount === 1 ? "" : "s"}
          </p>
        </div>
        <Button
          variant="primary"
          size="xl"
          className="mt-8"
          render={<Link href="/" />}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl shadow-brand-navy-dark/20 sm:p-8"
    >
      <ol className="flex items-start" aria-label="Progress">
        {STEPS.map((label, index) => {
          const done = index < step;
          const current = index === step;
          return (
            <li
              key={label}
              className="relative flex flex-1 flex-col items-center gap-1.5"
              aria-current={current ? "step" : undefined}
            >
              {index > 0 && (
                <span
                  className={cn(
                    "absolute top-4 right-1/2 h-0.5 w-full -translate-y-1/2",
                    index <= step ? "bg-brand-navy" : "bg-brand-navy/10"
                  )}
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  "relative flex size-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  done || current
                    ? "bg-brand-navy text-white"
                    : "bg-brand-navy/10 text-brand-navy/60"
                )}
              >
                {done ? <Check className="size-4" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold",
                  current ? "text-brand-navy" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-brand-navy sm:text-2xl">
          {STEP_INTRO[step].title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{STEP_INTRO[step].hint}</p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {step === 0 && (
          <>
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
            <div aria-live="polite">
              {loadingDistance && (
                <p className="flex items-center justify-center gap-2 rounded-xl bg-brand-navy/5 px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Calculating distance...
                </p>
              )}
              {km !== null && (
                <p className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-base font-bold text-emerald-700">
                  <Route className="size-5" aria-hidden="true" />
                  Distance: {km} km
                </p>
              )}
              {distanceError && (
                <p
                  className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-destructive"
                  role="alert"
                >
                  {distanceError}
                </p>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {categories.length === 0 && (
              <p className="rounded-xl bg-brand-navy/5 px-4 py-6 text-center text-sm text-muted-foreground">
                No items are available yet. Please contact us directly.
              </p>
            )}

            {categories.length > 1 && (
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {[{ id: "all", name: "All" }, ...categories].map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                      activeCategory === category.id
                        ? "bg-brand-navy text-white"
                        : "bg-brand-navy/5 text-brand-navy hover:bg-brand-navy/10"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}

            {visibleCategories.map((category) => (
              <section key={category.id}>
                <h3 className="mb-2.5 text-xs font-bold tracking-[0.15em] text-brand-navy/70 uppercase">
                  {category.name}
                </h3>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {category.items.map((item) => {
                    const quantity = items[item.id] ?? 0;
                    return (
                      <li
                        key={item.id}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-2xl border px-3.5 py-2.5 transition-colors",
                          quantity > 0
                            ? "border-brand-navy bg-brand-navy/5"
                            : "border-border"
                        )}
                      >
                        <span className="text-sm font-semibold text-brand-navy">
                          {item.name}
                        </span>
                        {quantity === 0 ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() => changeItem(item.id, 1)}
                          >
                            <Plus data-icon="inline-start" />
                            Add
                          </Button>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-sm"
                              className="rounded-full"
                              aria-label={`Remove one ${item.name}`}
                              onClick={() => changeItem(item.id, -1)}
                            >
                              <Minus />
                            </Button>
                            <span className="w-6 text-center text-sm font-bold text-brand-navy">
                              {quantity}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon-sm"
                              className="rounded-full"
                              aria-label={`Add one ${item.name}`}
                              disabled={quantity >= MAX_QUANTITY}
                              onClick={() => changeItem(item.id, 1)}
                            >
                              <Plus />
                            </Button>
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            <section>
              <h3 className="mb-2.5 text-xs font-bold tracking-[0.15em] text-brand-navy/70 uppercase">
                Other items
              </h3>
              <p className="mb-2.5 text-sm text-muted-foreground">
                Not in the list? Add it here and our team will include it in your price.
              </p>
              <div className="flex gap-2">
                <Input
                  value={extraName}
                  placeholder="e.g. Treadmill"
                  maxLength={100}
                  aria-label="Other item name"
                  onChange={(e) => setExtraName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addExtraItem();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-10 rounded-full px-4"
                  disabled={!extraName.trim() || extraItems.length >= MAX_EXTRA_ITEMS}
                  onClick={addExtraItem}
                >
                  <Plus data-icon="inline-start" />
                  Add
                </Button>
              </div>
              {extraItems.length > 0 && (
                <ul className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {extraItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-2 rounded-2xl border border-brand-navy bg-brand-navy/5 px-3.5 py-2.5"
                    >
                      <span className="text-sm font-semibold break-words text-brand-navy">
                        {item.name}
                      </span>
                      <span className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          className="rounded-full"
                          aria-label={`Remove one ${item.name}`}
                          onClick={() => changeExtraItem(item.name, -1)}
                        >
                          <Minus />
                        </Button>
                        <span className="w-6 text-center text-sm font-bold text-brand-navy">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          className="rounded-full"
                          aria-label={`Add one ${item.name}`}
                          disabled={item.quantity >= MAX_QUANTITY}
                          onClick={() => changeExtraItem(item.name, 1)}
                        >
                          <Plus />
                        </Button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <p
              className={cn(
                "rounded-xl px-4 py-3 text-center text-sm font-semibold",
                addedCount > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-brand-navy/5 text-muted-foreground"
              )}
              aria-live="polite"
            >
              {addedCount > 0
                ? `${addedCount} item${addedCount === 1 ? "" : "s"} added`
                : "Add at least one item to continue"}
            </p>
          </>
        )}

        {step === 1 && (
          <>
            <div className="rounded-2xl bg-brand-navy/5 p-4 text-sm">
              <p className="font-semibold text-brand-navy">
                {from?.description} → {to?.description}
              </p>
              <p className="mt-1 text-muted-foreground">{km} km</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-name">Name*</Label>
              <Input
                id="est-name"
                value={name}
                placeholder="Enter your name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="est-phone">Phone Number*</Label>
                <Input
                  id="est-phone"
                  type="tel"
                  placeholder="+91 00000 00000"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="est-email">Email*</Label>
                <Input
                  id="est-email"
                  type="email"
                  placeholder="Enter email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <p
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-destructive"
          role="alert"
        >
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
          <ArrowLeft data-icon="inline-start" />
          Back
        </Button>
        {step < LAST_STEP ? (
          <Button
            type="button"
            variant="primary"
            size="xl"
            disabled={!canContinue()}
            onClick={next}
          >
            Continue
            <ArrowRight data-icon="inline-end" />
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="xl" disabled={submitting || addedCount === 0}>
            {submitting ? "Sending..." : "Request Price"}
          </Button>
        )}
      </div>

      <p className="mt-5 text-center text-[11px] font-semibold tracking-wide text-muted-foreground/80 uppercase">
        No Hidden Charges • 100% Safe &amp; Secure • Licensed Partners
      </p>
    </form>
  );
}
