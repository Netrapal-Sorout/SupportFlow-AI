import {
  AlertCircle,
  ChevronRight,
  Clock3,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import type {
  Ticket,
  TicketPriority,
  TicketStatus,
} from './ticket-types';

interface TicketListProps {
  tickets: Ticket[];
}

function getStatusClasses(
  status: TicketStatus,
) {
  switch (status) {
    case 'open':
      return 'bg-[#EAF4FF] text-[#0878D9]';

    case 'pending':
      return 'bg-[#FFF3E5] text-[#FF8A00]';

    case 'resolved':
      return 'bg-[#E7F9F8] text-[#0BB3B0]';

    case 'closed':
      return 'bg-[#F0EDFF] text-[#6F5BD3]';

    default:
      return 'bg-[#F1F5F9] text-[#475467]';
  }
}

function getPriorityClasses(
  priority: TicketPriority,
) {
  switch (priority) {
    case 'urgent':
      return 'bg-[#FEF0F0] text-[#EF4444]';

    case 'high':
      return 'bg-[#FFF3E5] text-[#FF8A00]';

    case 'medium':
      return 'bg-[#FFF8E8] text-[#D99200]';

    case 'low':
      return 'bg-[#F1F5F9] text-[#667085]';

    default:
      return 'bg-[#F1F5F9] text-[#667085]';
  }
}

function formatStatus(status: TicketStatus) {
  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  );
}

function formatPriority(
  priority: TicketPriority,
) {
  return (
    priority.charAt(0).toUpperCase() +
    priority.slice(1)
  );
}

export function TicketList({
  tickets,
}: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E4EAF2] bg-white px-6 py-16 text-center shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
          <MessageSquare className="h-5 w-5" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-[#17233F]">
          No tickets found
        </h3>

        <p className="mt-1 text-sm text-[#667085]">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-[1050px] w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E4EAF2] bg-[#F8FAFC]">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Ticket
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Status
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Priority
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                AI Confidence
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Updated
              </th>

              <th className="w-12 px-4 py-4" />
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => {
              const ticketId =
                ticket.id.replace('#', '');

              return (
                <tr
                  key={ticket.id}
                  className="group border-b border-[#E4EAF2] last:border-b-0 transition hover:bg-[#F8FAFC]"
                >
                  {/* Ticket */}
                  <td className="px-5 py-4">
                    <Link
                      to={`/tickets/${ticketId}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9] transition group-hover:bg-[#D7EBFF]">
                        <MessageSquare className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#17233F] transition group-hover:text-[#0878D9]">
                          {ticket.subject}
                        </p>

                        <p className="mt-0.5 text-xs text-[#667085]">
                          {ticket.id}
                        </p>
                      </div>
                    </Link>
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-[#17233F]">
                        {ticket.customerName}
                      </p>

                      <p className="mt-0.5 text-xs text-[#667085]">
                        {ticket.customerEmail}
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        ticket.status,
                      )}`}
                    >
                      {formatStatus(ticket.status)}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClasses(
                        ticket.priority,
                      )}`}
                    >
                      {ticket.priority ===
                        'urgent' && (
                        <AlertCircle className="h-3.5 w-3.5" />
                      )}

                      {formatPriority(
                        ticket.priority,
                      )}
                    </span>
                  </td>

                  {/* AI Confidence */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#E4EAF2]">
                        <div
                          className="h-full rounded-full bg-[#0878D9]"
                          style={{
                            width: `${ticket.aiConfidence}%`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-medium text-[#475467]">
                        {ticket.aiConfidence}%
                      </span>
                    </div>
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-xs text-[#667085]">
                      <Clock3 className="h-3.5 w-3.5" />

                      {ticket.updatedAt}
                    </div>
                  </td>

                  {/* View */}
                  <td className="px-4 py-4 text-right">
                    <Link
                      to={`/tickets/${ticketId}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#EAF4FF] hover:text-[#0878D9]"
                      aria-label={`View ${ticket.subject}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}