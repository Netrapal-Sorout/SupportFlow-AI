import type { NextFunction, Request, Response } from 'express';

type UserRole = 'ADMIN' | 'SUPPORT_AGENT';

export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });

      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });

      return;
    }

    next();
  };
}