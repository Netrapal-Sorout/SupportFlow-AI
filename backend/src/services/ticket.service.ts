import { addTicketMessage, assignTicket, createTicket, findAllTickets, findTicketById, updateTicket } from '../repositories/ticket.repository.js';
import { findActiveUserById } from '../repositories/auth.repository.js';
import {
  findTicketByIdForCustomer,
} from '../repositories/ticket.repository.js';
import type { CreateTicketInput, TicketUpdateInput } from '../schemas/ticket.schema.js';

export const getTickets = (filters?: { search?: string; status?: string; priority?: string }) => findAllTickets(filters);
export const getTicketById = (id: string) => findTicketById(id);
export const createNewTicket = (data: CreateTicketInput) => createTicket(data);
export const updateExistingTicket = (id: string, data: TicketUpdateInput) => updateTicket(id, data);
export const addMessageToTicket = (ticketId: string, content: string, userId: string) => addTicketMessage(ticketId, content, userId);
export async function assignTicketToUser(ticketId: string, assignedUserId: string) {
  const user = await findActiveUserById(assignedUserId);
  if (!user) throw new Error('Assigned user does not exist or is inactive');
  return assignTicket(ticketId, assignedUserId);
}

export async function getCustomerTicket(
  ticketId: string,
  customerId: string,
) {
  return findTicketByIdForCustomer(
    ticketId,
    customerId,
  );
}