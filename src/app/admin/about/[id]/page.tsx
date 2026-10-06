import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { AboutPageEditor } from "@/components/admin/AboutPageEditor";
import { toAboutPageContent } from "@/lib/queries/aboutPage";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAboutPagePage({ params }: EditPageProps) {
  await requireAdmin();
  const { id } = await params;

  const page = await prisma.aboutPage.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div>
      <Link
        href="/admin/about"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to about pages
      </Link>
      <h1 className="mt-3 mb-6 text-xl font-bold text-slate-900">
        {page.title}
      </h1>
      <AboutPageEditor page={toAboutPageContent(page)} />
    </div>
  );
}
