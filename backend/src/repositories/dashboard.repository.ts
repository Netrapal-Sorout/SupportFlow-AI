import { prisma } from '../config/database.js';

export async function getDashboardData(start: Date, end: Date) {
  const [
    openTickets,
    pendingTickets,
    resolvedTickets,
    closedTickets,
    highPriorityTickets,
    newTickets,
    recentTickets,
    activityMessages,
  ] = await Promise.all([
    prisma.ticket.count({ where: { status: 'OPEN' } }),
    prisma.ticket.count({ where: { status: 'PENDING' } }),
    prisma.ticket.count({ where: { status: 'RESOLVED' } }),
    prisma.ticket.count({ where: { status: 'CLOSED' } }),
    prisma.ticket.count({
      where: {
        priority: { in: ['HIGH', 'URGENT'] },
        status: { not: 'CLOSED' },
      },
    }),
    prisma.ticket.count({
      where: {
        createdAt: { gte: start, lt: end },
      },
    }),
    prisma.ticket.findMany({
      take: 6,
      orderBy: { updatedAt: 'desc' },
      include: {
        customer: true,
        assignedUser: true,
      },
    }),
    prisma.ticketMessage.findMany({
      where: {
        createdAt: { gte: start, lt: end },
      },
      select: {
        createdAt: true,
        senderType: true,
      },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  return {
    openTickets,
    pendingTickets,
    resolvedTickets,
    closedTickets,
    highPriorityTickets,
    newTickets,
    recentTickets,
    activityMessages,
  };
}
