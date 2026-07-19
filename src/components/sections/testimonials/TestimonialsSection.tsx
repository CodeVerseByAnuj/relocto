import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/constants/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={TESTIMONIALS_SECTION.eyebrow}
          title={TESTIMONIALS_SECTION.title}
          description={TESTIMONIALS_SECTION.description}
        />
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-white p-8 shadow-sm"
            >
              <Quote
                className="size-8 text-brand-accent"
                aria-hidden="true"
              />
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption>
                <p className="text-sm font-bold text-brand-navy">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
