import type { Ticket } from './ticket-types';

const initialTickets: Ticket[] = [
  {
    id: '#TK-1048',
    subject: 'Payment failed during checkout',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    status: 'open',
    priority: 'urgent',
    category: 'billing',
    lastMessage:
      'My payment keeps failing when I try to complete checkout.',
    updatedAt: '2 min ago',
    aiConfidence: 96,
  },
  {
    id: '#TK-1047',
    subject: 'Unable to reset my password',
    customerName: 'Michael Chen',
    customerEmail: 'michael@example.com',
    status: 'pending',
    priority: 'high',
    category: 'account',
    lastMessage:
      'I requested a password reset but did not receive the email.',
    updatedAt: '14 min ago',
    aiConfidence: 91,
  },
  {
    id: '#TK-1046',
    subject: 'Order delivery is delayed',
    customerName: 'Emily Davis',
    customerEmail: 'emily@example.com',
    status: 'open',
    priority: 'medium',
    category: 'shipping',
    lastMessage:
      'My order was supposed to arrive yesterday but is still delayed.',
    updatedAt: '28 min ago',
    aiConfidence: 88,
  },
  {
    id: '#TK-1045',
    subject: 'How do I update my billing address?',
    customerName: 'David Wilson',
    customerEmail: 'david@example.com',
    status: 'resolved',
    priority: 'low',
    category: 'billing',
    lastMessage:
      'I would like to update the billing address on my account.',
    updatedAt: '1 hour ago',
    aiConfidence: 94,
  },
  {
    id: '#TK-1044',
    subject: 'Dashboard is not loading',
    customerName: 'Jessica Brown',
    customerEmail: 'jessica@example.com',
    status: 'open',
    priority: 'high',
    category: 'technical',
    lastMessage:
      'The dashboard stays blank when I try to open it.',
    updatedAt: '2 hours ago',
    aiConfidence: 93,
  },
];

let tickets = [...initialTickets];

export function getTickets(): Ticket[] {
  return tickets;
}

export function getTicketById(
  ticketId: string,
): Ticket | undefined {
  return tickets.find(
    (ticket) =>
      ticket.id.replace('#', '') === ticketId,
  );
}

export function addTicket(ticket: Ticket): void {
  tickets = [ticket, ...tickets];
}