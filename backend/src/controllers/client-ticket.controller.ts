import type { Request, Response } from 'express';

import {
  createClientTicket,
  getClientTicketById,
  getClientTickets,
} from '../services/client-ticket.service.js';

import {
  createClientTicketSchema,
} from '../schemas/client-ticket.schema.js';

export async function createClientTicketController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const customerId = req.client?.id;

    if (!customerId) {
      res.status(401).json({
        success: false,
        message: 'Customer authentication required.',
      });
      return;
    }

    const parsed = createClientTicketSchema.safeParse({
      subject: req.body.subject,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
    });

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid ticket data.',
        errors: parsed.error.flatten(),
      });
      return;
    }

    const files = (req.files ?? []) as Express.Multer.File[];

    const ticket = await createClientTicket({
      customerId,
      subject: parsed.data.subject.trim(),
      description: parsed.data.description?.trim(),
      category: parsed.data.category,
      priority: parsed.data.priority,

      /*
       * The current ticket service does not persist
       * attachment metadata yet.
       *
       * Multer has already validated/received the files.
       * S3 storage can be added later for production.
       */
      ...(files.length > 0
        ? {
            message: files
              .map(
                (file) =>
                  `Attachment: ${file.originalname}`,
              )
              .join('\n'),
          }
        : {}),
    });

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully.',
      data: ticket,
    });
  } catch (error) {
    console.error(
      'Create client ticket error:',
      error,
    );

    res.status(500).json({
      success: false,
      message: 'Unable to create ticket.',
    });
  }
}

export async function getClientTicketsController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const customerId = req.client?.id;

    if (!customerId) {
      res.status(401).json({
        success: false,
        message: 'Customer authentication required.',
      });
      return;
    }

    const search =
      typeof req.query.search === 'string'
        ? req.query.search.trim()
        : '';

    const tickets = await getClientTickets(
      customerId,
      search,
    );

    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error(
      'Get client tickets error:',
      error,
    );

    res.status(500).json({
      success: false,
      message: 'Unable to load tickets.',
    });
  }
}

export async function getClientTicketByIdController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const customerId = req.client?.id;

    if (!customerId) {
      res.status(401).json({
        success: false,
        message: 'Customer authentication required.',
      });
      return;
    }

    /*
     * Express can type route parameters as
     * string | string[], so check the type before
     * calling .trim().
     */
    const ticketIdParam = req.params.ticketId;

    const ticketId =
      typeof ticketIdParam === 'string'
        ? ticketIdParam.trim()
        : '';

    if (!ticketId) {
      res.status(400).json({
        success: false,
        message: 'Ticket ID is required.',
      });
      return;
    }

    const ticket = await getClientTicketById(
      ticketId,
      customerId,
    );

    if (!ticket) {
      res.status(404).json({
        success: false,
        message: 'Ticket not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error(
      'Get client ticket by ID error:',
      error,
    );

    res.status(500).json({
      success: false,
      message: 'Unable to load ticket.',
    });
  }
}