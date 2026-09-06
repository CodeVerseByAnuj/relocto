"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  changePasswordAction,
  type ActionResult,
} from "@/app/admin/actions";

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";
const labelCls = "mb-1 block text-xs font-semibold text-slate-700";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Updating…" : "Update password"}
    </button>
  );
}

export function ChangePasswordForm() {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    changePasswordAction,
    null
  );

  return (
    <form action={formAction} className="max-w-sm space-y-4">
      <div>
        <label htmlFor="current" className={labelCls}>
          Current password
        </label>
        <input
          id="current"
          name="current"
          type="password"
          autoComplete="current-password"
          required
          className={field}
        />
      </div>
      <div>
        <label htmlFor="next" className={labelCls}>
          New password
        </label>
        <input
          id="next"
          name="next"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={field}
        />
      </div>

      {state && !state.ok ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {state.error}
        </p>
      ) : state?.ok ? (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          Password updated.
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
