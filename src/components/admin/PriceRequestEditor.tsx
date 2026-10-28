"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Mail, MessageCircle, Plus, Trash2 } from "lucide-react";
import { Area, Section, Text, field } from "@/components/admin/fields";
import {
  closePriceRequestAction,
  deletePriceRequestAction,
  emailEstimateAction,
  markPriceRequestSentAction,
  savePriceRequestAction,
  type ActionResult,
} from "@/app/admin/actions";
import { formatInr } from "@/lib/pricing";
import {
  PRICE_REQUEST_STATUS_LABELS,
  whatsappMessage,
  whatsappNumber,
  type PriceRequestItem,
} from "@/lib/priceRequest";
import type { PriceRequestStatus } from "@prisma/client";

interface ItemRow {
  category: string;
  name: string;
  quantity: string;
  unitPrice: string;
}

interface CatalogEntry {
  category: string;
  name: string;
  price: number;
}

const toNumber = (value: string) => Number(value) || 0;
const amountOf = (item: ItemRow) =>
  toNumber(item.quantity) * toNumber(item.unitPrice);

interface PriceRequestEditorProps {
  /** The price list, so the admin can add more items from it. */
  catalog: CatalogEntry[];
  request: {
    id: string;
    token: string;
    name: string;
    email: string;
    phone: string;
    fromLabel: string;
    toLabel: string;
    km: number;
    items: PriceRequestItem[];
    itemsTotal: number;
    distanceCharge: number;
    estimate: number;
    price: number;
    notes: string;
    status: PriceRequestStatus;
  };
}

const actionButton =
  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold disabled:opacity-60";

