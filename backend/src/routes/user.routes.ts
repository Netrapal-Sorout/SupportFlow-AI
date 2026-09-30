import { Router } from 'express';

import {
  createUserController,
  getUsersController,
} from '../controllers/user.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.get(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  getUsersController,
);

router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  createUserController,
);

export default router;