import { z } from 'zod';

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters'),

  slug: z
    .string()
    .trim()
    .min(3, 'Slug must be at least 3 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug can only contain lowercase letters, numbers, and hyphens',
    ),

  category: z.enum(
    ['BILLING', 'ACCOUNT', 'SHIPPING', 'TECHNICAL', 'GENERAL'],
    {
      message: 'Invalid article category',
    },
  ),

  status: z.enum(['PUBLISHED', 'DRAFT'], {
    message: 'Invalid article status',
  }),

  summary: z
    .string()
    .trim()
    .min(10, 'Summary must be at least 10 characters'),

  content: z
    .string()
    .trim()
    .min(10, 'Content must be at least 10 characters'),
});

export type ArticleInput = z.infer<typeof articleSchema>;