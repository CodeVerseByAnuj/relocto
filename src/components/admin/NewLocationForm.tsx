"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createLocationAction, type ActionResult } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Creating…" : "Create & edit content"}
    </button>
  );
}

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";
const labelCls = "mb-1 block text-xs font-semibold text-slate-700";

export function NewLocationForm() {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    createLocationAction,
    null
  );

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="city" className={labelCls}>
          City
        </label>
        <input id="city" name="city" required className={field} />
      </div>
      <div>
        <label htmlFor="state" className={labelCls}>
          State
        </label>
        <input id="state" name="state" required className={field} />
      </div>
      <div>
        <label htmlFor="slug" className={labelCls}>
          URL slug
        </label>
        <input
          id="slug"
          name="slug"
          required
          placeholder="e.g. jaipur"
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          className={`${field} font-mono`}
        />
        <p className="mt-1 text-xs text-slate-500">
          The page will be <code>/services/&lt;slug&gt;</code>. Lowercase letters,
          numbers and hyphens.
        </p>
      </div>

      {state && !state.ok ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      <p className="text-xs text-slate-500">
        The new location starts as a <strong>Draft</strong>, pre-filled with the
        standard service content. You can edit everything on the next screen and
        publish when ready.
      </p>

      <SubmitButton />
    </form>
  );
}
