"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Section, Text } from "@/components/admin/fields";
import { savePricingAction, type ActionResult } from "@/app/admin/actions";
import type { PricingData } from "@/lib/queries/pricing";

interface ItemRow {
  name: string;
  price: string;
}

interface CategoryRow {
  name: string;
  items: ItemRow[];
}

const iconButton =
  "rounded p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700";
const dashedButton =
  "inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100";

function moved<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function PricingEditor({ pricing }: { pricing: PricingData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const [settings, setSettings] = useState({
    baseCharge: String(pricing.settings.baseCharge),
    perKmRate: String(pricing.settings.perKmRate),
    minCharge: String(pricing.settings.minCharge),
  });

  const [categories, setCategories] = useState<CategoryRow[]>(
    pricing.categories.map((category) => ({
      name: category.name,
      items: category.items.map((item) => ({
        name: item.name,
        price: String(item.price),
      })),
    }))
  );

  const setCategory = (index: number, patch: Partial<CategoryRow>) =>
    setCategories((list) =>
      list.map((c, i) => (i === index ? { ...c, ...patch } : c))
    );

  const setItem = (
    categoryIndex: number,
    itemIndex: number,
    patch: Partial<ItemRow>
  ) =>
    setCategories((list) =>
      list.map((c, i) =>
        i === categoryIndex
          ? {
              ...c,
              items: c.items.map((item, j) =>
                j === itemIndex ? { ...item, ...patch } : item
              ),
            }
          : c
      )
    );

  function save() {
    setResult(null);
    startTransition(async () => {
      const res = await savePricingAction({ settings, categories });
      setResult(res);
      if (res.ok) router.refresh();
    });
  }

  return (
    <div className="space-y-5 pb-24">
      <Section
        title="Distance charges"
        description="Price = items total + base charge + (per km rate × distance). It never goes below the minimum charge."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Text
            label="Base charge (₹)"
            value={settings.baseCharge}
            onChange={(v) => setSettings((s) => ({ ...s, baseCharge: v }))}
          />
          <Text
            label="Per km rate (₹)"
            value={settings.perKmRate}
            onChange={(v) => setSettings((s) => ({ ...s, perKmRate: v }))}
          />
          <Text
            label="Minimum charge (₹)"
            value={settings.minCharge}
            onChange={(v) => setSettings((s) => ({ ...s, minCharge: v }))}
          />
        </div>
      </Section>

      <Section
        title="Categories & items"
        description="Group things into categories (e.g. Furniture, Electronics) and set a price per piece for each item."
      >
        <div className="space-y-4">
          {categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-lg border border-slate-200 bg-slate-50/60 p-4"
            >
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Text
                    label={`Category ${categoryIndex + 1}`}
                    value={category.name}
                    onChange={(v) => setCategory(categoryIndex, { name: v })}
                    placeholder="e.g. Furniture"
                  />
                </div>
                <button
                  type="button"
                  className={iconButton}
                  aria-label="Move category up"
                  onClick={() => setCategories((l) => moved(l, categoryIndex, -1))}
                >
                  <ArrowUp className="size-4" />
                </button>
                <button
                  type="button"
                  className={iconButton}
                  aria-label="Move category down"
                  onClick={() => setCategories((l) => moved(l, categoryIndex, 1))}
                >
                  <ArrowDown className="size-4" />
                </button>
                <button
                  type="button"
                  className="rounded p-2 text-red-400 hover:bg-red-100 hover:text-red-600"
                  aria-label="Delete category"
                  onClick={() => {
                    if (
                      category.items.length > 0 &&
                      !confirm(
                        `Delete "${category.name || "this category"}" and its items?`
                      )
                    )
                      return;
                    setCategories((l) => l.filter((_, i) => i !== categoryIndex));
                  }}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-end gap-2">
                    <div className="flex-1">
                      <Text
                        label={itemIndex === 0 ? "Item" : ""}
                        value={item.name}
                        onChange={(v) =>
                          setItem(categoryIndex, itemIndex, { name: v })
                        }
                        placeholder="e.g. Sofa"
                      />
                    </div>
                    <div className="w-32">
                      <Text
                        label={itemIndex === 0 ? "Price (₹)" : ""}
                        value={item.price}
                        onChange={(v) =>
                          setItem(categoryIndex, itemIndex, { price: v })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className={iconButton}
                      aria-label="Move item up"
                      onClick={() =>
                        setCategory(categoryIndex, {
                          items: moved(category.items, itemIndex, -1),
                        })
                      }
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      className={iconButton}
                      aria-label="Move item down"
                      onClick={() =>
                        setCategory(categoryIndex, {
                          items: moved(category.items, itemIndex, 1),
                        })
                      }
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded p-2 text-red-400 hover:bg-red-100 hover:text-red-600"
                      aria-label="Delete item"
                      onClick={() =>
                        setCategory(categoryIndex, {
                          items: category.items.filter((_, j) => j !== itemIndex),
                        })
                      }
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={dashedButton}
                  onClick={() =>
                    setCategory(categoryIndex, {
                      items: [...category.items, { name: "", price: "" }],
                    })
                  }
                >
                  <Plus className="size-4" /> Add item
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={dashedButton}
            onClick={() => setCategories((l) => [...l, { name: "", items: [] }])}
          >
            <Plus className="size-4" /> Add category
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
  );
}
