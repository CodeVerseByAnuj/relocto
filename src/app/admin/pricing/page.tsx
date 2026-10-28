import { requireAdmin } from "@/lib/auth";
import { getPricing } from "@/lib/queries/pricing";
import { PricingEditor } from "@/components/admin/PricingEditor";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  await requireAdmin();
  const pricing = await getPricing();

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Pricing</h1>
      <p className="mt-1 mb-6 text-sm text-slate-500">
        Categories and the items inside them (with a price per piece), plus the
        distance charges. The price calculator on /get-quote uses these.
      </p>
      <PricingEditor pricing={pricing} />
    </div>
  );
}
