import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  getClientTicketById,
  type ClientTicket,
} from './client-ticket.api';

function formatLabel(
  value: string,
) {
  return (
    value.charAt(0) +
    value.slice(1).toLowerCase()
  );
}

function formatDate(
  value: string,
) {
  return new Date(value).toLocaleString(
    undefined,
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    },
  );
}

function getStatusClass(
  status: ClientTicket['status'],
) {
  switch (status) {
    case 'OPEN':
      return 'border-[#CFE3FF] bg-[#F1F7FF] text-[#0878D9]';

    case 'PENDING':
      return 'border-[#F5DFA6] bg-[#FFF9E8] text-[#A66A00]';

    case 'RESOLVED':
      return 'border-[#BFE8D7] bg-[#EEFBF5] text-[#0D8A5B]';

    case 'CLOSED':
      return 'border-[#E1E7EF] bg-[#F8FAFC] text-[#667085]';

    default:
      return 'border-[#E1E7EF] bg-[#F8FAFC] text-[#667085]';
  }
}

function getPriorityClass(
  priority: ClientTicket['priority'],
) {
  switch (priority) {
    case 'URGENT':
      return 'border-[#F4C7C7] bg-[#FFF2F2] text-[#C73535]';

    case 'HIGH':
      return 'border-[#F5D6B3] bg-[#FFF7ED] text-[#C65D0A]';

    case 'MEDIUM':
      return 'border-[#F5DFA6] bg-[#FFF9E8] text-[#A66A00]';

    case 'LOW':
      return 'border-[#E1E7EF] bg-[#F8FAFC] text-[#667085]';

    default:
      return 'border-[#E1E7EF] bg-[#F8FAFC] text-[#667085]';
  }
}

function getSenderLabel(
  senderType: string,
) {
  switch (senderType) {
    case 'CUSTOMER':
      return 'You';

    case 'AGENT':
      return 'Support Agent';

    case 'AI':
      return 'AI Assistant';

    case 'SYSTEM':
      return 'System';

    default:
      return senderType;
  }
}

