import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { InquiryStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { InquiryActions } from "@/components/admin/InquiryActions";
import { INQUIRY_STATUS_LABELS } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

const dateTime = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

interface InquiriesPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function AdminInquiriesPage({
  searchParams,
}: InquiriesPageProps) {
  await requireAdmin();
  const params = await searchParams;

  const status = Object.values(InquiryStatus).find((s) => s === params.status);
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const where = status ? { status } : {};

  const [inquiries, total, counts] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.inquiry.count({ where }),
    prisma.inquiry.groupBy({ by: ["status"], _count: true }),
  ]);

  const countOf = (s: InquiryStatus) =>
    counts.find((row) => row.status === s)?._count ?? 0;
  const allCount = counts.reduce((sum, row) => sum + row._count, 0);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const tabs = [
    { label: "All", value: undefined, count: allCount },
    ...Object.values(InquiryStatus).map((s) => ({
      label: INQUIRY_STATUS_LABELS[s],
      value: s,
      count: countOf(s),
    })),
  ];
  const hrefFor = (s: InquiryStatus | undefined, p = 1) => {
    const query = new URLSearchParams();
    if (s) query.set("status", s);
    if (p > 1) query.set("page", String(p));
    const qs = query.toString();
    return qs ? `/admin/inquiries?${qs}` : "/admin/inquiries";
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Inquiries</h1>
      <p className="mt-1 text-sm text-slate-500">
        Every quote / contact form submitted on the website, newest first.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={hrefFor(tab.value)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold",
              tab.value === status
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
            )}
          >
            {tab.label} ({tab.count})
          </Link>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Move</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="align-top hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">
                    {inquiry.name}
                  </div>
                  <a
                    href={`tel:${inquiry.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900"
                  >
                    <Phone className="size-3 shrink-0" /> {inquiry.phone}
                  </a>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="mt-0.5 flex items-center gap-1.5 text-xs break-all text-slate-600 hover:text-slate-900"
                  >
                    <Mail className="size-3 shrink-0" /> {inquiry.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 size-3 shrink-0" />
                    <span>
                      {inquiry.movingFrom ?? "—"} → {inquiry.movingTo ?? "—"}
                    </span>
                  </div>
                  <div className="mt-0.5 text-slate-400">{inquiry.country}</div>
                </td>
                <td className="max-w-xs px-4 py-3 text-xs whitespace-pre-wrap text-slate-600">
                  {inquiry.message ?? <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500">
                  {dateTime.format(inquiry.createdAt)}
                  {inquiry.sourcePath ? (
                    <div className="mt-0.5 font-mono text-slate-400">
                      {inquiry.sourcePath}
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <InquiryActions
                    id={inquiry.id}
                    name={inquiry.name}
                    status={inquiry.status}
                  />
                </td>
              </tr>
            ))}
            {inquiries.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  {status
                    ? `No ${INQUIRY_STATUS_LABELS[status].toLowerCase()} inquiries.`
                    : "No inquiries yet. Submissions of the website quote form will appear here."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {pageCount > 1 ? (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            Page {page} of {pageCount} · {total} inquiries
          </span>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link
                href={hrefFor(status, page - 1)}
                className="rounded-md border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600 hover:bg-slate-100"
              >
                Newer
              </Link>
            ) : null}
            {page < pageCount ? (
              <Link
                href={hrefFor(status, page + 1)}
                className="rounded-md border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-600 hover:bg-slate-100"
              >
                Older
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
