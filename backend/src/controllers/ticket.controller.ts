import type { NextFunction, Request, Response } from 'express';

import {
  assignTicketToUser,
  createNewTicket,
  getTicketById,
  getTickets,
} from '../services/ticket.service.js';

import { findUserById } from '../repositories/auth.repository.js';

import { createTicketSchema } from '../schemas/ticket.schema.js';
import { assignTicketSchema } from '../schemas/ticket-assignment.schema.js';

export async function getTicketsController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tickets = await getTickets();

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTicketByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;

    if (typeof id !== 'string' || id.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket ID',
      });

      return;
    }

    const ticket = await getTicketById(id);

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}

export async function createTicketController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = createTicketSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket data',
        errors: result.error.flatten(),
      });

      return;
    }

    const ticket = await createNewTicket(result.data);

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}

export async function assignTicketController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;

    if (typeof id !== 'string' || id.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket ID',
      });

      return;
    }

    const result = assignTicketSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid assignment data',
        errors: result.error.flatten(),
      });

      return;
    }

    const assignedUser = await findUserById(
      result.data.assignedUserId,
    );

    if (!assignedUser) {
      res.status(404).json({
        success: false,
        message: 'Assigned user not found',
      });

      return;
    }

    if (assignedUser.status !== 'ACTIVE') {
      res.status(400).json({
        success: false,
        message: 'Cannot assign ticket to an inactive user',
      });

      return;
    }

    if (
      assignedUser.role !== 'ADMIN' &&
      assignedUser.role !== 'SUPPORT_AGENT'
    ) {
      res.status(400).json({
        success: false,
        message: 'Invalid assigned user role',
      });

      return;
    }

    const ticket = await assignTicketToUser(
      id,
      result.data.assignedUserId,
    );

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}