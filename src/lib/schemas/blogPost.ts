import { z } from "zod";
import { optionalText, slugSchema } from "@/lib/schemas/location";

const trimmed = z.string().trim();

export const blogPostSchema = z
  .object({
    slug: slugSchema,
    title: trimmed.min(1, "Title is required"),
    excerpt: trimmed.max(400, "Keep the summary under 400 characters"),
    content: z.string(),
    coverImageUrl: optionalText,
    category: optionalText,
    author: optionalText,
    published: z.boolean().default(false),
    /** yyyy-mm-dd from the date input; blank = set automatically on publish. */
    publishedAt: trimmed
      .nullish()
      .refine((v) => !v || !Number.isNaN(Date.parse(v)), "Invalid publish date")
      .transform((v) => (v ? new Date(v) : null)),
    metaTitle: optionalText,
    metaDescription: optionalText,
  })
  // Drafts can be saved half-written; a published article needs its text.
  .superRefine((post, ctx) => {
    if (!post.published) return;
    if (!post.excerpt) {
      ctx.addIssue({
        code: "custom",
        path: ["excerpt"],
        message: "Add a summary before publishing",
      });
    }
    if (!post.content.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["content"],
        message: "Add the article content before publishing",
      });
    }
  });

export type BlogPostParsed = z.output<typeof blogPostSchema>;

export const createBlogPostSchema = z.object({
  title: trimmed.min(1, "Title is required"),
  /** Optional; generated from the title when left blank. */
  slug: trimmed.optional(),
});
