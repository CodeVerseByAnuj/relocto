import { SectionHeading } from "@/components/common/SectionHeading";
import { PROCESS_SECTION, PROCESS_STEPS } from "@/constants/process";

export function RelocationMethodSection() {
  return (
    <section className="bg-brand-navy py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          variant="light"
          eyebrow={PROCESS_SECTION.eyebrow}
          title={PROCESS_SECTION.title}
          description={PROCESS_SECTION.description}
        />

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {PROCESS_STEPS.map((item, index) => (
            <li key={item.step} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-white/10 text-sm font-bold text-brand-accent">
                  {item.step}
                </span>
                {index < PROCESS_STEPS.length - 1 ? (
                  <span
                    className="hidden h-px flex-1 bg-brand-accent/30 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
