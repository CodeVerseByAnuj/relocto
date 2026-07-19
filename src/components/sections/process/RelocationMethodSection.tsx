import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PROCESS_CTA,
  PROCESS_SECTION,
  PROCESS_STEPS,
} from "@/constants/process";

export function RelocationMethodSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy-dark uppercase sm:text-4xl">
            {PROCESS_SECTION.title}
          </h2>
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 rounded-full bg-blue-600" aria-hidden="true" />
            <p className="text-sm text-muted-foreground sm:text-base">
              {PROCESS_SECTION.subtitle}
            </p>
          </div>
        </div>

        <ol className="relative mt-20 hidden gap-6 lg:flex">
          <svg
            className="pointer-events-none absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 text-blue-200"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M100,150 C200,150 200,50 300,50 S400,150 500,150 S600,50 700,50 S800,150 900,150"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>

          {PROCESS_STEPS.map((item, index) => {
            const isRaised = index % 2 === 1;

            return (
              <li
                key={item.step}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-4 text-center",
                  isRaised
                    ? "-translate-y-10 flex-col-reverse"
                    : "translate-y-6"
                )}
              >
                <div className="relative shrink-0">
                  <div className="size-24 overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-border">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="size-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -left-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[0.65rem] font-bold text-white shadow">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-blue-600">
                    {item.title}
                  </h3>
                  <p className="mx-auto mt-1 max-w-44 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <ol className="mt-12 flex flex-col gap-8 lg:hidden">
          {PROCESS_STEPS.map((item) => (
            <li key={item.step} className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="size-16 overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-border">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="size-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-1 -left-1 flex size-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[0.6rem] font-bold text-white shadow">
                  {item.step}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-600">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-3xl bg-linear-to-r from-brand-accent to-brand-accent/70 p-8 sm:flex-row sm:p-10">
          <div>
            <h3 className="text-xl font-extrabold text-brand-navy-dark sm:text-2xl">
              {PROCESS_CTA.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-navy-dark/80 sm:text-base">
              {PROCESS_CTA.description}
            </p>
          </div>
          <Button
            variant="primary"
            size="xl"
            className="shrink-0"
            render={<a href={PROCESS_CTA.cta.href} />}
          >
            {PROCESS_CTA.cta.label}
            <ArrowDown data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
