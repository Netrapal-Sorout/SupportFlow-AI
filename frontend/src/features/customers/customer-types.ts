export type CustomerStatus =
  | 'active'
  | 'inactive';

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: CustomerStatus;
  totalTickets: number;
  openTickets: number;
  lastContact: string;
  createdAt: string;
}