"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QUOTE_FORM_CONTENT } from "@/constants/quote";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl shadow-brand-navy-dark/20 sm:p-8">
      <h3 className="text-xl font-bold text-brand-navy">
        {QUOTE_FORM_CONTENT.title}
      </h3>

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quote-name">Name*</Label>
            <Input id="quote-name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quote-email">Email*</Label>
            <Input
              id="quote-email"
              name="email"
              type="email"
              placeholder="Enter email address"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quote-country">Select Country*</Label>
            <Select id="quote-country" name="country" defaultValue={QUOTE_FORM_CONTENT.countries[0]} required>
              {QUOTE_FORM_CONTENT.countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quote-phone">Phone Number*</Label>
            <Input
              id="quote-phone"
              name="phone"
              type="tel"
              placeholder="+91 00000 00000"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quote-from">Moving From</Label>
            <Input id="quote-from" name="movingFrom" placeholder="City or Pincode" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quote-to">Moving To</Label>
            <Input id="quote-to" name="movingTo" placeholder="City or Pincode" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="quote-message">Message</Label>
          <Textarea id="quote-message" name="message" placeholder="Enter your message" />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="mt-2 w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : QUOTE_FORM_CONTENT.submitLabel}
        </Button>

        {status === "success" && (
          <p className="text-center text-sm font-medium text-emerald-600" role="status">
            Thanks! Your request has been sent — our team will contact you shortly.
          </p>
        )}

        {status === "error" && (
          <p className="text-center text-sm font-medium text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <p className="text-center text-[11px] font-semibold tracking-wide text-muted-foreground/80 uppercase">
          {QUOTE_FORM_CONTENT.trustNote}
        </p>
      </form>
    </div>
  );
}