export function PriceRequestEditor({ catalog, request }: PriceRequestEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [items, setItems] = useState<ItemRow[]>(
    request.items.map((item) => ({
      category: item.category,
      name: item.name,
      quantity: String(item.quantity),
      unitPrice: String(item.unitPrice),
    }))
  );
  const [distanceCharge, setDistanceCharge] = useState(
    String(request.distanceCharge)
  );
  const [price, setPrice] = useState(String(request.price));
  // Once the admin types their own total, stop overwriting it on item edits.
  const [priceTouched, setPriceTouched] = useState(
    request.price !== request.itemsTotal + request.distanceCharge
  );
  const [notes, setNotes] = useState(request.notes);

  const itemsTotal = items.reduce((sum, item) => sum + amountOf(item), 0);
  const computedTotal = itemsTotal + toNumber(distanceCharge);

  const setItem = (index: number, patch: Partial<ItemRow>) =>
    updateItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  function updateItems(next: ItemRow[]) {
    setItems(next);
    if (!priceTouched) {
      const total = next.reduce((sum, item) => sum + amountOf(item), 0);
      setPrice(String(total + toNumber(distanceCharge)));
    }
  }

  function updateDistance(value: string) {
    setDistanceCharge(value);
    if (!priceTouched) setPrice(String(itemsTotal + toNumber(value)));
  }

  function addFromCatalog(index: string) {
    const entry = catalog[Number(index)];
    if (!entry) return;
    updateItems([
      ...items,
      {
        category: entry.category,
        name: entry.name,
        quantity: "1",
        unitPrice: String(entry.price),
      },
    ]);
  }

  const pdfPath = `/api/estimate/pdf/${request.token}`;

  /** Saves the price and notes first so the PDF / message use what is on screen. */
  async function saveDraft() {
    const res = await savePriceRequestAction(request.id, {
      items,
      distanceCharge,
      finalPrice: price,
      notes,
    });
    setResult(res);
    return res.ok;
  }

  function save() {
    setResult(null);
    startTransition(async () => {
      if (await saveDraft()) router.refresh();
    });
  }

  /** Saves first so the downloaded PDF has the edits that are on screen. */
  function downloadPdf() {
    setResult(null);
    startTransition(async () => {
      if (!(await saveDraft())) return;
      window.location.href = `${pdfPath}?download=1`;
      router.refresh();
    });
  }

  function emailPdf() {
    setResult(null);
    startTransition(async () => {
      if (!(await saveDraft())) return;
      const res = await emailEstimateAction(request.id);
      setResult(res);
      if (res.ok) router.refresh();
    });
  }

  function sendWhatsApp() {
    setResult(null);
    // Open the tab inside the click so the browser does not block the popup.
    const tab = window.open("about:blank", "_blank");
    startTransition(async () => {
      if (!(await saveDraft())) {
        tab?.close();
        return;
      }
      const message = whatsappMessage(
        {
          name: request.name,
          fromLabel: request.fromLabel,
          toLabel: request.toLabel,
          token: request.token,
          finalPrice: Number(price),
          estimate: request.estimate,
        },
        window.location.origin
      );
      const url = `https://wa.me/${whatsappNumber(request.phone)}?text=${encodeURIComponent(message)}`;
      if (tab) tab.location.href = url;
      await markPriceRequestSentAction(request.id);
      router.refresh();
    });
  }

  function remove() {
    if (!confirm(`Delete the price request from ${request.name}?`)) return;
    startTransition(() => deletePriceRequestAction(request.id));
  }

  return (
    <div className="space-y-5 pb-24">
      <Section title="Customer">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold text-slate-500">Name</dt>
            <dd>{request.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">Status</dt>
            <dd>{PRICE_REQUEST_STATUS_LABELS[request.status]}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">Phone (WhatsApp)</dt>
            <dd>{request.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">Email</dt>
            <dd className="break-all">{request.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">Pickup</dt>
            <dd>{request.fromLabel}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-500">Drop</dt>
            <dd>{request.toLabel}</dd>
          </div>
        </dl>
      </Section>

      <Section
        title="Items & calculation"
        description="Change a quantity or rate, remove an item, or add more. The total updates as you edit."
      >
        <div className="space-y-2">
          {items.length > 0 ? (
            <div className="hidden grid-cols-[1fr_5rem_7rem_7rem_2rem] gap-2 text-xs font-semibold text-slate-500 uppercase sm:grid">
              <span>Item</span>
              <span>Qty</span>
              <span>Rate (₹)</span>
              <span className="text-right">Amount</span>
              <span />
            </div>
          ) : null}
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_5rem_7rem_7rem_2rem] items-center gap-2"
            >
              <div>
                <input
                  value={item.name}
                  onChange={(e) => setItem(index, { name: e.target.value })}
                  className={field}
                  aria-label="Item name"
                />
                {item.category ? (
                  <span className="text-xs text-slate-400">{item.category}</span>
                ) : null}
              </div>
              <input
                value={item.quantity}
                inputMode="numeric"
                onChange={(e) => setItem(index, { quantity: e.target.value })}
                className={field}
                aria-label="Quantity"
              />
              <input
                value={item.unitPrice}
                inputMode="numeric"
                onChange={(e) => setItem(index, { unitPrice: e.target.value })}
                className={field}
                aria-label="Rate"
              />
              <span className="text-right text-sm font-medium">
                {formatInr(amountOf(item))}
              </span>
              <button
                type="button"
                onClick={() => updateItems(items.filter((_, i) => i !== index))}
                className="rounded p-1 text-red-400 hover:bg-red-100 hover:text-red-600"
                aria-label="Remove item"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <select
              value=""
              onChange={(e) => addFromCatalog(e.target.value)}
              className={`${field} max-w-xs`}
              aria-label="Add an item from the price list"
            >
              <option value="">+ Add item from price list…</option>
              {catalog.map((entry, index) => (
                <option key={index} value={index}>
                  {entry.name} ({entry.category}) – {formatInr(entry.price)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() =>
                updateItems([
                  ...items,
                  { category: "", name: "", quantity: "1", unitPrice: "0" },
                ])
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              <Plus className="size-4" /> Add custom item
            </button>
          </div>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Items total</span>
            <span>{formatInr(itemsTotal)}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-slate-600">
            <span>Distance charges ({request.km} km)</span>
            <input
              value={distanceCharge}
              inputMode="numeric"
              onChange={(e) => updateDistance(e.target.value)}
              className={`${field} w-32 text-right`}
              aria-label="Distance charges"
            />
          </div>
          <div className="flex justify-between font-semibold text-slate-900">
            <span>Calculated total</span>
            <span>{formatInr(computedTotal)}</span>
          </div>
        </div>
      </Section>

      <Section
        title="Estimate to send"
        description={`Starts at the calculated total (${formatInr(computedTotal)}). Change it if you want to quote differently; this is what the customer gets in the PDF and WhatsApp message.`}
      >
        <div className="max-w-xs">
          <Text
            label="Price quoted to customer (₹)"
            value={price}
            onChange={(v) => {
              setPrice(v);
              setPriceTouched(true);
            }}
          />
        </div>
        <Area
          label="Notes (shown in the PDF)"
          rows={3}
          value={notes}
          onChange={setNotes}
          hint="Optional, e.g. validity of the quote or what is included."
        />
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="min-h-5 text-xs">
            {result && !result.ok ? (
              <span className="font-medium text-red-600">{result.error}</span>
            ) : result?.ok ? (
              <span className="font-medium text-emerald-600">Done.</span>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={remove}
              disabled={isPending}
              className={`${actionButton} border border-red-200 text-red-600 hover:bg-red-50`}
            >
              Delete
            </button>
            {request.status !== "CLOSED" ? (
              <button
                type="button"
                disabled={isPending}
                onClick={() => startTransition(() => closePriceRequestAction(request.id))}
                className={`${actionButton} border border-slate-200 text-slate-600 hover:bg-slate-100`}
              >
                Close
              </button>
            ) : null}
            <button
              type="button"
              onClick={downloadPdf}
              disabled={isPending}
              className={`${actionButton} border border-slate-200 text-slate-700 hover:bg-slate-100`}
            >
              <FileText className="size-4" /> Download PDF
            </button>
            <button
              type="button"
              onClick={save}
              disabled={isPending}
              className={`${actionButton} border border-slate-300 text-slate-800 hover:bg-slate-100`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={emailPdf}
              disabled={isPending}
              className={`${actionButton} bg-slate-900 text-white hover:bg-slate-800`}
            >
              <Mail className="size-4" /> Email PDF
            </button>
            <button
              type="button"
              onClick={sendWhatsApp}
              disabled={isPending}
              className={`${actionButton} bg-emerald-600 text-white hover:bg-emerald-700`}
            >
              <MessageCircle className="size-4" /> Send on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
