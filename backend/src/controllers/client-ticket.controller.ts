import type {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  createClientTicketSchema,
} from '../schemas/client-ticket.schema.js';

import {
  createClientTicket,
  getClientTicketById,
  getClientTickets,
} from '../services/client-ticket.service.js';

// =========================================================
// CREATE CLIENT TICKET
// =========================================================

export async function createClientTicketController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // -----------------------------------------------------
    // Make sure the customer is authenticated
    // -----------------------------------------------------

    if (!req.client) {
      res.status(401).json({
        success: false,
        message:
          'Customer authentication required',
      });

      return;
    }

    // -----------------------------------------------------
    // Validate request body
    // -----------------------------------------------------

    const result =
      createClientTicketSchema.safeParse(
        req.body,
      );

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket data',
        errors:
          result.error.flatten(),
      });

      return;
    }

    // -----------------------------------------------------
    // Create ticket for logged-in customer
    // -----------------------------------------------------

    const ticket =
      await createClientTicket({
        ...result.data,
        customerId: req.client.id,
      });

    // -----------------------------------------------------
    // Return created ticket
    // -----------------------------------------------------

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}

// =========================================================
// GET CUSTOMER TICKETS
// =========================================================

export async function getClientTicketsController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // -----------------------------------------------------
    // Make sure the customer is authenticated
    // -----------------------------------------------------

    if (!req.client) {
      res.status(401).json({
        success: false,
        message:
          'Customer authentication required',
      });

      return;
    }

    // -----------------------------------------------------
    // Read optional search parameter
    // -----------------------------------------------------

    const search =
      typeof req.query.search === 'string'
        ? req.query.search.trim()
        : undefined;

    // -----------------------------------------------------
    // Get only this customer's tickets
    // -----------------------------------------------------

    const tickets =
      await getClientTickets(
        req.client.id,
        search,
      );

    // -----------------------------------------------------
    // Return tickets
    // -----------------------------------------------------

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
}

// =========================================================
// GET SINGLE CUSTOMER TICKET
// =========================================================

export async function getClientTicketByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // -----------------------------------------------------
    // Make sure the customer is authenticated
    // -----------------------------------------------------

    if (!req.client) {
      res.status(401).json({
        success: false,
        message:
          'Customer authentication required',
      });

      return;
    }

    // -----------------------------------------------------
    // Get ticket ID
    // -----------------------------------------------------

    const ticketId = req.params.ticketId;

    if (
      typeof ticketId !== 'string' ||
      !ticketId.trim()
    ) {
      res.status(400).json({
        success: false,
        message:
          'Valid ticket ID is required',
      });

      return;
    }

    // -----------------------------------------------------
    // Get ticket belonging to logged-in customer
    // -----------------------------------------------------

    const ticket =
      await getClientTicketById(
        ticketId.trim(),
        req.client.id,
      );

    // -----------------------------------------------------
    // Ticket does not exist or belongs to
    // another customer
    // -----------------------------------------------------

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });

      return;
    }

    // -----------------------------------------------------
    // Return ticket
    // -----------------------------------------------------

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}