import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QUOTE_FORM_CONTENT } from "@/constants/quote";

export function QuoteForm() {
  return (
    <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl shadow-brand-navy-dark/20 sm:p-8">
      <h3 className="text-xl font-bold text-brand-navy">
        {QUOTE_FORM_CONTENT.title}
      </h3>

      <form className="mt-6 flex flex-col gap-4">
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

        <Button type="submit" variant="primary" size="xl" className="mt-2 w-full">
          {QUOTE_FORM_CONTENT.submitLabel}
        </Button>

        <p className="text-center text-[11px] font-semibold tracking-wide text-muted-foreground/80 uppercase">
          {QUOTE_FORM_CONTENT.trustNote}
        </p>
      </form>
    </div>
  );
}
