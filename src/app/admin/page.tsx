import Link from "next/link";
import { Eye, EyeOff, Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { togglePublishAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminLocationsPage() {
  await requireAdmin();

  const locations = await prisma.location.findMany({
    orderBy: [{ order: "asc" }, { city: "asc" }],
    include: { _count: { select: { services: true, features: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Locations</h1>
          <p className="mt-1 text-sm text-slate-500">
            {locations.length} location{locations.length === 1 ? "" : "s"} · each
            drives one <code>/services/&lt;slug&gt;</code> page.
          </p>
        </div>
        <Link
          href="/admin/locations/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus className="size-4" /> New location
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Content</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {locations.map((location) => (
              <tr key={location.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">
                    {location.city}
                  </div>
                  <div className="text-xs text-slate-500">{location.state}</div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-slate-600">
                  /services/{location.slug}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {location._count.services} services ·{" "}
                  {location._count.features} features · {location.areas.length}{" "}
                  areas
                </td>
                <td className="px-4 py-3">
                  {location.published ? (
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
                      action={togglePublishAction.bind(
                        null,
                        location.id,
                        !location.published
                      )}
                    >
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                        title={location.published ? "Unpublish" : "Publish"}
                      >
                        {location.published ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                        {location.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/locations/${location.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      <Pencil className="size-3.5" /> Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {locations.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No locations yet. Create your first one.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
