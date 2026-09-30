import { Router } from 'express';

import {
  getCurrentUserController,
  loginController,
  registerController,
} from '../controllers/auth.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.get(
  '/me',
  authenticate,
  getCurrentUserController,
);

export default router;