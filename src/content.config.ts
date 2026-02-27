import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  publishDate: z.string(),
  updatedDate: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()),
});

const postsEn = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog/en" }),
  schema: postSchema,
});

const postsJa = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog/ja" }),
  schema: postSchema,
});

export const collections = {
  postsEn,
  postsJa,
};
