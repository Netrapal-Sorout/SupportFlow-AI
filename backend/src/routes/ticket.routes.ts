import { Router } from 'express';

import {
  assignTicketController,
  createTicketController,
  getTicketByIdController,
  getTicketsController,
} from '../controllers/ticket.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = Router();

router.get(
  '/',
  authenticate,
  getTicketsController,
);

router.get(
  '/:id',
  authenticate,
  getTicketByIdController,
);

router.post(
  '/',
  authenticate,
  createTicketController,
);

// ADMIN only: assign or reassign tickets
router.patch(
  '/:id/assignment',
  authenticate,
  authorizeRoles('ADMIN'),
  assignTicketController,
);

export default router;