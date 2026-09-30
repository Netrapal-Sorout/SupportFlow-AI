import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Filter,
  Loader2,
  MessageSquare,
  Plus,
  Search,
  Ticket,
} from 'lucide-react';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  getClientTickets,
  type ClientTicket,
  type ClientTicketStatus,
} from './client-ticket.api';

function getStatusClass(
  status: ClientTicketStatus,
) {
  switch (status) {
    case 'OPEN':
      return 'border-[#CFE3FF] bg-[#F1F7FF] text-[#0878D9]';

    case 'PENDING':
      return 'border-[#F5DFA6] bg-[#FFF9E8] text-[#A66A00]';

    case 'RESOLVED':
      return 'border-[#BFE8D7] bg-[#EEFBF5] text-[#0D8A5B]';

    case 'CLOSED':
      return 'border-[#E4E7EC] bg-[#F8FAFC] text-[#667085]';

    default:
      return 'border-[#E4E7EC] bg-[#F8FAFC] text-[#667085]';
  }
}

function getStatusLabel(
  status: ClientTicketStatus,
) {
  switch (status) {
    case 'OPEN':
      return 'Open';

    case 'PENDING':
      return 'Pending';

    case 'RESOLVED':
      return 'Resolved';

    case 'CLOSED':
      return 'Closed';

    default:
      return status;
  }
}

function formatDate(
  value: string,
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  ).format(date);
}

export function ClientTicketsPage() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState<
    ClientTicket[]
  >([]);

  const [search, setSearch] =
    useState('');

  const [status, setStatus] =
    useState<'ALL' | ClientTicketStatus>(
      'ALL',
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  async function loadTickets() {
    try {
      setIsLoading(true);
      setError('');

      const data =
        await getClientTickets();

      setTickets(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load your tickets.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.subject
          .toLowerCase()
          .includes(query) ||
        ticket.id
          .toLowerCase()
          .includes(query) ||
        ticket.category
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === 'ALL' ||
        ticket.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    tickets,
    search,
    status,
  ]);

  return (
    <div className="mx-auto mt-[30px] w-full max-w-[1200px] space-y-5">
      {/* Header */}
      <section className="rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_4px_20px_rgba(23,35,63,0.04)]">
        <div className="flex items-center justify-between gap-5 px-7 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
              <Ticket className="h-5 w-5" />
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0878D9]">
                Support
              </div>

              <h1 className="mt-1 text-[26px] font-bold tracking-[-0.02em] text-[#17233F]">
                My Tickets
              </h1>

              <p className="mt-1 text-[13px] text-[#667085]">
                View and manage all of your support
                requests.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                '/portal/tickets/new',
              )
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-5 text-[13px] font-semibold text-white shadow-[0_5px_15px_rgba(8,120,217,0.18)] transition hover:bg-[#066BC2]"
          >
            <Plus className="h-4 w-4" />
            Create a Ticket
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-[#E4EAF2] bg-white p-3 shadow-[0_4px_20px_rgba(23,35,63,0.04)]">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search your tickets..."
              className="h-11 w-full rounded-xl border border-[#DCE5EF] bg-white pl-10 pr-4 text-[13px] text-[#17233F] outline-none placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
            />
          </div>

          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | 'ALL'
                    | ClientTicketStatus,
                )
              }
              className="h-11 min-w-[140px] appearance-none rounded-xl border border-[#DCE5EF] bg-white pl-10 pr-9 text-[13px] text-[#475467] outline-none focus:border-[#0878D9]"
            >
              <option value="ALL">
                All tickets
              </option>

              <option value="OPEN">
                Open
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="RESOLVED">
                Resolved
              </option>

              <option value="CLOSED">
                Closed
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section className="overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_4px_20px_rgba(23,35,63,0.04)]">
        <div className="border-b border-[#E8EDF3] px-5 py-4">
          <h2 className="text-[14px] font-semibold text-[#17233F]">
            Support Requests
          </h2>

          <p className="mt-1 text-[11px] text-[#98A2B3]">
            {filteredTickets.length}{' '}
            {filteredTickets.length === 1
              ? 'ticket'
              : 'tickets'}
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-2 text-[13px] text-[#667085]">
              <Loader2 className="h-4 w-4 animate-spin text-[#0878D9]" />
              Loading your tickets...
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <AlertCircle className="mb-3 h-8 w-8 text-[#D92D20]" />

            <p className="text-[14px] font-semibold text-[#17233F]">
              Unable to load tickets
            </p>

            <p className="mt-1 max-w-md text-[12px] text-[#667085]">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                void loadTickets()
              }
              className="mt-4 rounded-xl bg-[#0878D9] px-5 py-2.5 text-[12px] font-semibold text-white"
            >
              Try again
            </button>
          </div>
        ) : filteredTickets.length ===
          0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#667085]">
              <MessageSquare className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-[14px] font-semibold text-[#17233F]">
              {tickets.length === 0
                ? 'No tickets yet'
                : 'No matching tickets'}
            </h3>

            <p className="mt-1 max-w-sm text-[12px] text-[#98A2B3]">
              {tickets.length === 0
                ? 'Create your first support ticket to get help.'
                : 'Try changing your search or status filter.'}
            </p>

            {tickets.length === 0 && (
              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/portal/tickets/new',
                  )
                }
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[#0878D9] px-5 text-[12px] font-semibold text-white hover:bg-[#066BC2]"
              >
                <Plus className="h-4 w-4" />
                Create a Ticket
              </button>
            )}
          </div>
        ) : (
          <div>
            {filteredTickets.map(
              (ticket) => (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() =>
                    navigate(
                      `/portal/tickets/${ticket.id}`,
                    )
                  }
                  className="group flex w-full items-center gap-4 border-b border-[#E8EDF3] px-5 py-5 text-left transition last:border-b-0 hover:bg-[#FAFCFE]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] text-[#667085]">
                    <MessageSquare className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-medium text-[#98A2B3]">
                        #{ticket.id.slice(0, 8)}
                      </span>

                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusClass(
                          ticket.status,
                        )}`}
                      >
                        {getStatusLabel(
                          ticket.status,
                        )}
                      </span>
                    </div>

                    <h3 className="mt-1 truncate text-[13px] font-semibold text-[#17233F]">
                      {ticket.subject}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#98A2B3]">
                      <span>
                        {ticket.category}
                      </span>

                      <span>•</span>

                      <span>
                        Updated{' '}
                        {formatDate(
                          ticket.updatedAt,
                        )}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-[#B8C2CF] transition group-hover:translate-x-0.5 group-hover:text-[#0878D9]" />
                </button>
              ),
            )}
          </div>
        )}
      </section>
    </div>
  );
}