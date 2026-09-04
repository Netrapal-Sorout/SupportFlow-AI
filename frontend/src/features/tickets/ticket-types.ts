export type TicketStatus =
  | 'open'
  | 'pending'
  | 'resolved'
  | 'closed';

export type TicketPriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export type TicketCategory =
  | 'billing'
  | 'technical'
  | 'account'
  | 'shipping'
  | 'general';

export interface Ticket {
  id: string;
  subject: string;
  customerName: string;
  customerEmail: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  lastMessage: string;
  updatedAt: string;
  aiConfidence: number;
}