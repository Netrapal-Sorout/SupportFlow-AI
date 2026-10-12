
import { Router } from 'express';

import {
  getClientMeController,
  loginClientController,
  registerClientController,
  clientCognitoSsoController,
} from '../controllers/client-auth.controller.js';

import {
  authenticateClient,
} from '../middleware/client-auth.middleware.js';

const router = Router();

// Customer registration
router.post(
  '/register',
  registerClientController,
);

// Customer email/password login
router.post(
  '/login',
  loginClientController,
);

// Google SSO through Amazon Cognito
router.post(
  '/sso/cognito',
  clientCognitoSsoController,
);

// Get the authenticated customer's profile
router.get(
  '/me',
  authenticateClient,
  getClientMeController,
);

export default router;
