"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  createServiceCategoryAction,
  type ActionResult,
} from "@/app/admin/actions";
import { field, labelCls } from "@/components/admin/fields";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Creating…" : "Create & add services"}
    </button>
  );
}

export function NewServiceCategoryForm() {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    createServiceCategoryAction,
    null
  );

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className={labelCls}>
          Category name
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="e.g. Corporate Services"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="slug" className={labelCls}>
          URL slug
        </label>
        <input
          id="slug"
          name="slug"
          required
          placeholder="e.g. corporate-services"
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          className={`${field} font-mono`}
        />
        <p className="mt-1 text-xs text-slate-500">
          The category page will be <code>/services/&lt;slug&gt;</code>.
          Lowercase letters, numbers and hyphens.
        </p>
      </div>

      {state && !state.ok ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      <p className="text-xs text-slate-500">
        The new category starts as a <strong>Draft</strong>. Add its services on
        the next screen and publish when ready.
      </p>

      <SubmitButton />
    </form>
  );
}
