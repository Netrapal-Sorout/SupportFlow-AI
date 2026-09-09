import { prisma } from '../config/database.js';
import type { CreateTicketInput } from '../schemas/ticket.schema.js';

export async function findAllTickets() {
  return prisma.ticket.findMany({
    include: {
      customer: true,
      assignedUser: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findTicketById(id: string) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      assignedUser: true,
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
}

export async function createTicket(data: CreateTicketInput) {
  return prisma.$transaction(async (tx) => {
    const customer = await tx.customer.upsert({
      where: {
        email: data.customer.email,
      },

      update: {
        name: data.customer.name,
        company: data.customer.company ?? null,
      },

      create: {
        name: data.customer.name,
        email: data.customer.email,
        company: data.customer.company ?? null,
      },
    });

    const ticketNumber = `SF-${Date.now()}`;

    const ticket = await tx.ticket.create({
      data: {
        ticketNumber,
        subject: data.subject,
        priority: data.priority ?? 'MEDIUM',
        category: data.category ?? 'GENERAL',
        customerId: customer.id,

        messages: {
          create: {
            content: data.message,
            senderType: 'CUSTOMER',
          },
        },
      },

      include: {
        customer: true,
        messages: true,
      },
    });

    return ticket;
  });
}

export async function assignTicket(
  ticketId: string,
  assignedUserId: string,
) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },

    data: {
      assignedUserId,
    },

    include: {
      customer: true,
      assignedUser: true,
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
}