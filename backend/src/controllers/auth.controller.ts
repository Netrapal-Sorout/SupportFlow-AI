import type { NextFunction, Request, Response } from 'express';

import {
  loginUser,
  registerUser,
} from '../services/auth.service.js';

import {
  loginSchema,
  registerSchema,
} from '../schemas/auth.schema.js';

import { findUserById } from '../repositories/auth.repository.js';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid registration data',
        errors: result.error.flatten(),
      });

      return;
    }

    const user = await registerUser(result.data);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid login data',
        errors: result.error.flatten(),
      });

      return;
    }

    const resultData = await loginUser(result.data);

    res.status(200).json({
      success: true,
      data: resultData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUserController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });

      return;
    }

    const user = await findUserById(req.user.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}