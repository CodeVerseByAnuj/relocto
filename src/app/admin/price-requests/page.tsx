import Link from "next/link";
import { PriceRequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { formatInr } from "@/lib/pricing";
import {
  PRICE_REQUEST_STATUS_LABELS,
  quotedPrice,
  requestItems,
} from "@/lib/priceRequest";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const dateTime = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

const statusStyles: Record<PriceRequestStatus, string> = {
  NEW: "bg-amber-50 text-amber-800",
  SENT: "bg-emerald-50 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-600",
};

interface PriceRequestsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminPriceRequestsPage({
  searchParams,
}: PriceRequestsPageProps) {
  await requireAdmin();
  const params = await searchParams;

  const status = Object.values(PriceRequestStatus).find(
    (s) => s === params.status
  );

  const [requests, counts] = await Promise.all([
    prisma.priceRequest.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.priceRequest.groupBy({ by: ["status"], _count: true }),
  ]);

  const countOf = (s: PriceRequestStatus) =>
    counts.find((row) => row.status === s)?._count ?? 0;
  const tabs = [
    {
      label: "All",
      value: undefined,
      count: counts.reduce((sum, row) => sum + row._count, 0),
    },
    ...Object.values(PriceRequestStatus).map((s) => ({
      label: PRICE_REQUEST_STATUS_LABELS[s],
      value: s,
      count: countOf(s),
    })),
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Price requests</h1>
      <p className="mt-1 text-sm text-slate-500">
        Customers who asked for a moving price on /get-quote. View one to review
        the price, then send it on WhatsApp or email the PDF.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={
              tab.value
                ? `/admin/price-requests?status=${tab.value}`
                : "/admin/price-requests"
            }
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
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => (
              <tr key={request.id} className="align-top hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">{request.name}</div>
                  <div className="text-xs text-slate-500">{request.phone}</div>
                  <Link
                    href={`/admin/price-requests/${request.id}`}
                    className="mt-2 inline-block rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    View
                  </Link>
                </td>
                <td className="max-w-xs px-4 py-3 text-xs text-slate-600">
                  {request.fromLabel} → {request.toLabel}
                  <div className="mt-0.5 text-slate-400">{request.km} km</div>
                </td>
                <td className="min-w-48 px-4 py-3 text-xs text-slate-600">
                  <ul className="space-y-0.5">
                    {requestItems(request).map((item) => (
                      <li key={`${item.category}-${item.name}`}>
                        {item.name} × {item.quantity}
                        <span className="ml-1 text-slate-400">
                          ({item.category})
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {formatInr(quotedPrice(request))}
                  {request.finalPrice === null ? (
                    <div className="text-xs font-normal text-slate-400">
                      not reviewed
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-xs whitespace-nowrap text-slate-500">
                  {dateTime.format(request.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      statusStyles[request.status]
                    )}
                  >
                    {PRICE_REQUEST_STATUS_LABELS[request.status]}
                  </span>
                </td>
              </tr>
            ))}
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  No price requests yet. They appear here when a customer submits
                  the /get-quote form.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
