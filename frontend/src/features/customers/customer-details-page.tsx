import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  Ticket,
  User,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import type { Customer } from './customer-types';

const customers: Customer[] = [
  {
    id: 'CUS-1001',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    company: 'Acme Corporation',
    status: 'active',
    totalTickets: 8,
    openTickets: 1,
    lastContact: '2 minutes ago',
    createdAt: 'March 12, 2025',
  },
  {
    id: 'CUS-1002',
    name: 'Michael Chen',
    email: 'michael@example.com',
    company: 'Northstar Labs',
    status: 'active',
    totalTickets: 5,
    openTickets: 1,
    lastContact: '14 minutes ago',
    createdAt: 'April 8, 2025',
  },
  {
    id: 'CUS-1003',
    name: 'Emily Davis',
    email: 'emily@example.com',
    company: 'Vertex Commerce',
    status: 'active',
    totalTickets: 12,
    openTickets: 2,
    lastContact: '28 minutes ago',
    createdAt: 'January 20, 2025',
  },
  {
    id: 'CUS-1004',
    name: 'David Wilson',
    email: 'david@example.com',
    company: 'Brightside Media',
    status: 'active',
    totalTickets: 3,
    openTickets: 0,
    lastContact: '1 hour ago',
    createdAt: 'June 3, 2025',
  },
  {
    id: 'CUS-1005',
    name: 'Jessica Brown',
    email: 'jessica@example.com',
    company: 'CloudPeak Systems',
    status: 'inactive',
    totalTickets: 7,
    openTickets: 0,
    lastContact: '2 days ago',
    createdAt: 'February 14, 2025',
  },
  {
    id: 'CUS-1006',
    name: 'Daniel Martinez',
    email: 'daniel@example.com',
    company: 'Summit Retail',
    status: 'active',
    totalTickets: 9,
    openTickets: 1,
    lastContact: '3 hours ago',
    createdAt: 'May 17, 2025',
  },
];

const customerTickets = [
  {
    id: 'TK-1048',
    subject: 'Payment failed during checkout',
    status: 'open',
    priority: 'urgent',
    updatedAt: '2 minutes ago',
  },
  {
    id: 'TK-1032',
    subject: 'Refund has not appeared',
    status: 'resolved',
    priority: 'medium',
    updatedAt: '5 days ago',
  },
  {
    id: 'TK-1017',
    subject: 'Unable to apply discount code',
    status: 'resolved',
    priority: 'low',
    updatedAt: '2 weeks ago',
  },
];

function getStatusClasses(
  status: 'open' | 'resolved',
) {
  if (status === 'open') {
    return 'bg-blue-500/10 text-blue-400';
  }

  return 'bg-emerald-500/10 text-emerald-400';
}

function getPriorityClasses(
  priority: 'urgent' | 'high' | 'medium' | 'low',
) {
  switch (priority) {
    case 'urgent':
      return 'text-red-400';

    case 'high':
      return 'text-orange-400';

    case 'medium':
      return 'text-yellow-400';

    case 'low':
      return 'text-slate-400';
  }
}

export function CustomerDetailsPage() {
  const { customerId } = useParams();

  const customer = customers.find(
    (item) => item.id === customerId,
  );

  if (!customer) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
          <User className="h-5 w-5 text-slate-500" />
        </div>

        <h1 className="mt-4 text-xl font-semibold text-white">
          Customer not found
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          The customer you are looking for does not exist.
        </p>

        <Link
          to="/customers"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </Link>
      </div>
    );
  }

  const initials = customer.name
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const resolvedTickets =
    customer.totalTickets - customer.openTickets;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        to="/customers"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Customers
      </Link>

      {/* Customer Header */}
      <section className="rounded-xl border border-slate-800 bg-slate-950">
        <div className="p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-lg font-semibold text-blue-400">
                {initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-white">
                    {customer.name}
                  </h1>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                      customer.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {customer.company}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
              >
                Edit Customer
              </button>

              <Link
                to="/tickets/new"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
              >
                <Ticket className="h-4 w-4" />
                Create Ticket
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Total Tickets
            </p>

            <Ticket className="h-5 w-5 text-blue-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-white">
            {customer.totalTickets}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Open Tickets
            </p>

            <MessageSquare className="h-5 w-5 text-orange-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-white">
            {customer.openTickets}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Resolved Tickets
            </p>

            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-white">
            {resolvedTickets}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Last Contact
            </p>

            <Clock3 className="h-5 w-5 text-purple-400" />
          </div>

          <p className="mt-3 text-sm font-medium text-white">
            {customer.lastContact}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Ticket History */}
        <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div>
              <h2 className="font-medium text-white">
                Ticket History
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Recent support requests from this customer.
              </p>
            </div>

            <Link
              to="/tickets"
              className="text-xs font-medium text-blue-400 hover:text-blue-300"
            >
              View all tickets
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {customerTickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/tickets/${ticket.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-900"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <MessageSquare className="h-4 w-4 text-blue-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {ticket.subject}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-slate-600">
                        #{ticket.id}
                      </span>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${getStatusClasses(
                          ticket.status as
                            | 'open'
                            | 'resolved',
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden text-right sm:block">
                  <p
                    className={`text-xs font-medium capitalize ${getPriorityClasses(
                      ticket.priority as
                        | 'urgent'
                        | 'high'
                        | 'medium'
                        | 'low',
                    )}`}
                  >
                    {ticket.priority}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {ticket.updatedAt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Customer Information */}
        <section className="rounded-xl border border-slate-800 bg-slate-950">
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 className="font-medium text-white">
              Customer Information
            </h2>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <p className="text-xs text-slate-500">
                Customer ID
              </p>

              <p className="mt-1 text-sm font-medium text-slate-300">
                {customer.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Email
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {customer.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Company
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {customer.company}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Customer Since
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                <CalendarDays className="h-4 w-4 text-slate-500" />
                {customer.createdAt}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Last Contact
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
                <Clock3 className="h-4 w-4 text-slate-500" />
                {customer.lastContact}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}