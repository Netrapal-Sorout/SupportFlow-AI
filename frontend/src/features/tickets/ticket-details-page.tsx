import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  Send,
  User,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ticketData = {
  'TK-1048': {
    id: 'TK-1048',
    subject: 'Payment failed during checkout',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    status: 'open',
    priority: 'urgent',
    category: 'billing',
    confidence: 96,
    createdAt: 'Today, 10:24 AM',
    lastUpdated: '2 minutes ago',
    customerMessage:
      'My payment keeps failing when I try to complete the order. I have tried two different cards, but both payments were declined. Can you please help me?',
    aiIntent: 'Payment Failure',
    aiSentiment: 'Frustrated',
    aiLanguage: 'English',
    aiReason:
      'The customer is experiencing repeated payment failures during checkout.',
    suggestedResponse:
      'Hi Sarah,\n\nI’m sorry you’re having trouble completing your payment. I can help you troubleshoot this.\n\nPlease check that your card details and billing address are correct. If the issue continues, you can also try another payment method or contact your bank to confirm that the transaction is not being blocked.\n\nIf you’re still unable to complete the order, let us know and we’ll be happy to investigate further.',
  },
};

export function TicketDetailsPage() {
  const { ticketId } = useParams();

  const ticket =
    ticketData[ticketId as keyof typeof ticketData];

  if (!ticket) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-xl font-semibold text-white">
          Ticket not found
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          The ticket you are looking for does not exist.
        </p>

        <Link
          to="/tickets"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        to="/tickets"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tickets
      </Link>

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-blue-400">
              #{ticket.id}
            </span>

            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium capitalize text-emerald-400">
              {ticket.status}
            </span>

            <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium capitalize text-red-400">
              {ticket.priority}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold text-white">
            {ticket.subject}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Created {ticket.createdAt} · Updated{' '}
            {ticket.lastUpdated}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <CheckCircle2 className="h-4 w-4" />
            Resolve
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            <Send className="h-4 w-4" />
            Send Reply
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Conversation */}
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
              <MessageSquare className="h-5 w-5 text-blue-400" />

              <h2 className="font-medium text-white">
                Conversation
              </h2>
            </div>

            <div className="space-y-6 p-5">
              {/* Customer Message */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800">
                  <User className="h-5 w-5 text-slate-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-white">
                      {ticket.customerName}
                    </p>

                    <span className="text-xs text-slate-600">
                      Customer
                    </span>

                    <span className="text-xs text-slate-600">
                      ·
                    </span>

                    <span className="text-xs text-slate-500">
                      10:24 AM
                    </span>
                  </div>

                  <div className="mt-3 rounded-xl rounded-tl-none border border-slate-800 bg-slate-900 p-4">
                    <p className="text-sm leading-6 text-slate-300">
                      {ticket.customerMessage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply Area */}
              <div className="border-t border-slate-800 pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />

                  <span className="text-sm font-medium text-slate-300">
                    Reply to customer
                  </span>
                </div>

                <textarea
                  rows={6}
                  placeholder="Write your response..."
                  className="w-full resize-none rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
                  >
                    <Send className="h-4 w-4" />
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* AI Suggested Response */}
          <section className="rounded-xl border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center justify-between border-b border-blue-500/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />

                <h2 className="font-medium text-white">
                  AI Suggested Response
                </h2>
              </div>

              <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                {ticket.confidence}% confidence
              </span>
            </div>

            <div className="p-5">
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <p className="whitespace-pre-line text-sm leading-6 text-slate-300">
                  {ticket.suggestedResponse}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                  Use Response
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  Regenerate
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Customer */}
          <section className="rounded-xl border border-slate-800 bg-slate-950">
            <div className="border-b border-slate-800 px-5 py-4">
              <h2 className="font-medium text-white">
                Customer
              </h2>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                  SJ
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {ticket.customerName}
                  </p>

                  <p className="text-xs text-slate-500">
                    {ticket.customerEmail}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Previous tickets
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    8 tickets
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Customer since
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    March 2025
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ticket Information */}
          <section className="rounded-xl border border-slate-800 bg-slate-950">
            <div className="border-b border-slate-800 px-5 py-4">
              <h2 className="font-medium text-white">
                Ticket Information
              </h2>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span className="text-sm capitalize text-slate-300">
                  {ticket.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Priority
                </span>

                <span className="text-sm capitalize text-red-400">
                  {ticket.priority}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Category
                </span>

                <span className="text-sm capitalize text-slate-300">
                  {ticket.category}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  AI Confidence
                </span>

                <span className="text-sm font-medium text-emerald-400">
                  {ticket.confidence}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Last updated
                </span>

                <span className="text-sm text-slate-300">
                  {ticket.lastUpdated}
                </span>
              </div>
            </div>
          </section>

          {/* AI Analysis */}
          <section className="rounded-xl border border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
              <Bot className="h-5 w-5 text-blue-400" />

              <h2 className="font-medium text-white">
                AI Analysis
              </h2>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs text-slate-500">
                  Intent
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {ticket.aiIntent}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Sentiment
                </p>

                <p className="mt-1 text-sm text-orange-400">
                  {ticket.aiSentiment}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Language
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {ticket.aiLanguage}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Reasoning
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-400">
                  {ticket.aiReason}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}