import { Router } from 'express';

import {
  createClientTicketController,
  getClientTicketByIdController,
  getClientTicketsController,
} from '../controllers/client-ticket.controller.js';

import {
  authenticateClient,
} from '../middleware/client-auth.middleware.js';

import {
  clientTicketUpload,
} from '../middleware/client-ticket-upload.middleware.js';

const router = Router();

router.use(authenticateClient);

router.get('/', getClientTicketsController);

router.post(
  '/',
  clientTicketUpload.array('attachments', 5),
  createClientTicketController,
);

router.get(
  '/:ticketId',
  getClientTicketByIdController,
);

export default router;