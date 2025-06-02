import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const post = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
    schema: z.object({
      title: z.string(),
      publishDate: z.string(),
      updatedDate: z.string().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()),
    })
});

export const collections = {
  posts: post,
};

