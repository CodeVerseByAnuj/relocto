import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, UserRound } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { ArticleBody } from "@/components/sections/blog/ArticleBody";
import { BlogCard } from "@/components/sections/blog/BlogCard";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import {
  getPublishedPost,
  listPublishedPostSlugs,
  listRelatedPosts,
  readingMinutes,
} from "@/lib/queries/blogPost";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;
export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    return await listPublishedPostSlugs();
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};

  const title = post.metaTitle ?? `${post.title} | Relocato Blog`;
  const description = post.metaDescription ?? post.excerpt;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const related = await listRelatedPosts(post);

  return (
    <>
      <Header />

      <section className="relative overflow-hidden pt-36 pb-14 sm:pt-40 sm:pb-16">
        <HeroBackground imageSrc="/images/poster.png" imageAlt="" />
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.category ?? "Article" },
            ]}
          />
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            {post.author ? (
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-4" aria-hidden="true" />
                {post.author}
              </span>
            ) : null}
            {post.publishedAt ? (
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4" aria-hidden="true" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {formatDate(post.publishedAt)}
                </time>
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4" aria-hidden="true" />
              {readingMinutes(post.content)} min read
            </span>
          </div>
        </div>
      </section>

      <article className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {post.coverImageUrl ? (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
              <Image
                src={post.coverImageUrl}
                alt=""
                fill
                unoptimized
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <ArticleBody content={post.content} />

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy-light hover:text-brand-navy"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to all articles
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="bg-secondary/40 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              More from the blog
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <QuoteSection />
      <Footer />
    </>
  );
}