export function ClientTicketDetailsPage() {
  const { ticketId } =
    useParams<{
      ticketId: string;
    }>();

  const [ticket, setTicket] =
    useState<ClientTicket | null>(
      null,
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTicket() {
      if (!ticketId) {
        if (isMounted) {
          setError(
            'Ticket ID is missing.',
          );
          setIsLoading(false);
        }

        return;
      }

      try {
        setIsLoading(true);
        setError('');

        const data =
          await getClientTicketById(
            ticketId,
          );

        if (isMounted) {
          setTicket(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load ticket.',
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTicket();

    return () => {
      isMounted = false;
    };
  }, [ticketId]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-[#0878D9]" />

          <p className="text-sm font-medium text-[#667085]">
            Loading ticket...
          </p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-[#E1E7EF] bg-white p-8 text-center shadow-[0_4px_20px_rgba(23,35,63,0.04)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8FAFC]">
            <MessageSquare className="h-5 w-5 text-[#98A2B3]" />
          </div>

          <h1 className="mt-4 text-lg font-bold text-[#17233F]">
            Ticket not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#667085]">
            {error ||
              'The ticket could not be found.'}
          </p>

          <Link
            to="/portal/tickets"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#0878D9] px-4 text-sm font-semibold text-white transition hover:bg-[#066BC2]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-[1600px] space-y-5">

        {/* Back */}
        <Link
          to="/portal/tickets"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#667085] transition hover:text-[#0878D9]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </Link>

        {/* Header */}
        <section className="rounded-2xl border border-[#E1E7EF] bg-white p-6 shadow-[0_3px_16px_rgba(23,35,63,0.035)] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">

                <span className="text-[11px] font-semibold text-[#98A2B3]">
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
                  {formatLabel(
                    ticket.status,
                  )}
                </span>

                <span
                  className={[
                    'rounded-full border px-2.5 py-1 text-[10px] font-semibold',
                    getPriorityClass(
                      ticket.priority,
                    ),
                  ].join(' ')}
                >
                  {formatLabel(
                    ticket.priority,
                  )}
                </span>

              </div>

              <h1 className="mt-3 text-[26px] font-bold tracking-[-0.025em] text-[#17233F]">
                {ticket.subject}
              </h1>

              <p className="mt-2 text-[13px] text-[#667085]">
                {formatLabel(
                  ticket.category,
                )}{' '}
                support request
              </p>
            </div>

          </div>
        </section>

        {/* Ticket information */}
        <section className="rounded-2xl border border-[#E1E7EF] bg-white p-6 shadow-[0_3px_16px_rgba(23,35,63,0.035)]">
          <h2 className="text-[14px] font-bold text-[#17233F]">
            Ticket Information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-[#E8EDF3] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 text-[#98A2B3]">
                <CalendarDays className="h-4 w-4" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                  Created
                </span>
              </div>

              <p className="mt-2 text-[12px] font-semibold text-[#17233F]">
                {formatDate(
                  ticket.createdAt,
                )}
              </p>
            </div>

            <div className="rounded-xl border border-[#E8EDF3] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 text-[#98A2B3]">
                <Clock3 className="h-4 w-4" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                  Updated
                </span>
              </div>

              <p className="mt-2 text-[12px] font-semibold text-[#17233F]">
                {formatDate(
                  ticket.updatedAt,
                )}
              </p>
            </div>

            <div className="rounded-xl border border-[#E8EDF3] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 text-[#98A2B3]">
                <CheckCircle2 className="h-4 w-4" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                  Status
                </span>
              </div>

              <p className="mt-2 text-[12px] font-semibold text-[#17233F]">
                {formatLabel(
                  ticket.status,
                )}
              </p>
            </div>

            <div className="rounded-xl border border-[#E8EDF3] bg-[#FAFBFC] p-4">
              <div className="flex items-center gap-2 text-[#98A2B3]">
                <User className="h-4 w-4" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                  Ticket
                </span>
              </div>

              <p className="mt-2 text-[12px] font-semibold text-[#17233F]">
                #{ticket.ticketNumber}
              </p>
            </div>

          </div>
        </section>

        {/* Description */}
        <section className="rounded-2xl border border-[#E1E7EF] bg-white p-6 shadow-[0_3px_16px_rgba(23,35,63,0.035)]">
          <h2 className="text-[14px] font-bold text-[#17233F]">
            Your Request
          </h2>

          <div className="mt-4 rounded-xl border border-[#E8EDF3] bg-[#FAFBFC] p-5">
            <p className="whitespace-pre-wrap text-[13px] leading-6 text-[#475467]">
              {ticket.description}
            </p>
          </div>
        </section>

        {/* Conversation */}
        <section className="overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

          <div className="border-b border-[#EEF2F6] px-6 py-5">
            <h2 className="text-[14px] font-bold text-[#17233F]">
              Conversation
            </h2>

            <p className="mt-1 text-[12px] text-[#98A2B3]">
              Messages related to this support request.
            </p>
          </div>

          <div className="divide-y divide-[#EEF2F6]">

            {ticket.messages &&
            ticket.messages.length > 0 ? (
              ticket.messages.map(
                (message) => (
                  <div
                    key={message.id}
                    className="px-6 py-5"
                  >
                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF]">
                        <User className="h-4 w-4 text-[#0878D9]" />
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[12px] font-semibold text-[#17233F]">
                            {getSenderLabel(
                              message.senderType,
                            )}
                          </p>

                          <span className="text-[10px] text-[#98A2B3]">
                            {formatDate(
                              message.createdAt,
                            )}
                          </span>
                        </div>

                        <p className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-[#475467]">
                          {message.message}
                        </p>

                      </div>
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className="px-6 py-10 text-center">
                <MessageSquare className="mx-auto h-5 w-5 text-[#B7C0CC]" />

                <p className="mt-3 text-[12px] font-medium text-[#667085]">
                  No conversation messages yet.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* Contact support */}
        <section className="rounded-2xl border border-[#E1E7EF] bg-white p-6 shadow-[0_3px_16px_rgba(23,35,63,0.035)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-[14px] font-bold text-[#17233F]">
                Need more help?
              </h2>

              <p className="mt-1 text-[12px] text-[#667085]">
                Our support team can continue the conversation.
              </p>
            </div>

            <a
              href="mailto:support@example.com"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#DCE5EF] bg-white px-4 text-[12px] font-semibold text-[#475467] transition hover:border-[#0878D9] hover:text-[#0878D9]"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </a>

          </div>
        </section>

      </div>
    </div>
  );
}