import Image from "next/image";
import { CircleCheck, Eye, Target } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import type {
  LogoItem,
  StatItem,
  TimelineItem,
  ValueItem,
} from "@/lib/schemas/aboutPage";

function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function AboutIntroSection({
  eyebrow,
  heading,
  body,
  imageUrl,
}: {
  eyebrow: string | null;
  heading: string | null;
  body: string | null;
  imageUrl: string | null;
}) {
  return (
    <section className="bg-brand-cream py-20 sm:py-24">
      <div
        className={
          imageUrl
            ? "mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10"
            : "mx-auto max-w-4xl px-6 lg:px-10"
        }
      >
        <div>
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-navy uppercase">
              {eyebrow}
            </span>
          ) : null}
          {heading ? (
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-navy-dark sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {heading}
            </h2>
          ) : null}
          {body ? (
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              {paragraphs(body).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>

        {imageUrl ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image
              src={imageUrl}
              alt={heading ?? ""}
              fill
              unoptimized
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function AboutTimelineSection({
  title,
  items,
}: {
  title: string | null;
  items: TimelineItem[];
}) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          align="left"
          eyebrow="History"
          title={title ?? "Our Company History"}
        />

        {/* Scrolls sideways when the milestones don't fit. */}
        <ol className="mt-12 flex snap-x gap-8 overflow-x-auto pb-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex w-72 shrink-0 snap-start flex-col sm:w-80"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-linear-to-br from-brand-navy-light to-brand-navy-dark">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    unoptimized
                    sizes="20rem"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-4xl font-extrabold text-white/25">
                    {item.year}
                  </span>
                )}
              </div>

              <div className="relative mt-6 flex items-center" aria-hidden="true">
                <span className="size-3 shrink-0 rounded-full bg-brand-accent ring-4 ring-brand-accent/25" />
                <span className="h-px flex-1 bg-border" />
              </div>

              <p className="mt-4 text-2xl font-extrabold text-brand-navy-light">
                {item.year}
              </p>
              <h3 className="mt-1 text-lg font-bold text-brand-navy-dark">
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AboutValuesSection({
  title,
  values,
  vision,
  mission,
}: {
  title: string | null;
  values: ValueItem[];
  vision: string | null;
  mission: string | null;
}) {
  const cards = [
    { icon: Eye, label: "Vision", text: vision },
    { icon: Target, label: "Mission", text: mission },
  ].filter((card) => card.text);

  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="What Guides Us"
          title={title ?? "Our Mission, Our Drive"}
        />

        <div
          className={
            values.length > 0 && cards.length > 0
              ? "mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14"
              : "mx-auto mt-12 max-w-3xl"
          }
        >
          {values.length > 0 ? (
            <div>
              <h3 className="text-xl font-bold text-brand-navy-dark">Values</h3>
              <ul className="mt-5 flex flex-col gap-4">
                {values.map((value, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CircleCheck
                      className="mt-0.5 size-5 shrink-0 text-brand-navy-light"
                      aria-hidden="true"
                    />
                    <p className="text-base leading-relaxed text-foreground/80">
                      <strong className="font-semibold text-brand-navy-dark">
                        {value.title}
                        {value.description ? ": " : ""}
                      </strong>
                      {value.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {cards.length > 0 ? (
            <div className="flex flex-col gap-5">
              {cards.map(({ icon: Icon, label, text }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-navy-light to-brand-navy-dark text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-bold text-brand-navy-dark">
                      {label}
                    </h3>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function AboutStatsSection({
  title,
  stats,
}: {
  title: string | null;
  stats: StatItem[];
}) {
  return (
    <section className="bg-brand-navy-dark py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          variant="light"
          eyebrow="In Numbers"
          title={title ?? "Our Journey in Numbers"}
        />
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:flex lg:justify-center lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col-reverse items-center gap-2 text-center lg:flex-1 lg:px-6"
            >
              <dt className="text-sm font-medium text-white/75">
                {stat.label}
              </dt>
              <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function AboutLogosSection({
  title,
  logos,
}: {
  title: string | null;
  logos: LogoItem[];
}) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Affiliations"
          title={title ?? "Accreditations & Memberships"}
        />
        <ul className="mt-12 flex flex-wrap items-stretch justify-center gap-4">
          {logos.map((logo, index) => (
            <li
              key={index}
              className="flex h-24 w-40 items-center justify-center rounded-2xl border border-border bg-white px-5 shadow-sm"
            >
              {logo.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.imageUrl}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-14 max-w-full object-contain"
                />
              ) : (
                <span className="text-center text-sm font-semibold text-brand-navy/80">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
