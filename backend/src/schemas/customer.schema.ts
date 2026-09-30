import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  company: z.string().trim().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export type CustomerInput = z.infer<typeof customerSchema>;
