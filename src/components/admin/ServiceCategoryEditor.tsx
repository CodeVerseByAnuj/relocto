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
import { SERVICE_ICON_NAMES } from "@/lib/icons";
import { ImageField } from "@/components/admin/ImageField";
import {
  Area,
  IconSelect,
  Section,
  Text,
  fromLines,
  toLines,
} from "@/components/admin/fields";
import {
  saveServiceCategoryAction,
  deleteServiceCategoryAction,
  type ActionResult,
} from "@/app/admin/actions";
import type { ServiceCategoryWithServices } from "@/lib/queries/serviceCategory";

interface ServiceRow {
  icon: string;
  imageUrl: string;
  title: string;
  description: string;
  featuresText: string;
}

export function ServiceCategoryEditor({
  category,
}: {
  category: ServiceCategoryWithServices;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const [form, setForm] = useState({
    slug: category.slug,
    name: category.name,
    description: category.description ?? "",
    published: category.published,
    order: String(category.order),
  });

  const [services, setServices] = useState<ServiceRow[]>(
    category.services.map((s) => ({
      icon: s.icon ?? "",
      imageUrl: s.imageUrl ?? "",
      title: s.title,
      description: s.description,
      featuresText: toLines(s.features),
    }))
  );

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setService = (index: number, patch: Partial<ServiceRow>) =>
    setServices((l) => l.map((s, i) => (i === index ? { ...s, ...patch } : s)));

  function move(index: number, dir: -1 | 1) {
    setServices((list) => {
      const next = [...list];
      const target = index + dir;
      if (target < 0 || target >= next.length) return next;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function save() {
    setResult(null);
    startTransition(async () => {
      const res = await saveServiceCategoryAction(category.id, {
        ...form,
        services: services.map((s) => ({
          icon: s.icon,
          imageUrl: s.imageUrl,
          title: s.title,
          description: s.description,
          features: fromLines(s.featuresText),
        })),
      });
      setResult(res);
      if (res.ok) router.refresh();
    });
  }

  function remove() {
    if (
      !confirm(
        `Delete "${category.name}" and all its services? This cannot be undone.`
      )
    )
      return;
    startTransition(() => deleteServiceCategoryAction(category.id));
  }

  return (
    <div className="space-y-5 pb-24">
      <Section
        title="Category"
        description="Shown as one entry in the header Services dropdown, with its own page."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Text
            label="Name"
            value={form.name}
            onChange={(v) => set("name", v)}
            placeholder="e.g. Corporate Services"
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
        <Area
          label="Description (optional)"
          rows={2}
          value={form.description}
          onChange={(v) => set("description", v)}
          hint="Shown at the top of the category page."
        />
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            className="size-4"
          />
          Published (visible at /services/{form.slug})
        </label>
      </Section>

      <Section
        title="Services"
        description="Services listed under this category. A category with no services stays hidden on the site."
      >
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
                    onClick={() => move(index, -1)}
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
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
                  onChange={(v) => setService(index, { icon: v })}
                />
                <ImageField
                  label="Image (optional)"
                  value={service.imageUrl}
                  onChange={(v) => setService(index, { imageUrl: v })}
                />
              </div>
              <div className="mt-3">
                <Text
                  label="Title"
                  value={service.title}
                  onChange={(v) => setService(index, { title: v })}
                />
              </div>
              <div className="mt-3">
                <Area
                  label="Description"
                  rows={2}
                  value={service.description}
                  onChange={(v) => setService(index, { description: v })}
                />
              </div>
              <div className="mt-3">
                <Area
                  label="Features"
                  rows={4}
                  hint="One feature per line."
                  value={service.featuresText}
                  onChange={(v) => setService(index, { featuresText: v })}
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
              href={`/services/${category.slug}`}
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
