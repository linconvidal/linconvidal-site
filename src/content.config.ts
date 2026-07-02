import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.date(),
    tags: z.array(z.string()).default([]),
    pillar: z.enum(['visuals', 'software', 'games', 'personal']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes };
