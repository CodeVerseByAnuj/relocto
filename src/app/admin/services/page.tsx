import Link from "next/link";
import { Eye, EyeOff, Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { toggleServiceCategoryPublishAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminServiceCategoriesPage() {
  await requireAdmin();

  const categories = await prisma.serviceCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { services: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Service categories
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {categories.length} categor{categories.length === 1 ? "y" : "ies"} ·
            each is one entry in the header Services dropdown with its own{" "}
            <code>/services/&lt;slug&gt;</code> page.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus className="size-4" /> New category
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Services</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {category.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">
                  /services/{category.slug}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {category._count.services} service
                  {category._count.services === 1 ? "" : "s"}
                </td>
                <td className="px-4 py-3">
                  {category.published ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <form
                      action={toggleServiceCategoryPublishAction.bind(
                        null,
                        category.id,
                        !category.published
                      )}
                    >
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                        title={category.published ? "Unpublish" : "Publish"}
                      >
                        {category.published ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                        {category.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/services/${category.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      <Pencil className="size-3.5" /> Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No service categories yet. Create your first one.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
