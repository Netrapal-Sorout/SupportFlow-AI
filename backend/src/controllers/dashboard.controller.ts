import type { NextFunction, Request, Response } from 'express';

import { getDashboard } from '../services/dashboard.service.js';

export async function getDashboardController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const rawDays = req.query.days;
    const days =
      typeof rawDays === 'string' && rawDays.trim() !== ''
        ? Number(rawDays)
        : 7;

    if (!Number.isInteger(days) || days < 1 || days > 31) {
      res.status(400).json({
        success: false,
        message: 'days must be an integer between 1 and 31',
      });
      return;
    }

    const dashboard = await getDashboard(days);

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
}
