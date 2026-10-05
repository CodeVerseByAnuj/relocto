"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { ImageField } from "@/components/admin/ImageField";
import {
  Area,
  Section,
  Text,
  field,
  labelCls,
} from "@/components/admin/fields";
import {
  saveBlogPostAction,
  deleteBlogPostAction,
  type ActionResult,
} from "@/app/admin/actions";
import type { BlogPost } from "@/lib/queries/blogPost";

interface BlogPostEditorProps {
  post: BlogPost;
  /** Categories already used by other articles, offered as suggestions. */
  categories: string[];
}

export function BlogPostEditor({ post, categories }: BlogPostEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const [form, setForm] = useState({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImageUrl: post.coverImageUrl ?? "",
    category: post.category ?? "",
    author: post.author ?? "",
    published: post.published,
    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString().slice(0, 10)
      : "",
    metaTitle: post.metaTitle ?? "",
    metaDescription: post.metaDescription ?? "",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function save() {
    setResult(null);
    startTransition(async () => {
      const res = await saveBlogPostAction(post.id, form);
      setResult(res);
      if (res.ok) router.refresh();
    });
  }

  function remove() {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    startTransition(() => deleteBlogPostAction(post.id));
  }

  return (
    <div className="space-y-5 pb-24">
      <Section title="Article" description="Title, summary and cover image.">
        <Text
          label="Title"
          value={form.title}
          onChange={(v) => set("title", v)}
        />
        <Area
          label="Summary"
          rows={3}
          value={form.excerpt}
          onChange={(v) => set("excerpt", v)}
          hint="One or two sentences shown on the blog page and under the article title."
        />
        <ImageField
          label="Cover image (optional)"
          value={form.coverImageUrl}
          onChange={(v) => set("coverImageUrl", v)}
          hint="JPG, PNG or WebP up to 4 MB. A wide image (16:9) works best."
        />
      </Section>

      <Section
        title="Content"
        description="The article body, written in Markdown."
      >
        <div>
          <label className={labelCls}>Content</label>
          <textarea
            value={form.content}
            rows={22}
            onChange={(e) => set("content", e.target.value)}
            className={`${field} resize-y font-mono`}
          />
          <p className="mt-1 text-xs text-slate-500">
            Leave a blank line between paragraphs. <code>## Heading</code>,{" "}
            <code>### Sub-heading</code>, <code>**bold**</code>,{" "}
            <code>*italic*</code>, <code>- list item</code>,{" "}
            <code>1. numbered item</code>, <code>&gt; quote</code>,{" "}
            <code>[link text](https://…)</code>.
          </p>
        </div>
        <ImageField
          label="Add an image inside the article"
          value=""
          onChange={(url) => {
            if (!url) return;
            setForm((prev) => ({
              ...prev,
              content: `${prev.content.trimEnd()}\n\n![Describe the image](${url})\n`,
            }));
          }}
          hint="Uploads the image and adds it at the end of the content; move that line where you want it."
        />
      </Section>

      <Section title="Publishing" description="URL, category and visibility.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Text
            label="Slug"
            mono
            value={form.slug}
            onChange={(v) => set("slug", v)}
          />
          <div>
            <label className={labelCls}>Category (optional)</label>
            <input
              value={form.category}
              list="blog-categories"
              placeholder="e.g. Moving Tips"
              onChange={(e) => set("category", e.target.value)}
              className={field}
            />
            <datalist id="blog-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>
          <Text
            label="Author (optional)"
            value={form.author}
            onChange={(v) => set("author", v)}
          />
          <div>
            <label className={labelCls}>Publish date</label>
            <input
              type="date"
              value={form.publishedAt}
              onChange={(e) => set("publishedAt", e.target.value)}
              className={field}
            />
            <p className="mt-1 text-xs text-slate-500">
              Blank = the day it is first published.
            </p>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            className="size-4"
          />
          Published (visible at /blog/{form.slug})
        </label>
      </Section>

      <Section title="SEO" description="Optional overrides for search engines.">
        <Text
          label="Meta title"
          value={form.metaTitle}
          onChange={(v) => set("metaTitle", v)}
          placeholder="Defaults to the article title"
        />
        <Area
          label="Meta description"
          rows={2}
          value={form.metaDescription}
          onChange={(v) => set("metaDescription", v)}
          hint="Defaults to the summary."
        />
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
          <div className="flex items-center gap-2">
            {post.published ? (
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                <ExternalLink className="size-3.5" /> View article
              </a>
            ) : null}
            <button
              type="button"
              onClick={remove}
              disabled={isPending}
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              Delete
            </button>
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
    </div>
  );
}
