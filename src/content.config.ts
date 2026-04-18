import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(100),
    updated: z.coerce.date().optional(),
    section: z.enum(['skill', 'cli', 'reference']).optional(),
  }),
});

export const collections = { docs };
