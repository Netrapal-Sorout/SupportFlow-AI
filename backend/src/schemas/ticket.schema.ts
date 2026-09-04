import { z } from 'zod';

export const createTicketSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2, 'Customer name is required'),
    email: z.string().trim().email('Invalid customer email'),
    company: z.string().trim().min(1).optional(),
  }),

  subject: z.string().trim().min(3, 'Ticket subject is required'),

  message: z.string().trim().min(1, 'Ticket message is required'),

  priority: z
    .enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
    .optional(),

  category: z
    .enum([
      'BILLING',
      'TECHNICAL',
      'ACCOUNT',
      'SHIPPING',
      'GENERAL',
    ])
    .optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;