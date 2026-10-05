"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "@/lib/useActionState";
import { createBlogPostAction, type ActionResult } from "@/app/admin/actions";
import { field, labelCls } from "@/components/admin/fields";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? "Creating…" : "Create & write article"}
    </button>
  );
}

export function NewBlogPostForm() {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    createBlogPostAction,
    null
  );

  return (
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="title" className={labelCls}>
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          placeholder="e.g. 10 Tips for a Stress-Free House Move"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="slug" className={labelCls}>
          URL slug (optional)
        </label>
        <input
          id="slug"
          name="slug"
          placeholder="Leave blank to create it from the title"
          className={`${field} font-mono`}
        />
        <p className="mt-1 text-xs text-slate-500">
          The article will be <code>/blog/&lt;slug&gt;</code>.
        </p>
      </div>

      {state && !state.ok ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {state.error}
        </p>
      ) : null}

      <p className="text-xs text-slate-500">
        The new article starts as a <strong>Draft</strong>. Write it on the next
        screen and publish when ready.
      </p>

      <SubmitButton />
    </form>
  );
}
