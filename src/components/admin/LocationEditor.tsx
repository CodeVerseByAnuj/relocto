"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";
import { SERVICE_ICON_NAMES, FEATURE_ICON_NAMES } from "@/lib/icons";
import {
  saveLocationAction,
  deleteLocationAction,
  type ActionResult,
} from "@/app/admin/actions";
import type { LocationWithContent } from "@/lib/queries/location";

interface ServiceRow {
  icon: string;
  imageUrl: string;
  title: string;
  description: string;
  featuresText: string;
}
interface FeatureRow {
  icon: string;
  title: string;
  description: string;
}

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";
const labelCls = "mb-1 block text-xs font-semibold text-slate-700";

function toLines(list: string[]) {
  return list.join("\n");
}
function fromLines(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      {description ? (
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      ) : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Text({
  label,
  value,
  onChange,
  mono,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mono?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={mono ? `${field} font-mono` : field}
      />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} resize-y`}
      />
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function IconSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={field}
      >
        <option value="">(default icon)</option>
        {options.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function LocationEditor({ location }: { location: LocationWithContent }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const [form, setForm] = useState({
    slug: location.slug,
    city: location.city,
    state: location.state,
    published: location.published,
    order: String(location.order),
    metaTitle: location.metaTitle ?? "",
    metaDescription: location.metaDescription ?? "",
    heroBadge: location.heroBadge,
    heroTitle: location.heroTitle,
    heroDescription: location.heroDescription,
    heroPrimaryCtaLabel: location.heroPrimaryCtaLabel,
    heroPrimaryCtaHref: location.heroPrimaryCtaHref,
    heroPhone: location.heroPhone ?? "",
    heroImageUrl: location.heroImageUrl ?? "",
    servicesEyebrow: location.servicesEyebrow,
    servicesTitle: location.servicesTitle,
    servicesDescription: location.servicesDescription,
    areasTitle: location.areasTitle,
    areasDescription: location.areasDescription,
    areasText: toLines(location.areas),
    whyTitle: location.whyTitle,
    whyHighlight: location.whyHighlight ?? "",
    quoteBadge: location.quoteBadge,
    quoteHeading: location.quoteHeading,
    quoteDescription: location.quoteDescription,
  });

  const [services, setServices] = useState<ServiceRow[]>(
    location.services.map((s) => ({
      icon: s.icon ?? "",
      imageUrl: s.imageUrl ?? "",
      title: s.title,
      description: s.description,
      featuresText: toLines(s.features),
    }))
  );
  const [features, setFeatures] = useState<FeatureRow[]>(
    location.features.map((f) => ({
      icon: f.icon ?? "",
      title: f.title,
      description: f.description,
    }))
  );

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function move<T>(list: T[], index: number, dir: -1 | 1): T[] {
    const next = [...list];
    const target = index + dir;
    if (target < 0 || target >= next.length) return next;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  }

  function buildPayload() {
    return {
      slug: form.slug,
      city: form.city,
      state: form.state,
      published: form.published,
      order: form.order,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      heroBadge: form.heroBadge,
      heroTitle: form.heroTitle,
      heroDescription: form.heroDescription,
      heroPrimaryCtaLabel: form.heroPrimaryCtaLabel,
      heroPrimaryCtaHref: form.heroPrimaryCtaHref,
      heroPhone: form.heroPhone,
      heroImageUrl: form.heroImageUrl,
      servicesEyebrow: form.servicesEyebrow,
      servicesTitle: form.servicesTitle,
      servicesDescription: form.servicesDescription,
      areasTitle: form.areasTitle,
      areasDescription: form.areasDescription,
      areas: fromLines(form.areasText),
      whyTitle: form.whyTitle,
      whyHighlight: form.whyHighlight,
      quoteBadge: form.quoteBadge,
      quoteHeading: form.quoteHeading,
      quoteDescription: form.quoteDescription,
      services: services.map((s) => ({
        icon: s.icon,
        imageUrl: s.imageUrl,
        title: s.title,
        description: s.description,
        features: fromLines(s.featuresText),
      })),
      features: features.map((f) => ({
        icon: f.icon,
        title: f.title,
        description: f.description,
      })),
    };
  }

  function save() {
    setResult(null);
    startTransition(async () => {
      const res = await saveLocationAction(location.id, buildPayload());
      setResult(res);
      if (res.ok) router.refresh();
    });
  }

  function remove() {
    if (
      !confirm(
        `Delete "${location.city}" and its page? This cannot be undone.`
      )
    )
      return;
    startTransition(() => deleteLocationAction(location.id));
  }

  return (
    <div className="space-y-5 pb-24">
      <Section
        title="Settings"
        description="URL, publish state and SEO metadata."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Text
            label="City"
            value={form.city}
            onChange={(v) => set("city", v)}
          />
          <Text
            label="State"
            value={form.state}
            onChange={(v) => set("state", v)}
          />
          <Text
            label="Slug"
            mono
            value={form.slug}
            onChange={(v) => set("slug", v)}
          />
          <Text
            label="Sort order"
            value={form.order}
            onChange={(v) => set("order", v)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            className="size-4"
          />
          Published (visible at /services/{form.slug})
        </label>
        <Text
          label="Meta title"
          value={form.metaTitle}
          onChange={(v) => set("metaTitle", v)}
        />
        <Area
          label="Meta description"
          value={form.metaDescription}
          onChange={(v) => set("metaDescription", v)}
          rows={2}
        />
      </Section>

      <Section title="Hero" description="Top of the page.">
        <Text
          label="Badge"
          value={form.heroBadge}
          onChange={(v) => set("heroBadge", v)}
        />
        <Text
          label="Heading"
          value={form.heroTitle}
          onChange={(v) => set("heroTitle", v)}
        />
        <Area
          label="Description"
          value={form.heroDescription}
          onChange={(v) => set("heroDescription", v)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text
            label="Button label"
            value={form.heroPrimaryCtaLabel}
            onChange={(v) => set("heroPrimaryCtaLabel", v)}
          />
          <Text
            label="Button link"
            mono
            value={form.heroPrimaryCtaHref}
            onChange={(v) => set("heroPrimaryCtaHref", v)}
          />
          <Text
            label="Phone (optional)"
            value={form.heroPhone}
            onChange={(v) => set("heroPhone", v)}
            placeholder="Defaults to site phone"
          />
          <Text
            label="Background image URL (optional)"
            mono
            value={form.heroImageUrl}
            onChange={(v) => set("heroImageUrl", v)}
            placeholder="Blank = generated illustration"
          />
        </div>
      </Section>

      <Section
        title="Services grid"
        description="Section header and the service cards."
      >
        <Text
          label="Eyebrow"
          value={form.servicesEyebrow}
          onChange={(v) => set("servicesEyebrow", v)}
        />
        <Text
          label="Title"
          value={form.servicesTitle}
          onChange={(v) => set("servicesTitle", v)}
        />
        <Area
          label="Description"
          value={form.servicesDescription}
          onChange={(v) => set("servicesDescription", v)}
          rows={2}
        />

        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50/60 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Service {index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setServices((l) => move(l, index, -1))
                    }
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setServices((l) => move(l, index, 1))}
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setServices((l) => l.filter((_, i) => i !== index))
                    }
                    className="rounded p-1 text-red-400 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <IconSelect
                  label="Icon"
                  value={service.icon}
                  options={SERVICE_ICON_NAMES}
                  onChange={(v) =>
                    setServices((l) =>
                      l.map((s, i) => (i === index ? { ...s, icon: v } : s))
                    )
                  }
                />
                <Text
                  label="Image URL (optional)"
                  mono
                  value={service.imageUrl}
                  onChange={(v) =>
                    setServices((l) =>
                      l.map((s, i) =>
                        i === index ? { ...s, imageUrl: v } : s
                      )
                    )
                  }
                />
              </div>
              <div className="mt-3">
                <Text
                  label="Title"
                  value={service.title}
                  onChange={(v) =>
                    setServices((l) =>
                      l.map((s, i) => (i === index ? { ...s, title: v } : s))
                    )
                  }
                />
              </div>
              <div className="mt-3">
                <Area
                  label="Description"
                  rows={2}
                  value={service.description}
                  onChange={(v) =>
                    setServices((l) =>
                      l.map((s, i) =>
                        i === index ? { ...s, description: v } : s
                      )
                    )
                  }
                />
              </div>
              <div className="mt-3">
                <Area
                  label="Features"
                  rows={4}
                  hint="One feature per line."
                  value={service.featuresText}
                  onChange={(v) =>
                    setServices((l) =>
                      l.map((s, i) =>
                        i === index ? { ...s, featuresText: v } : s
                      )
                    )
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setServices((l) => [
                ...l,
                {
                  icon: "",
                  imageUrl: "",
                  title: "",
                  description: "",
                  featuresText: "",
                },
              ])
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            <Plus className="size-4" /> Add service
          </button>
        </div>
      </Section>

      <Section
        title="Areas we cover"
        description="Location-specific area chips."
      >
        <Text
          label="Title"
          value={form.areasTitle}
          onChange={(v) => set("areasTitle", v)}
        />
        <Area
          label="Description"
          rows={2}
          value={form.areasDescription}
          onChange={(v) => set("areasDescription", v)}
        />
        <Area
          label="Areas"
          rows={5}
          hint="One area per line."
          value={form.areasText}
          onChange={(v) => set("areasText", v)}
        />
      </Section>

      <Section title="Why choose us" description="Heading and feature cards.">
        <Text
          label="Heading"
          value={form.whyTitle}
          onChange={(v) => set("whyTitle", v)}
        />
        <Text
          label="Highlighted phrase (optional)"
          value={form.whyHighlight}
          onChange={(v) => set("whyHighlight", v)}
          placeholder="Trailing part of the heading shown in accent colour"
        />
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50/60 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Feature {index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setFeatures((l) => move(l, index, -1))}
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeatures((l) => move(l, index, 1))}
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFeatures((l) => l.filter((_, i) => i !== index))
                    }
                    className="rounded p-1 text-red-400 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <IconSelect
                label="Icon"
                value={feature.icon}
                options={FEATURE_ICON_NAMES}
                onChange={(v) =>
                  setFeatures((l) =>
                    l.map((f, i) => (i === index ? { ...f, icon: v } : f))
                  )
                }
              />
              <div className="mt-3">
                <Text
                  label="Title"
                  value={feature.title}
                  onChange={(v) =>
                    setFeatures((l) =>
                      l.map((f, i) => (i === index ? { ...f, title: v } : f))
                    )
                  }
                />
              </div>
              <div className="mt-3">
                <Area
                  label="Description"
                  rows={2}
                  value={feature.description}
                  onChange={(v) =>
                    setFeatures((l) =>
                      l.map((f, i) =>
                        i === index ? { ...f, description: v } : f
                      )
                    )
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFeatures((l) => [
                ...l,
                { icon: "", title: "", description: "" },
              ])
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            <Plus className="size-4" /> Add feature
          </button>
        </div>
      </Section>

      <Section title="Quote section" description="Lead form block copy.">
        <Text
          label="Badge"
          value={form.quoteBadge}
          onChange={(v) => set("quoteBadge", v)}
        />
        <Text
          label="Heading"
          value={form.quoteHeading}
          onChange={(v) => set("quoteHeading", v)}
        />
        <Area
          label="Description"
          rows={2}
          value={form.quoteDescription}
          onChange={(v) => set("quoteDescription", v)}
        />
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <div className="min-h-5 text-xs">
            {result && !result.ok ? (
              <span className="font-medium text-red-600">{result.error}</span>
            ) : result?.ok ? (
              <span className="font-medium text-emerald-600">Saved.</span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/services/${location.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              <ExternalLink className="size-3.5" /> View page
            </a>
            <button
              type="button"
              onClick={remove}
              disabled={isPending}
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={save}
              disabled={isPending}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
