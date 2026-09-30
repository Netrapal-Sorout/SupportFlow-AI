import { z } from 'zod';

export const assignTicketSchema = z.object({
  assignedUserId: z
    .string()
    .uuid('Invalid user ID'),
});

export type AssignTicketInput = z.infer<
  typeof assignTicketSchema
>;