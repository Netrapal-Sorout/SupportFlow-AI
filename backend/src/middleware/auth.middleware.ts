import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { findUserById } from '../repositories/auth.repository.js';

interface AuthTokenPayload {
  sub: string;
  role: 'ADMIN' | 'SUPPORT_AGENT';
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'ADMIN' | 'SUPPORT_AGENT';
      };
    }
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });

      return;
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      res.status(401).json({
        success: false,
        message: 'Invalid authorization header',
      });

      return;
    }

    const payload = jwt.verify(
      token,
      getJwtSecret(),
    ) as AuthTokenPayload;

    if (!payload.sub || !payload.role) {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      });

      return;
    }

    const user = await findUserById(payload.sub);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });

      return;
    }

    if (user.status !== 'ACTIVE') {
      res.status(401).json({
        success: false,
        message: 'User account is inactive',
      });

      return;
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token',
    });
  }
}