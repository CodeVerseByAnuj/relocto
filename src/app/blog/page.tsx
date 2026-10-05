import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesPageHero } from "@/components/sections/services/ServicesPageHero";
import { BlogCard } from "@/components/sections/blog/BlogCard";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import { listPublishedPosts } from "@/lib/queries/blogPost";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog | Relocato Packers and Movers",
  description:
    "Moving tips, relocation guides and company news from the Relocato team.",
};

export default async function BlogPage() {
  const posts = await listPublishedPosts();
  const [latest, ...older] = posts;

  return (
    <>
      <Header />
      <ServicesPageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow="Relocato Blog"
        title="Moving Tips & Relocation Guides"
        description="Practical advice from our move managers to help you plan, pack and settle in with less stress."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {latest ? (
            <>
              <BlogCard post={latest} featured />
              {older.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {older.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="py-12 text-center text-base text-muted-foreground">
              No articles have been published yet. Please check back soon.
            </p>
          )}
        </div>
      </section>

      <QuoteSection />
      <Footer />
    </>
  );
}
