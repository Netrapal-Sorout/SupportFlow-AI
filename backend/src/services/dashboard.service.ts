import { getDashboardData } from '../repositories/dashboard.repository.js';

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export async function getDashboard(days = 7) {
  const safeDays = Math.min(Math.max(Math.floor(days), 1), 31);
  const end = addDays(startOfDay(new Date()), 1);
  const start = addDays(end, -safeDays);

  const data = await getDashboardData(start, end);

  const activity = Array.from({ length: safeDays }, (_, index) => {
    const day = addDays(start, index);
    const nextDay = addDays(day, 1);

    const messages = data.activityMessages.filter(
      (message) =>
        message.createdAt >= day && message.createdAt < nextDay,
    );

    const customerMessages = messages.filter(
      (message) => message.senderType === 'CUSTOMER',
    ).length;

    const agentMessages = messages.filter(
      (message) => message.senderType === 'AGENT',
    ).length;

    return {
      date: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      customerMessages,
      agentMessages,
      total: messages.length,
    };
  });

  return {
    period: {
      start: start.toISOString(),
      end: end.toISOString(),
      days: safeDays,
    },
    summary: {
      openTickets: data.openTickets,
      pendingTickets: data.pendingTickets,
      resolvedTickets: data.resolvedTickets,
      closedTickets: data.closedTickets,
      highPriorityTickets: data.highPriorityTickets,
      newTickets: data.newTickets,
      aiResolutionRate: null,
    },
    activity,
    recentTickets: data.recentTickets.map((ticket) => ({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      subject: ticket.subject,
      status: ticket.status,
      priority: ticket.priority,
      customer: {
        id: ticket.customer.id,
        name: ticket.customer.name,
        email: ticket.customer.email,
      },
      assignedUser: ticket.assignedUser
        ? {
            id: ticket.assignedUser.id,
            name: ticket.assignedUser.name,
          }
        : null,
      updatedAt: ticket.updatedAt.toISOString(),
    })),
  };
}
