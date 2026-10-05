import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { NewBlogPostForm } from "@/components/admin/NewBlogPostForm";

export default async function NewBlogPostPage() {
  await requireAdmin();

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to blog
      </Link>
      <h1 className="mt-3 text-xl font-bold text-slate-900">New article</h1>
      <p className="mt-1 mb-6 text-sm text-slate-500">
        Give the article a title, then write its content.
      </p>
      <NewBlogPostForm />
    </div>
  );
}
