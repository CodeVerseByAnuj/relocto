import { TestimonialCard } from "@/components/sections/testimonials/TestimonialCard";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/constants/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
          {TESTIMONIALS_SECTION.title}
        </h2>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-0.5 w-8 shrink-0 rounded-full bg-brand-navy-light" />
          <p className="text-sm text-muted-foreground sm:text-base">
            {TESTIMONIALS_SECTION.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
