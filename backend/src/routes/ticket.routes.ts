import { Router } from 'express';

import {
  createTicketController,
  getTicketsController,
  getTicketByIdController,
} from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', getTicketsController);

router.get('/:id', getTicketByIdController);

router.post('/', createTicketController);

export default router;