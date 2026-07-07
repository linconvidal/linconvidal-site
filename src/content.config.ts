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

// Work entries power the software and games sections. `started` is the year
// work began; precision "by" means the work was already underway by that year
// but the exact start is not recorded. `statusNote` is free text shown after
// the status word. `origin` records lineage, such as a killed predecessor that
// should not be promoted into its own public category.
const work = defineCollection({
  loader: file('./src/data/work.json'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    origin: z.string().optional(),
    lede: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      })
      .optional(),
    kind: z.enum(['software', 'game']),
    started: z.number().int(),
    startedPrecision: z.enum(['year', 'by']).default('year'),
    status: z.enum(['active', 'paused', 'experiment', 'unfinished', 'archived']),
    statusNote: z.string().optional(),
    sections: z
      .array(
        z.object({
          kicker: z.string(),
          title: z.string(),
          body: z.array(z.string()),
        }),
      )
      .default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
  }),
});

export const collections = { notes, photos, series, work };
