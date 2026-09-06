"use client";

import { useRef, useState } from "react";
import { ImageUp, Loader2, X } from "lucide-react";
import {
  ALLOWED_IMAGE_ACCEPT,
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
} from "@/lib/media";

interface ImageFieldProps {
  label: string;
  /** Current stored value — a URL/path like /api/media/<id>. */
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

const labelCls = "mb-1 block text-xs font-semibold text-slate-700";

export function ImageField({ label, value, onChange, hint }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);

    if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      setError("Please choose a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(`Image is too large (max ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB).`);
      return;
    }

    const body = new FormData();
    body.append("file", file);

    setBusy(true);
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Upload failed.");
        return;
      }
      onChange(json.url as string);
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className={labelCls}>{label}</span>

      <div className="flex items-start gap-3">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <ImageUp className="size-6 text-slate-300" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_IMAGE_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <ImageUp className="size-3.5" />
              )}
              {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
            </button>
            {value ? (
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  onChange("");
                  setError(null);
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                <X className="size-3.5" /> Remove
              </button>
            ) : null}
          </div>

          <p className="mt-1.5 text-xs text-slate-500">
            {error ? (
              <span className="font-medium text-red-600">{error}</span>
            ) : (
              (hint ?? "JPG, PNG or WebP — up to 4 MB.")
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
