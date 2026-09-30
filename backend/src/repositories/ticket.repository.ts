import { prisma } from '../config/database.js';
import type { CreateTicketInput, TicketUpdateInput } from '../schemas/ticket.schema.js';

const ticketInclude = {
  customer: true,
  assignedUser: { select: { id: true, name: true, email: true, role: true } },
  messages: { orderBy: { createdAt: 'asc' as const }, include: { user: { select: { id: true, name: true } } } },
};

export function findAllTickets(filters?: { search?: string; status?: string; priority?: string }) {
  const where: any = {};
  if (filters?.status && filters.status !== 'ALL') where.status = filters.status;
  if (filters?.priority && filters.priority !== 'ALL') where.priority = filters.priority;
  if (filters?.search) where.OR = [
    { ticketNumber: { contains: filters.search, mode: 'insensitive' } },
    { subject: { contains: filters.search, mode: 'insensitive' } },
    { customer: { name: { contains: filters.search, mode: 'insensitive' } } },
    { customer: { email: { contains: filters.search, mode: 'insensitive' } } },
  ];
  return prisma.ticket.findMany({ where, include: ticketInclude, orderBy: { updatedAt: 'desc' } });
}

export function findTicketById(id: string) {
  return prisma.ticket.findUnique({ where: { id }, include: ticketInclude });
}

export function createTicket(data: CreateTicketInput) {
  return prisma.$transaction(async (tx) => {
    const customer = await tx.customer.upsert({ where: { email: data.customer.email }, update: { name: data.customer.name, company: data.customer.company ?? null }, create: { name: data.customer.name, email: data.customer.email, company: data.customer.company ?? null } });
    const ticketNumber = `SF-${Date.now().toString().slice(-8)}`;
    return tx.ticket.create({ data: { ticketNumber, subject: data.subject, priority: data.priority ?? 'MEDIUM', category: data.category ?? 'GENERAL', customerId: customer.id, lastMessage: data.message, messages: { create: { content: data.message, senderType: 'CUSTOMER' } } }, include: ticketInclude });
  });
}

export function updateTicket(id: string, data: TicketUpdateInput) {
  return prisma.ticket.update({ where: { id }, data: { ...(data.status ? { status: data.status } : {}), ...(data.priority ? { priority: data.priority } : {}), ...(data.category ? { category: data.category } : {}) }, include: ticketInclude });
}

export function assignTicket(ticketId: string, assignedUserId: string) {
  return prisma.ticket.update({ where: { id: ticketId }, data: { assignedUserId }, include: ticketInclude });
}

export function addTicketMessage(ticketId: string, content: string, userId: string, senderType: 'AGENT' | 'AI' = 'AGENT') {
  return prisma.$transaction(async (tx) => {
    const message = await tx.ticketMessage.create({ data: { ticketId, content, userId, senderType } });
    await tx.ticket.update({ where: { id: ticketId }, data: { lastMessage: content, ...(senderType === 'AGENT' ? { status: 'PENDING' } : {}) } });
    return message;
  });
}

export async function findTicketByIdForCustomer(
  ticketId: string,
  customerId: string,
) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      customerId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
}