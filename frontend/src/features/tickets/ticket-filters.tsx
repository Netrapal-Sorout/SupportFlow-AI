import {
  ChevronDown,
  Search,
} from 'lucide-react';

import type {
  TicketPriority,
  TicketStatus,
} from './ticket-types';

interface TicketFiltersProps {
  search: string;
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (
    value: TicketStatus | 'all',
  ) => void;
  onPriorityChange: (
    value: TicketPriority | 'all',
  ) => void;
}

export function TicketFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: TicketFiltersProps) {
  return (
    <div className="rounded-2xl border border-[#E4EAF2] bg-white p-4 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search tickets..."
            className="h-11 w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] pl-11 pr-4 text-sm text-[#17233F] outline-none placeholder:text-[#98A2B3] transition focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
          />
        </div>

        {/* Status */}
        <div className="relative">
          <select
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target
                  .value as TicketStatus | 'all',
              )
            }
            className="h-11 w-full min-w-[150px] appearance-none rounded-xl border border-[#E4EAF2] bg-white px-4 pr-10 text-sm font-medium text-[#475467] outline-none transition focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
        </div>

        {/* Priority */}
        <div className="relative">
          <select
            value={priority}
            onChange={(event) =>
              onPriorityChange(
                event.target
                  .value as TicketPriority | 'all',
              )
            }
            className="h-11 w-full min-w-[150px] appearance-none rounded-xl border border-[#E4EAF2] bg-white px-4 pr-10 text-sm font-medium text-[#475467] outline-none transition focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
        </div>
      </div>
    </div>
  );
}