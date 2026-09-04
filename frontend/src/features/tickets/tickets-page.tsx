import {
  Plus,
  Ticket as TicketIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { TicketFilters } from './ticket-filters';
import { TicketList } from './ticket-list';
import { getTickets } from './ticket-store';
import type {
  TicketPriority,
  TicketStatus,
} from './ticket-types';

export function TicketsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] =
    useState<TicketStatus | 'all'>('all');
  const [priority, setPriority] =
    useState<TicketPriority | 'all'>('all');

  const tickets = getTickets();

  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      normalizedSearch === '' ||
      ticket.subject
        .toLowerCase()
        .includes(normalizedSearch) ||
      ticket.customerName
        .toLowerCase()
        .includes(normalizedSearch) ||
      ticket.customerEmail
        .toLowerCase()
        .includes(normalizedSearch) ||
      ticket.id
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesStatus =
      status === 'all' ||
      ticket.status === status;

    const matchesPriority =
      priority === 'all' ||
      ticket.priority === priority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#17233F]">
            Tickets
          </h1>

          <p className="mt-1 text-sm text-[#667085]">
            Manage and resolve customer support requests.
          </p>
        </div>

        <Link
          to="/tickets/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066BC2]"
        >
          <Plus className="h-4 w-4" />
          Create Ticket
        </Link>
      </div>

      {/* Filters */}
      <TicketFilters
        search={search}
        status={status}
        priority={priority}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      {/* Result Count */}
      <div className="flex items-center gap-2">
        <TicketIcon className="h-4 w-4 text-[#0878D9]" />

        <p className="text-sm text-[#667085]">
          Showing{' '}
          <span className="font-semibold text-[#17233F]">
            {filteredTickets.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-[#17233F]">
            {tickets.length}
          </span>{' '}
          tickets
        </p>
      </div>

      {/* Ticket List */}
      <TicketList tickets={filteredTickets} />
    </div>
  );
}