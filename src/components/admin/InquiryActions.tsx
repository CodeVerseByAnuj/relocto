"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import type { InquiryStatus } from "@prisma/client";
import { INQUIRY_STATUS_LABELS } from "@/lib/inquiry";
import {
  deleteInquiryAction,
  setInquiryStatusAction,
} from "@/app/admin/actions";

const statusStyles: Record<InquiryStatus, string> = {
  NEW: "border-amber-200 bg-amber-50 text-amber-800",
  CONTACTED: "border-sky-200 bg-sky-50 text-sky-800",
  CLOSED: "border-slate-200 bg-slate-100 text-slate-600",
};

interface InquiryActionsProps {
  id: string;
  name: string;
  status: InquiryStatus;
}

/** Status picker and delete button for one inquiry row. */
export function InquiryActions({ id, name, status }: InquiryActionsProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-2">
      <select
        aria-label={`Status of the inquiry from ${name}`}
        value={status}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value;
          startTransition(() => setInquiryStatusAction(id, next));
        }}
        className={`rounded-md border px-2 py-1 text-xs font-semibold focus:outline-none disabled:opacity-60 ${statusStyles[status]}`}
      >
        {Object.entries(INQUIRY_STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        type="button"
        aria-label={`Delete the inquiry from ${name}`}
        disabled={isPending}
        onClick={() => {
          if (!confirm(`Delete the inquiry from ${name}? This cannot be undone.`))
            return;
          startTransition(() => deleteInquiryAction(id));
        }}
        className="rounded p-1.5 text-red-400 hover:bg-red-100 hover:text-red-600 disabled:opacity-60"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
