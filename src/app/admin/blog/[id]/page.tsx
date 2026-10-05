import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditPageProps) {
  await requireAdmin();
  const { id } = await params;

  const [post, categoryRows] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogPost.findMany({
      where: { category: { not: null } },
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
  ]);

  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to blog
      </Link>
      <h1 className="mt-3 mb-6 text-xl font-bold text-slate-900">
        {post.title}
      </h1>
      <BlogPostEditor
        post={post}
        categories={categoryRows.flatMap((row) => row.category ?? [])}
      />
    </div>
  );
}
