import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
  MessageCircle,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';

import {
  getClientTickets,
  type ClientTicket,
} from './client-ticket.api';

// =========================================================
// HELPERS
// =========================================================

type TicketStatus = ClientTicket['status'];

function getStatusClass(
  status: TicketStatus,
): string {
  switch (status) {
    case 'OPEN':
      return 'border-[#CFE4FF] bg-[#F0F7FF] text-[#0878D9]';

    case 'PENDING':
      return 'border-[#F7DE9F] bg-[#FFF9E8] text-[#B87500]';

    case 'RESOLVED':
      return 'border-[#CBEBDD] bg-[#EFFBF6] text-[#119B67]';

    case 'CLOSED':
      return 'border-[#E1E7EF] bg-[#F8FAFC] text-[#667085]';

    default:
      return 'border-[#E1E7EF] bg-[#F8FAFC] text-[#667085]';
  }
}

function formatStatus(
  status: TicketStatus,
): string {
  return (
    status.charAt(0) +
    status.slice(1).toLowerCase()
  );
}

function formatCategory(
  category: ClientTicket['category'],
): string {
  return (
    category.charAt(0) +
    category.slice(1).toLowerCase()
  );
}

function formatRelativeDate(
  value: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Recently';
  }

  const now = new Date();

  const difference =
    now.getTime() - date.getTime();

  const seconds = Math.floor(
    difference / 1000,
  );

  if (seconds < 60) {
    return 'Just now';
  }

  const minutes = Math.floor(
    seconds / 60,
  );

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1 ? 'minute' : 'minutes'
    } ago`;
  }

  const hours = Math.floor(
    minutes / 60,
  );

  if (hours < 24) {
    return `${hours} ${
      hours === 1 ? 'hour' : 'hours'
    } ago`;
  }

  const days = Math.floor(
    hours / 24,
  );

  if (days < 7) {
    return `${days} ${
      days === 1 ? 'day' : 'days'
    } ago`;
  }

  return date.toLocaleDateString(
    undefined,
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  label,
  value,
  description,
  icon,
  iconClass,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#E1E7EF] bg-white p-5 shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

      <div className="flex items-start justify-between">

        <div
          className={[
            'flex h-11 w-11 items-center justify-center rounded-xl',
            iconClass,
          ].join(' ')}
        >
          {icon}
        </div>

        <span className="text-[11px] font-medium text-[#9AA4B2]">
          Current
        </span>

      </div>

      <div className="mt-5">

        <p className="text-[28px] font-bold leading-none tracking-tight text-[#17233F]">
          {value}
        </p>

        <p className="mt-2 text-[13px] font-semibold text-[#475467]">
          {label}
        </p>

        <p className="mt-1 text-[11px] text-[#98A2B3]">
          {description}
        </p>

      </div>

    </div>
  );
}

// =========================================================
// DASHBOARD
// =========================================================

export function ClientDashboardPage() {
  const navigate = useNavigate();

  const [tickets, setTickets] =
    useState<ClientTicket[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const [error, setError] =
    useState('');

  const [helpSearch, setHelpSearch] =
    useState('');

  // =======================================================
  // LOAD TICKETS
  // =======================================================

  const loadTickets = useCallback(
    async (
      showInitialLoader = false,
    ) => {
      try {
        if (showInitialLoader) {
          setIsLoading(true);
        } else {
          setIsRefreshing(true);
        }

        setError('');

        const data =
          await getClientTickets('');

        setTickets(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load dashboard data.',
        );
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [],
  );

  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {
    void loadTickets(true);
  }, [loadTickets]);

  // =======================================================
  // REFRESH WHEN WINDOW GETS FOCUS
  // =======================================================

  useEffect(() => {
    function handleWindowFocus() {
      void loadTickets(false);
    }

    window.addEventListener(
      'focus',
      handleWindowFocus,
    );

    return () => {
      window.removeEventListener(
        'focus',
        handleWindowFocus,
      );
    };
  }, [loadTickets]);

  // =======================================================
  // AUTO REFRESH
  // =======================================================

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        void loadTickets(false);
      }, 15000);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadTickets]);

  // =======================================================
  // DASHBOARD STATISTICS
  // =======================================================

  const statistics = useMemo(() => {
    const openTickets =
      tickets.filter(
        (ticket) =>
          ticket.status === 'OPEN',
      ).length;

    const pendingTickets =
      tickets.filter(
        (ticket) =>
          ticket.status === 'PENDING',
      ).length;

    const resolvedTickets =
      tickets.filter(
        (ticket) =>
          ticket.status === 'RESOLVED' ||
          ticket.status === 'CLOSED',
      ).length;

    return {
      openTickets,
      pendingTickets,
      resolvedTickets,
    };
  }, [tickets]);

  // =======================================================
  // RECENT TICKETS
  // =======================================================

  const recentTickets = useMemo(() => {
    return [...tickets]
      .sort(
        (a, b) =>
          new Date(
            b.updatedAt,
          ).getTime() -
          new Date(
            a.updatedAt,
          ).getTime(),
      )
      .slice(0, 3);
  }, [tickets]);

  // =======================================================
  // HELP CENTER SEARCH
  // =======================================================

  function handleHelpSearch() {
    const query =
      helpSearch.trim();

    if (query) {
      navigate(
        `/portal/help-center?search=${encodeURIComponent(
          query,
        )}`,
      );

      return;
    }

    navigate('/portal/help-center');
  }

  // =======================================================
  // LOADING STATE
  // =======================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center px-6">

        <div className="flex flex-col items-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FF]">
            <Loader2 className="h-5 w-5 animate-spin text-[#0878D9]" />
          </div>

          <p className="mt-4 text-sm font-semibold text-[#17233F]">
            Loading your dashboard...
          </p>

          <p className="mt-1 text-xs text-[#98A2B3]">
            Fetching your latest support activity.
          </p>

        </div>

      </div>
    );
  }

  // =======================================================
  // DASHBOARD UI
  // =======================================================

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">

      <div className="mx-auto w-full max-w-[1600px] space-y-5">

        {/* ==================================================
            WELCOME HERO
        ================================================== */}

        <section className="relative overflow-hidden rounded-2xl border border-[#DFE6EF] bg-white shadow-[0_4px_20px_rgba(23,35,63,0.045)]">

          <div className="absolute left-0 top-0 h-full w-1 bg-[#0878D9]" />

          <div className="relative px-6 py-7 sm:px-8 sm:py-8">

            <div className="max-w-[900px]">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4FF]">
                  <MessageCircle className="h-3.5 w-3.5 text-[#0878D9]" />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0878D9]">
                  Customer Support
                </span>

              </div>

              <h1 className="mt-4 text-[28px] font-bold tracking-[-0.025em] text-[#17233F] sm:text-[32px]">
                How can we help you today?
              </h1>

              <p className="mt-2 max-w-[760px] text-[13px] leading-6 text-[#667085]">
                Find answers, chat with our AI
                assistant, or create a support
                ticket and our team will help you
                resolve your issue.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

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

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      '/portal/ai-support',
                    )
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#D8E0EA] bg-white px-5 text-[13px] font-semibold text-[#475467] transition hover:bg-[#F8FAFC]"
                >
                  <Sparkles className="h-4 w-4 text-[#0878D9]" />
                  Ask AI Support
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* ==================================================
            SEARCH
        ================================================== */}

        <section className="rounded-2xl border border-[#E1E7EF] bg-white p-5 shadow-[0_3px_16px_rgba(23,35,63,0.03)] sm:p-6">

          <div className="flex items-center gap-2">

            <Search className="h-4 w-4 text-[#667085]" />

            <h2 className="text-[13px] font-semibold text-[#17233F]">
              Search the Help Center
            </h2>

          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleHelpSearch();
            }}
            className="mt-3"
          >

            <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#D8E0EA] bg-[#FCFDFE] px-4 transition focus-within:border-[#0878D9] focus-within:ring-4 focus-within:ring-[#0878D9]/10">

              <Search className="h-4 w-4 shrink-0 text-[#98A2B3]" />

              <input
                type="text"
                value={helpSearch}
                onChange={(event) =>
                  setHelpSearch(
                    event.target.value,
                  )
                }
                placeholder="Search for answers, guides, troubleshooting and more..."
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#17233F] outline-none placeholder:text-[#98A2B3]"
              />

              <button
                type="submit"
                className="hidden rounded-md border border-[#E1E7EF] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#667085] transition hover:border-[#0878D9] hover:text-[#0878D9] sm:block"
              >
                Search
              </button>

            </div>

          </form>

        </section>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <section className="rounded-2xl border border-[#F3CACA] bg-[#FFF8F8] px-5 py-4">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-[13px] font-semibold text-[#A33A3A]">
                  Unable to refresh dashboard
                </p>

                <p className="mt-1 text-[11px] text-[#B75B5B]">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  void loadTickets(true)
                }
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#E8C7C7] bg-white px-3 text-[11px] font-semibold text-[#A33A3A] hover:bg-[#FFF3F3]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try again
              </button>

            </div>

          </section>
        )}

        {/* ==================================================
            STATISTICS
        ================================================== */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <StatCard
            label="Open Tickets"
            value={
              statistics.openTickets
            }
            description="Tickets currently being handled"
            icon={
              <MessageSquare className="h-5 w-5 text-[#0878D9]" />
            }
            iconClass="bg-[#EAF4FF]"
          />

          <StatCard
            label="Pending Response"
            value={
              statistics.pendingTickets
            }
            description="Waiting for a support response"
            icon={
              <Clock3 className="h-5 w-5 text-[#C47A00]" />
            }
            iconClass="bg-[#FFF7DF]"
          />

          <StatCard
            label="Resolved Tickets"
            value={
              statistics.resolvedTickets
            }
            description="Successfully resolved requests"
            icon={
              <CheckCircle2 className="h-5 w-5 text-[#119B67]" />
            }
            iconClass="bg-[#EAF9F3]"
          />

        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">

          {/* =================================================
              RECENT TICKETS
          ================================================= */}

          <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

            <div className="flex items-center justify-between gap-4 border-b border-[#E8EDF3] px-6 py-5">

              <div>

                <h2 className="text-[15px] font-bold text-[#17233F]">
                  Recent Tickets
                </h2>

                <p className="mt-1 text-[11px] text-[#98A2B3]">
                  Your latest support conversations
                </p>

              </div>

              <div className="flex items-center gap-3">

                {isRefreshing && (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#98A2B3]" />
                )}

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      '/portal/tickets',
                    )
                  }
                  className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-[#0878D9] hover:text-[#066BC2]"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

              </div>

            </div>

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {recentTickets.length === 0 ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F5F8]">
                  <MessageSquare className="h-5 w-5 text-[#98A2B3]" />
                </div>

                <h3 className="mt-4 text-[14px] font-semibold text-[#17233F]">
                  No tickets yet
                </h3>

                <p className="mt-1 max-w-[360px] text-[11px] leading-5 text-[#98A2B3]">
                  You haven't created any support
                  tickets yet. Create your first
                  ticket and our team will help you.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      '/portal/tickets/new',
                    )
                  }
                  className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg bg-[#0878D9] px-4 text-[11px] font-semibold text-white hover:bg-[#066BC2]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create a Ticket
                </button>

              </div>
            ) : (
              <div className="divide-y divide-[#EEF2F6]">

                {recentTickets.map(
                  (ticket) => (
                    <button
                      key={ticket.id}
                      type="button"
                      onClick={() =>
                        navigate(
                          `/portal/tickets/${ticket.id}`,
                        )
                      }
                      className="group flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-[#FBFCFE]"
                    >

                      {/* Ticket icon */}

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E5EBF2] bg-[#F8FAFC]">

                        <MessageSquare className="h-[17px] w-[17px] text-[#667085]" />

                      </div>

                      {/* Ticket details */}

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="text-[10px] font-semibold text-[#98A2B3]">
                            #{ticket.ticketNumber}
                          </span>

                          <span
                            className={[
                              'rounded-full border px-2.5 py-1 text-[10px] font-semibold',
                              getStatusClass(
                                ticket.status,
                              ),
                            ].join(' ')}
                          >
                            {formatStatus(
                              ticket.status,
                            )}
                          </span>

                        </div>

                        <p className="mt-1.5 truncate text-[13px] font-semibold text-[#17233F] group-hover:text-[#0878D9]">
                          {ticket.subject}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-[10px] text-[#98A2B3]">

                          <span>
                            {formatCategory(
                              ticket.category,
                            )}
                          </span>

                          <span>•</span>

                          <span>
                            Updated{' '}
                            {formatRelativeDate(
                              ticket.updatedAt,
                            )}
                          </span>

                        </div>

                      </div>

                      <ArrowRight className="h-4 w-4 shrink-0 text-[#B7C0CC] transition group-hover:text-[#0878D9]" />

                    </button>
                  ),
                )}

              </div>
            )}

          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-1">

            {/* =================================================
                AI SUPPORT
            ================================================= */}

            <section className="rounded-2xl border border-[#E1E7EF] bg-white p-6 shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF]">

                  <Sparkles className="h-5 w-5 text-[#0878D9]" />

                </div>

                <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#119B67]">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#18A96B]" />

                  Online

                </span>

              </div>

              <h2 className="mt-5 text-[15px] font-bold text-[#17233F]">
                Ask AI Support
              </h2>

              <p className="mt-2 text-[12px] leading-5 text-[#667085]">
                Get instant answers from our AI
                assistant using the SupportFlow
                knowledge base.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/portal/ai-support',
                  )
                }
                className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#0878D9] text-[12px] font-semibold text-white transition hover:bg-[#066BC2]"
              >
                Start conversation
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </section>

            {/* =================================================
                HELP CENTER
            ================================================= */}

            <section className="rounded-2xl border border-[#E1E7EF] bg-white p-6 shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F5F8]">

                <MessageCircle className="h-5 w-5 text-[#667085]" />

              </div>

              <h2 className="mt-5 text-[15px] font-bold text-[#17233F]">
                Browse Help Center
              </h2>

              <p className="mt-2 text-[12px] leading-5 text-[#667085]">
                Find setup guides, troubleshooting
                articles and answers to common
                questions.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    '/portal/help-center',
                  )
                }
                className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#D8E0EA] bg-white text-[12px] font-semibold text-[#475467] transition hover:bg-[#F8FAFC]"
              >
                Browse articles
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </section>

          </div>

        </div>

        {/* ==================================================
            BOTTOM SUPPORT STRIP
        ================================================== */}

        <section className="rounded-2xl border border-[#DCE8F5] bg-[#F5FAFF] px-6 py-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">

                <MessageCircle className="h-5 w-5 text-[#0878D9]" />

              </div>

              <div>

                <h3 className="text-[13px] font-bold text-[#17233F]">
                  Still need help?
                </h3>

                <p className="mt-1 text-[11px] text-[#667085]">
                  Our support team is ready to help
                  with anything you cannot resolve
                  yourself.
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
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#CFE0F2] bg-white px-4 text-[12px] font-semibold text-[#0878D9] shadow-sm transition hover:bg-[#F8FBFF]"
            >
              Contact Support
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

          </div>

        </section>

      </div>

    </div>
  );
}