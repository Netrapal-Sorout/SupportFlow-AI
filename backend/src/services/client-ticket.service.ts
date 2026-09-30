import { prisma } from '../config/database.js';

// =========================================================
// TYPES
// =========================================================

interface CreateClientTicketData {
  customerId: string;
  subject: string;
  description?: string | undefined;
  message?: string | undefined;
  priority?: string | undefined;
  category?: string | undefined;
}

// =========================================================
// HELPERS
// =========================================================

function generateTicketNumber(): string {
  const timestamp = Date.now().toString().slice(-6);

  const random = Math.floor(
    1000 + Math.random() * 9000,
  );

  return `SF-${timestamp}${random}`;
}

function normalizePriority(
  priority?: string,
): 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' {
  switch (priority?.toUpperCase()) {
    case 'LOW':
      return 'LOW';

    case 'HIGH':
      return 'HIGH';

    case 'URGENT':
      return 'URGENT';

    case 'MEDIUM':
    default:
      return 'MEDIUM';
  }
}

function normalizeCategory(
  category?: string,
): 'BILLING' | 'TECHNICAL' | 'ACCOUNT' | 'SHIPPING' | 'GENERAL' {
  switch (category?.toUpperCase()) {
    case 'BILLING':
      return 'BILLING';

    case 'TECHNICAL':
      return 'TECHNICAL';

    case 'ACCOUNT':
      return 'ACCOUNT';

    case 'SHIPPING':
      return 'SHIPPING';

    case 'GENERAL':
    default:
      return 'GENERAL';
  }
}

// =========================================================
// CREATE CLIENT TICKET
// =========================================================

export async function createClientTicket(
  data: CreateClientTicketData,
) {
  const ticketNumber = generateTicketNumber();

  const priority = normalizePriority(
    data.priority,
  );

  const category = normalizeCategory(
    data.category,
  );

  const messageContent =
    data.description?.trim() ||
    data.message?.trim() ||
    '';

  const ticket = await prisma.$transaction(
    async (tx) => {
      const createdTicket =
        await tx.ticket.create({
          data: {
            ticketNumber,
            subject: data.subject.trim(),
            status: 'OPEN',
            priority,
            category,
            lastMessage:
              messageContent || null,
            customerId: data.customerId,
          },
        });

      if (messageContent) {
        await tx.ticketMessage.create({
          data: {
            content: messageContent,
            senderType: 'CUSTOMER',
            ticketId: createdTicket.id,
          },
        });
      }

      return createdTicket;
    },
  );

  return getClientTicketById(
    ticket.id,
    data.customerId,
  );
}

// =========================================================
// GET CUSTOMER TICKETS
// =========================================================

export async function getClientTickets(
  customerId: string,
  search?: string,
) {
  const trimmedSearch = search?.trim();

  return prisma.ticket.findMany({
    where: {
      customerId,

      ...(trimmedSearch
        ? {
            OR: [
              {
                ticketNumber: {
                  contains: trimmedSearch,
                  mode: 'insensitive',
                },
              },
              {
                subject: {
                  contains: trimmedSearch,
                  mode: 'insensitive',
                },
              },
              {
                lastMessage: {
                  contains: trimmedSearch,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    },

    orderBy: {
      updatedAt: 'desc',
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

// =========================================================
// GET SINGLE CUSTOMER TICKET
// =========================================================

export async function getClientTicketById(
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