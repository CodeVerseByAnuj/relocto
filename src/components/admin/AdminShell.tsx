import Link from "next/link";
import {
  Inbox,
  Info,
  LayoutGrid,
  LogOut,
  MapPin,
  Newspaper,
  UserCog,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

interface AdminShellProps {
  admin: { email: string; name: string | null };
  children: React.ReactNode;
}

export async function AdminShell({ admin, children }: AdminShellProps) {
  const newInquiries = await prisma.inquiry
    .count({ where: { status: "NEW" } })
    .catch(() => 0);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="text-sm font-bold text-slate-900">Relocato CMS</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{admin.email}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <Inbox className="size-4" /> Inquiries
            {newInquiries > 0 ? (
              <span className="ml-auto rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                {newInquiries}
              </span>
            ) : null}
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <MapPin className="size-4" /> Locations
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <LayoutGrid className="size-4" /> Services
          </Link>
          <Link
            href="/admin/blog"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <Newspaper className="size-4" /> Blog
          </Link>
          <Link
            href="/admin/about"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <Info className="size-4" /> About pages
          </Link>
          <Link
            href="/admin/account"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <UserCog className="size-4" /> Account
          </Link>
        </nav>
        <form action={logoutAction} className="border-t border-slate-200 p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
