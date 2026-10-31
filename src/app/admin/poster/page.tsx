import { requireAdmin } from "@/lib/auth";
import { DEFAULT_POSTER, getStoredPoster } from "@/lib/queries/siteSettings";
import { PosterEditor } from "@/components/admin/PosterEditor";

export const dynamic = "force-dynamic";

export default async function AdminPosterPage() {
  await requireAdmin();
  const poster = await getStoredPoster();

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Background poster</h1>
      <p className="mt-1 mb-6 text-sm text-slate-500">
        The background image behind the home page hero and the page headers
        (services, blog, get price, about). Remove it to go back to the default.
      </p>
      <PosterEditor initialUrl={poster} defaultUrl={DEFAULT_POSTER} />
    </div>
  );
}
