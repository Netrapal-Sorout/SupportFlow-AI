import { Router } from 'express';

import {
  createClientTicketController,
  getClientTicketByIdController,
  getClientTicketsController,
} from '../controllers/client-ticket.controller.js';

import {
  authenticateClient,
} from '../middleware/client-auth.middleware.js';

const router = Router();

/*
 * All client ticket routes require
 * customer authentication.
 */
router.use(authenticateClient);

/*
 * GET /api/client-tickets
 * Get tickets belonging to the logged-in customer.
 *
 * Optional:
 * /api/client-tickets?search=payment
 */
router.get(
  '/',
  getClientTicketsController,
);

/*
 * POST /api/client-tickets
 * Create a new ticket for the logged-in customer.
 */
router.post(
  '/',
  createClientTicketController,
);

/*
 * GET /api/client-tickets/:ticketId
 * Get a single ticket belonging to the logged-in customer.
 */
router.get(
  '/:ticketId',
  getClientTicketByIdController,
);

export default router;