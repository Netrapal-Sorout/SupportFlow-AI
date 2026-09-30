import { z } from 'zod';

export const createTicketSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2),
    email: z.string().trim().email(),
    company: z.string().trim().optional(),
  }),
  subject: z.string().trim().min(3),
  message: z.string().trim().min(1),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  category: z.enum(['BILLING', 'TECHNICAL', 'ACCOUNT', 'SHIPPING', 'GENERAL']).optional(),
});

export const ticketUpdateSchema = z.object({
  status: z.enum(['OPEN', 'PENDING', 'RESOLVED', 'CLOSED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  category: z.enum(['BILLING', 'TECHNICAL', 'ACCOUNT', 'SHIPPING', 'GENERAL']).optional(),
});

export const ticketMessageSchema = z.object({
  content: z.string().trim().min(1),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type TicketUpdateInput = z.infer<typeof ticketUpdateSchema>;
