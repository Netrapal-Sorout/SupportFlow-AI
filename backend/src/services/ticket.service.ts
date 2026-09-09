import {
  assignTicket,
  createTicket,
  findAllTickets,
  findTicketById,
} from '../repositories/ticket.repository.js';

import { findActiveUserById } from '../repositories/auth.repository.js';

import type { CreateTicketInput } from '../schemas/ticket.schema.js';

export async function getTickets() {
  return findAllTickets();
}

export async function getTicketById(id: string) {
  return findTicketById(id);
}

export async function createNewTicket(data: CreateTicketInput) {
  return createTicket(data);
}

export async function assignTicketToUser(
  ticketId: string,
  assignedUserId: string,
) {
  const user = await findActiveUserById(assignedUserId);

  if (!user) {
    throw new Error(
      'Assigned user does not exist or is inactive',
    );
  }

  return assignTicket(ticketId, assignedUserId);
}