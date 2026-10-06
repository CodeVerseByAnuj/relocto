"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { ImageField } from "@/components/admin/ImageField";
import {
  Area,
  RowList,
  Section,
  Text,
  field,
  labelCls,
} from "@/components/admin/fields";
import {
  saveAboutPageAction,
  deleteAboutPageAction,
  type ActionResult,
} from "@/app/admin/actions";
import type { AboutPageContent } from "@/lib/queries/aboutPage";

export function AboutPageEditor({ page }: { page: AboutPageContent }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const [form, setForm] = useState({
    slug: page.slug,
    title: page.title,
    published: page.published,
    order: String(page.order),
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",
    heroDescription: page.heroDescription ?? "",
    heroImageUrl: page.heroImageUrl ?? "",
    introEyebrow: page.introEyebrow ?? "",
    introHeading: page.introHeading ?? "",
    introBody: page.introBody ?? "",
    introImageUrl: page.introImageUrl ?? "",
    content: page.content ?? "",
    timelineTitle: page.timelineTitle ?? "",
    timeline: page.timeline.map((item) => ({
      ...item,
      imageUrl: item.imageUrl ?? "",
    })),
    valuesTitle: page.valuesTitle ?? "",
    values: page.values,
    vision: page.vision ?? "",
    mission: page.mission ?? "",
    statsTitle: page.statsTitle ?? "",
    stats: page.stats,
    logosTitle: page.logosTitle ?? "",
    logos: page.logos.map((item) => ({
      ...item,
      imageUrl: item.imageUrl ?? "",
    })),
    showTestimonials: page.showTestimonials,
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function save() {
    setResult(null);
    startTransition(async () => {
      const res = await saveAboutPageAction(page.id, form);
      setResult(res);
      if (res.ok) router.refresh();
    });
  }

  function remove() {
    if (!confirm(`Delete "${page.title}"? This cannot be undone.`)) return;
    startTransition(() => deleteAboutPageAction(page.id));
  }

  return (
    <div className="space-y-5 pb-24">
      <p className="rounded-lg bg-slate-100 px-4 py-3 text-xs text-slate-600">
        Every section below is optional. A section you leave empty is simply not
        shown on the page.
      </p>

      <Section
        title="Page"
        description="Name in the About Us dropdown, URL and visibility."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Text
            label="Title"
            value={form.title}
            onChange={(v) => set("title", v)}
            placeholder="e.g. Our Story"
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
          Published (visible at /about/{form.slug} and in the About Us menu)
        </label>
      </Section>

      <Section title="Hero" description="Banner at the top of the page.">
        <Area
          label="Description"
          rows={2}
          value={form.heroDescription}
          onChange={(v) => set("heroDescription", v)}
          hint="One line shown under the page title."
        />
        <ImageField
          label="Background image"
          value={form.heroImageUrl}
          onChange={(v) => set("heroImageUrl", v)}
          hint="JPG, PNG or WebP up to 4 MB. Blank = the default site banner."
        />
      </Section>

      <Section title="Intro" description="Text on the left, image on the right.">
        <Text
          label="Small label"
          value={form.introEyebrow}
          onChange={(v) => set("introEyebrow", v)}
          placeholder="e.g. About Relocato"
        />
        <Text
          label="Heading"
          value={form.introHeading}
          onChange={(v) => set("introHeading", v)}
        />
        <Area
          label="Text"
          rows={6}
          value={form.introBody}
          onChange={(v) => set("introBody", v)}
          hint="Leave a blank line between paragraphs."
        />
        <ImageField
          label="Image"
          value={form.introImageUrl}
          onChange={(v) => set("introImageUrl", v)}
        />
      </Section>

      <Section
        title="Extra content"
        description="Free-form text shown after the intro — useful for pages such as Governance or Careers."
      >
        <div>
          <label className={labelCls}>Content</label>
          <textarea
            value={form.content}
            rows={10}
            onChange={(e) => set("content", e.target.value)}
            className={`${field} resize-y font-mono`}
          />
          <p className="mt-1 text-xs text-slate-500">
            Markdown: <code>## Heading</code>, <code>**bold**</code>,{" "}
            <code>- list item</code>, <code>[link text](https://…)</code>.
          </p>
        </div>
      </Section>

      <Section
        title="History timeline"
        description="Milestones shown in order, left to right."
      >
        <Text
          label="Section heading"
          value={form.timelineTitle}
          onChange={(v) => set("timelineTitle", v)}
          placeholder="Our Company History"
        />
        <RowList
          items={form.timeline}
          onChange={(items) => set("timeline", items)}
          itemLabel="Milestone"
          blank={{ year: "", title: "", description: "", imageUrl: "" }}
        >
          {(item, update) => (
            <>
              <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
                <Text
                  label="Year"
                  value={item.year}
                  onChange={(v) => update({ year: v })}
                />
                <Text
                  label="Title"
                  value={item.title}
                  onChange={(v) => update({ title: v })}
                />
              </div>
              <Area
                label="Description"
                rows={2}
                value={item.description}
                onChange={(v) => update({ description: v })}
              />
              <ImageField
                label="Image (optional)"
                value={item.imageUrl}
                onChange={(v) => update({ imageUrl: v })}
              />
            </>
          )}
        </RowList>
      </Section>

      <Section
        title="Values, vision & mission"
        description="A list of values beside the vision and mission cards."
      >
        <Text
          label="Section heading"
          value={form.valuesTitle}
          onChange={(v) => set("valuesTitle", v)}
          placeholder="Our Mission, Our Drive"
        />
        <RowList
          items={form.values}
          onChange={(items) => set("values", items)}
          itemLabel="Value"
          blank={{ title: "", description: "" }}
        >
          {(item, update) => (
            <>
              <Text
                label="Name"
                value={item.title}
                onChange={(v) => update({ title: v })}
                placeholder="e.g. Commitment"
              />
              <Area
                label="Description"
                rows={2}
                value={item.description}
                onChange={(v) => update({ description: v })}
              />
            </>
          )}
        </RowList>
        <Area
          label="Vision"
          rows={3}
          value={form.vision}
          onChange={(v) => set("vision", v)}
        />
        <Area
          label="Mission"
          rows={3}
          value={form.mission}
          onChange={(v) => set("mission", v)}
        />
      </Section>

      <Section title="Numbers" description="Headline figures, e.g. 40+ Years.">
        <Text
          label="Section heading"
          value={form.statsTitle}
          onChange={(v) => set("statsTitle", v)}
          placeholder="Our Journey in Numbers"
        />
        <RowList
          items={form.stats}
          onChange={(items) => set("stats", items)}
          itemLabel="Number"
          blank={{ value: "", label: "" }}
        >
          {(item, update) => (
            <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
              <Text
                label="Value"
                value={item.value}
                onChange={(v) => update({ value: v })}
                placeholder="e.g. 500+"
              />
              <Text
                label="Label"
                value={item.label}
                onChange={(v) => update({ label: v })}
                placeholder="e.g. Happy Clients"
              />
            </div>
          )}
        </RowList>
      </Section>

      <Section
        title="Logos"
        description="Accreditations, certifications or partners."
      >
        <Text
          label="Section heading"
          value={form.logosTitle}
          onChange={(v) => set("logosTitle", v)}
          placeholder="Accreditations & Memberships"
        />
        <RowList
          items={form.logos}
          onChange={(items) => set("logos", items)}
          itemLabel="Logo"
          blank={{ name: "", imageUrl: "" }}
        >
          {(item, update) => (
            <>
              <Text
                label="Name"
                value={item.name}
                onChange={(v) => update({ name: v })}
                placeholder="e.g. ISO 9001"
              />
              <ImageField
                label="Logo image"
                value={item.imageUrl}
                onChange={(v) => update({ imageUrl: v })}
                hint="Blank = the name is shown as text."
              />
            </>
          )}
        </RowList>
      </Section>

      <Section title="More" description="Shared blocks and search settings.">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.showTestimonials}
            onChange={(e) => set("showTestimonials", e.target.checked)}
            className="size-4"
          />
          Show the customer testimonials block
        </label>
        <Text
          label="Meta title"
          value={form.metaTitle}
          onChange={(v) => set("metaTitle", v)}
          placeholder="Defaults to the page title"
        />
        <Area
          label="Meta description"
          rows={2}
          value={form.metaDescription}
          onChange={(v) => set("metaDescription", v)}
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
            {page.published ? (
              <a
                href={`/about/${page.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                <ExternalLink className="size-3.5" /> View page
              </a>
            ) : null}
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
