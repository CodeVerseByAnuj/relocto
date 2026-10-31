"use client";

import { useState, useTransition } from "react";
import { ImageField } from "@/components/admin/ImageField";
import { savePosterAction } from "@/app/admin/actions";

interface PosterEditorProps {
  initialUrl: string;
  defaultUrl: string;
}

export function PosterEditor({ initialUrl, defaultUrl }: PosterEditorProps) {
  const [url, setUrl] = useState(initialUrl);
  const [saved, setSaved] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function save() {
    setError(null);
    startTransition(async () => {
      const result = await savePosterAction(url);
      if (result.ok) setSaved(url);
      else setError(result.error);
    });
  }

  return (
    <div className="max-w-xl space-y-4">
      <ImageField
        label="Poster image"
        value={url}
        onChange={setUrl}
        hint="JPG, PNG or WebP — up to 4 MB. A wide, high-resolution photo works best."
      />

      <div className="overflow-hidden rounded-xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url || defaultUrl}
          alt="Poster preview"
          className="aspect-[16/7] w-full object-cover"
        />
      </div>
      {!url ? (
        <p className="text-xs text-slate-500">
          No image uploaded — the site uses the default poster shown above.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={save}
        disabled={pending || url === saved}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : url === saved ? "Saved" : "Save poster"}
      </button>
    </div>
  );
}
