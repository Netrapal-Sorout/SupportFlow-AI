import { Router } from 'express';

import {
  getClientMeController,
  loginClientController,
  registerClientController,
} from '../controllers/client-auth.controller.js';

import {
  authenticateClient,
} from '../middleware/client-auth.middleware.js';

const router = Router();

router.post(
  '/register',
  registerClientController,
);

router.post(
  '/login',
  loginClientController,
);

router.get(
  '/me',
  authenticateClient,
  getClientMeController,
);

export default router;