import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/sections";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialCard({
  quote,
  author,
  role,
  rating,
  avatarColor,
}: Testimonial) {
  return (
    <figure className="relative flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
      <Quote
        className="absolute top-5 right-5 size-8 text-secondary"
        aria-hidden="true"
      />
      <div className="flex gap-0.5 text-brand-navy">
        {Array.from({ length: rating }).map((_, index) => (
          <Star key={index} className="size-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="text-sm leading-relaxed text-foreground/80">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
            avatarColor
          )}
        >
          {getInitials(author)}
        </span>
        <div>
          <p className="text-sm font-bold text-brand-navy">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
