import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import jwt from 'jsonwebtoken';

interface ClientJwtPayload {
  sub: string;
  type: 'CUSTOMER';
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      client?: {
        id: string;
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

export function authenticateClient(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authorization =
    req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Customer authentication required',
    });

    return;
  }

  const token = authorization.substring(7);

  try {
    const payload = jwt.verify(
      token,
      getJwtSecret(),
    ) as ClientJwtPayload;

    if (
      payload.type !== 'CUSTOMER' ||
      !payload.sub
    ) {
      res.status(401).json({
        success: false,
        message: 'Invalid customer token',
      });

      return;
    }

    req.client = {
      id: payload.sub,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired customer token',
    });
  }
}