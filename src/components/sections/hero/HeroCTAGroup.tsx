import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroCTAGroupProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function HeroCTAGroup({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroCTAGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="cream" size="xl" render={<a href={primaryHref} />}>
        {primaryLabel}
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button variant="glass" size="xl" render={<a href={secondaryHref} />}>
        {secondaryLabel}
      </Button>
    </div>
  );
}
