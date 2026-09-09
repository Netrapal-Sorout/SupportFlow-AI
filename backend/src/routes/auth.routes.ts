import { Router } from 'express';

import {
  getCurrentUserController,
  loginController,
} from '../controllers/auth.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', loginController);

router.get(
  '/me',
  authenticate,
  getCurrentUserController,
);

export default router;