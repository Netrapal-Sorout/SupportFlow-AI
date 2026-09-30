import { z } from 'zod';

export const profileSettingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters'),
});

export const workspaceSettingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Workspace name is required'),

  slug: z
    .string()
    .trim()
    .min(2)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must contain lowercase letters, numbers and hyphens',
    ),

  timezone: z
    .string()
    .trim()
    .min(1),

  language: z
    .string()
    .trim()
    .min(2),
});

export const preferencesSchema = z.object({
  notifications: z.object({
    emailNotifications: z.boolean(),
    ticketAssignments: z.boolean(),
    ticketReplies: z.boolean(),
    aiAlerts: z.boolean(),
    weeklyReports: z.boolean(),
  }),

  ai: z.object({
    aiEnabled: z.boolean(),
    autoClassification: z.boolean(),
    suggestedReplies: z.boolean(),
    autoSummaries: z.boolean(),
    humanApprovalRequired: z.boolean(),

    confidenceThreshold: z
      .number()
      .min(0)
      .max(100),
  }),
});