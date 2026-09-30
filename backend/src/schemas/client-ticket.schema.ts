import { z } from 'zod';

export const createClientTicketSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(5, 'Subject must be at least 5 characters')
    .max(150, 'Subject must be less than 150 characters'),

  category: z.enum([
    'BILLING',
    'TECHNICAL',
    'ACCOUNT',
    'SHIPPING',
    'GENERAL',
  ]),

  priority: z.enum([
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT',
  ]),

  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(
      5000,
      'Description must be less than 5000 characters',
    ),
});

export type CreateClientTicketInput =
  z.infer<typeof createClientTicketSchema>;