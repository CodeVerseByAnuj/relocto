import Link from "next/link";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";

// Each Markdown element gets the site's typography; react-markdown renders to
// React elements, so nothing from the stored text is injected as raw HTML.
const components: Components = {
  // The page title is the only h1; a "# Heading" in the body becomes an h2.
  h1: ({ children }) => (
    <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-bold text-brand-navy-dark">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 text-lg font-bold text-brand-navy-dark">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/80 marker:text-brand-navy-light sm:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-foreground/80 marker:font-semibold marker:text-brand-navy-light sm:text-lg">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-brand-accent bg-brand-navy/[0.03] py-1 pr-4 pl-5 italic [&>p:first-child]:mt-3 [&>p:last-child]:mb-3">
      {children}
    </blockquote>
  ),
  a: ({ href = "", children }) => {
    const className =
      "font-medium text-brand-navy-light underline underline-offset-2 hover:text-brand-navy";
    return href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) =>
    typeof src === "string" && src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="mt-6 w-full rounded-2xl"
      />
    ) : null,
  strong: ({ children }) => (
    <strong className="font-semibold text-brand-navy-dark">{children}</strong>
  ),
  hr: () => <hr className="mt-10 border-border" />,
  code: ({ children }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
      {children}
    </code>
  ),
};

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <Markdown components={components}>{content}</Markdown>
    </div>
  );
}
