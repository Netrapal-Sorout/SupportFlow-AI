import { z } from 'zod';
export const aiAnalyzeSchema = z.object({ ticketId: z.string().uuid().optional(), message: z.string().trim().min(1).optional() }).refine((value) => Boolean(value.ticketId || value.message), { message: 'ticketId or message is required' });
