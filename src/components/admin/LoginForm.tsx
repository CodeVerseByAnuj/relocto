"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type ActionResult } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    loginAction,
    null
  );

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h1 className="text-lg font-bold text-slate-900">Relocato CMS</h1>
      <p className="mt-1 text-sm text-slate-500">Sign in to manage content.</p>

      {next ? <input type="hidden" name="next" value={next} /> : null}

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-semibold text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-xs font-semibold text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {state && !state.ok ? (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
