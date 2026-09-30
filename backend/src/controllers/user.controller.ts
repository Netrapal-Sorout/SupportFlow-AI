import type { NextFunction, Request, Response } from 'express';

import {
  createNewUser,
  getUsers,
} from '../services/user.service.js';

import { createUserSchema } from '../schemas/user.schema.js';

export async function getUsersController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users = await getUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid user data',
        errors: result.error.flatten(),
      });

      return;
    }

    const user = await createNewUser(result.data);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}