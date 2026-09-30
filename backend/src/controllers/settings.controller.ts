import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import { prisma } from '../config/database.js';

import {
  preferencesSchema,
  profileSettingsSchema,
  workspaceSettingsSchema,
} from '../schemas/settings.schema.js';

const defaultPreferences = {
  notifications: {
    emailNotifications: true,
    ticketAssignments: true,
    ticketReplies: true,
    aiAlerts: true,
    weeklyReports: false,
  },

  ai: {
    aiEnabled: true,
    autoClassification: true,
    suggestedReplies: true,
    autoSummaries: true,
    humanApprovalRequired: true,
    confidenceThreshold: 85,
  },
};

export async function getSettingsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user!.id,
      },
      include: {
        workspace: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });

      return;
    }

    res.json({
      success: true,
      data: {
        profile: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },

        workspace: user.workspace,

        preferences:
          user.preferences ?? defaultPreferences,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = profileSettingsSchema.safeParse(
      req.body,
    );

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid profile data',
        errors: parsed.error.flatten().fieldErrors,
      });

      return;
    }

    const updated = await prisma.user.update({
      where: {
        id: req.user!.id,
      },

      data: {
        name: parsed.data.name,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateWorkspaceController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = workspaceSettingsSchema.safeParse(
      req.body,
    );

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid workspace data',
        errors: parsed.error.flatten().fieldErrors,
      });

      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user!.id,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });

      return;
    }

    let workspace;

    if (user.workspaceId) {
      workspace = await prisma.workspace.update({
        where: {
          id: user.workspaceId,
        },

        data: parsed.data,
      });
    } else {
      workspace = await prisma.workspace.create({
        data: parsed.data,
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          workspaceId: workspace.id,
        },
      });
    }

    res.json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePreferencesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = preferencesSchema.safeParse(
      req.body,
    );

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid preferences',
        errors: parsed.error.flatten().fieldErrors,
      });

      return;
    }

    await prisma.user.update({
      where: {
        id: req.user!.id,
      },

      data: {
        preferences: parsed.data,
      },
    });

    res.json({
      success: true,
      data: parsed.data,
    });
  } catch (error) {
    next(error);
  }
}