import { z } from 'zod';

export const clientRegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters'),

  email: z
    .string()
    .trim()
    .email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),

  company: z
    .string()
    .trim()
    .max(150, 'Company name is too long')
    .optional(),
});

export const clientLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address'),

  password: z
    .string()
    .min(1, 'Password is required'),
});

export type ClientRegisterInput =
  z.infer<typeof clientRegisterSchema>;

export type ClientLoginInput =
  z.infer<typeof clientLoginSchema>;