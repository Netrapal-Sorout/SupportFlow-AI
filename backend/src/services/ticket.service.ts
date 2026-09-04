import {
  createTicket,
  findAllTickets,
  findTicketById,
} from '../repositories/ticket.repository.js';

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