import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.date(),
    tags: z.array(z.string()).default([]),
    pillar: z.enum(['photography', 'software', 'games', 'personal']).optional(),
    draft: z.boolean().default(false),
  }),
});

const photos = defineCollection({
  loader: file('./src/data/photos.json'),
  schema: z.object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
    year: z.number().int(),
    date: z.coerce.date().optional(),
    place: z.object({
      slug: z.string(),
      title: z.string(),
    }),
    tags: z.array(z.string()).default([]),
  }),
});

// A series is an authored sequence: an explicit, ordered list of photo slugs.
const series = defineCollection({
  loader: file('./src/data/series.json'),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    photos: z.array(reference('photos')),
  }),
});

export const collections = { notes, photos, series };
