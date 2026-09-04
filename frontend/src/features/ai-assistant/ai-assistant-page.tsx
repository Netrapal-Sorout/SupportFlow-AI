import {
  ArrowUp,
  Bot,
  CheckCircle2,
  ChevronRight,
  FileText,
  Lightbulb,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  Sparkles,
  User,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const metrics = [
  {
    label: 'AI Accuracy',
    value: '94.8%',
    icon: Bot,
    iconClass: 'bg-[#F0EDFF] text-[#6F5BD3]',
  },
  {
    label: 'AI Suggestions',
    value: '1,284',
    icon: MessageSquare,
    iconClass: 'bg-[#EAF4FF] text-[#0878D9]',
  },
  {
    label: 'Avg. Confidence',
    value: '92.4%',
    icon: Sparkles,
    iconClass: 'bg-[#E7F9F8] text-[#0BB3B0]',
  },
  {
    label: 'Agent Acceptance',
    value: '87.6%',
    icon: CheckCircle2,
    iconClass: 'bg-[#EEF9EA] text-[#45B83C]',
  },
];

const suggestions = [
  {
    title: 'Suggested Reply',
    confidence: '96%',
    icon: MessageSquare,
    iconClass: 'bg-[#EAF4FF] text-[#0878D9]',
    content:
      "I'm sorry you experienced an issue with your payment. I've checked the transaction and recommend allowing up to 24 hours for the pending authorization to resolve.",
  },
  {
    title: 'Relevant Knowledge',
    confidence: '93%',
    icon: FileText,
    iconClass: 'bg-[#F0EDFF] text-[#6F5BD3]',
    content:
      'Payment troubleshooting guide — explains failed payments, pending authorizations, and common checkout issues.',
  },
];

export function AIAssistantPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#17233F]">
              AI Assistant
            </h1>

            <p className="mt-1 text-sm text-[#667085]">
              Your intelligent support copilot for analyzing
              tickets and assisting agents.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E4EAF2] bg-white px-4 text-sm font-semibold text-[#475467] shadow-sm transition hover:bg-[#F8FAFC]"
        >
          <Plus className="h-4 w-4" />
          New AI Session
        </button>
      </div>

      {/* AI Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#667085]">
                    {metric.label}
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[#17233F]">
                    {metric.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.iconClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main AI Workspace */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
        {/* Chat */}
        <section className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-[#E4EAF2] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
                <Bot className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-[#17233F]">
                  SupportFlow AI
                </h2>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#45B83C]" />

                  <span className="text-xs text-[#667085]">
                    AI Copilot online
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-[#667085] transition hover:bg-[#F8FAFC] hover:text-[#17233F]"
              aria-label="Search conversation"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Conversation */}
          <div className="flex-1 space-y-6 overflow-y-auto bg-[#FBFCFE] p-5">
            {/* AI Message */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
                <Bot className="h-4 w-4" />
              </div>

              <div className="max-w-[85%]">
                <div className="rounded-2xl rounded-tl-md border border-[#E4EAF2] bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm leading-6 text-[#475467]">
                    Hello! I'm your SupportFlow AI
                    Copilot. I can analyze tickets, search
                    your knowledge base, summarize
                    conversations, and draft customer
                    responses.
                  </p>
                </div>

                <p className="mt-1.5 text-[11px] text-[#98A2B3]">
                  10:30 AM
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-[75%]">
                <div className="rounded-2xl rounded-tr-md bg-[#0878D9] px-4 py-3 text-white shadow-sm">
                  <p className="text-sm leading-6">
                    Analyze ticket TK-1048 and suggest a
                    response.
                  </p>
                </div>

                <p className="mt-1.5 text-right text-[11px] text-[#98A2B3]">
                  10:31 AM
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
                <User className="h-4 w-4" />
              </div>
            </div>

            {/* AI Analysis */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
                <Bot className="h-4 w-4" />
              </div>

              <div className="max-w-[88%]">
                <div className="rounded-2xl rounded-tl-md border border-[#E4EAF2] bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm leading-6 text-[#475467]">
                    Ticket TK-1048 appears to be a billing
                    issue involving a failed payment during
                    checkout. The customer may have been
                    charged even though the payment failed.
                    I recommend checking the payment status
                    and explaining the expected resolution
                    timeline.
                  </p>
                </div>

                <p className="mt-1.5 text-[11px] text-[#98A2B3]">
                  10:31 AM
                </p>
              </div>
            </div>

            {/* AI Processing */}
            <div className="rounded-xl border border-[#E4EAF2] bg-white p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#6F5BD3]" />

                <p className="text-xs font-semibold text-[#17233F]">
                  AI analysis completed
                </p>

                <span className="ml-auto rounded-full bg-[#E7F9F8] px-2.5 py-1 text-[11px] font-semibold text-[#0BB3B0]">
                  96% confidence
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[#F8FAFC] p-3">
                  <p className="text-[11px] text-[#98A2B3]">
                    Intent
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#17233F]">
                    Payment Issue
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8FAFC] p-3">
                  <p className="text-[11px] text-[#98A2B3]">
                    Category
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#17233F]">
                    Billing
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8FAFC] p-3">
                  <p className="text-[11px] text-[#98A2B3]">
                    Sentiment
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#EF4444]">
                    Frustrated
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-[#E4EAF2] bg-white p-4">
            <div className="flex items-end gap-3 rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] p-2 focus-within:border-[#0878D9] focus-within:ring-4 focus-within:ring-[#0878D9]/10">
              <button
                type="button"
                className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#667085] transition hover:bg-white hover:text-[#0878D9]"
                aria-label="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                rows={2}
                placeholder="Ask AI to analyze a ticket, search knowledge, or draft a response..."
                className="min-h-[48px] flex-1 resize-none bg-transparent px-1 py-2 text-sm text-[#17233F] outline-none placeholder:text-[#98A2B3]"
              />

              <button
                type="button"
                className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0878D9] text-white transition hover:bg-[#066BC2]"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-[#98A2B3]">
              AI suggestions should be reviewed before
              sending to customers.
            </p>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="space-y-6">
          {/* AI Analysis */}
          <section className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#6F5BD3]" />

              <h2 className="text-sm font-semibold text-[#17233F]">
                AI Analysis
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <AnalysisRow
                label="Intent"
                value="Payment Issue"
              />

              <AnalysisRow
                label="Category"
                value="Billing"
              />

              <AnalysisRow
                label="Priority"
                value="Urgent"
                valueClass="text-[#EF4444]"
              />

              <AnalysisRow
                label="Sentiment"
                value="Frustrated"
                valueClass="text-[#FF8A00]"
              />

              <AnalysisRow
                label="Language"
                value="English"
              />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#667085]">
                    Confidence
                  </span>

                  <span className="text-xs font-semibold text-[#0BB3B0]">
                    96%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E4EAF2]">
                  <div
                    className="h-full rounded-full bg-[#0BB3B0]"
                    style={{ width: '96%' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Suggestions */}
          <section className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-[#FF8A00]" />

                <h2 className="text-sm font-semibold text-[#17233F]">
                  AI Suggestions
                </h2>
              </div>

              <span className="text-xs text-[#667085]">
                2 suggestions
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {suggestions.map((suggestion) => {
                const Icon = suggestion.icon;

                return (
                  <div
                    key={suggestion.title}
                    className="rounded-xl border border-[#E4EAF2] p-4 transition hover:border-[#D4DDE8] hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${suggestion.iconClass}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs font-semibold text-[#17233F]">
                            {suggestion.title}
                          </h3>

                          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0BB3B0]">
                            <CheckCircle2 className="h-3 w-3" />
                            {suggestion.confidence}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] text-[#98A2B3]">
                          AI suggestion
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-[#475467]">
                      {suggestion.content}
                    </p>

                    <button
                      type="button"
                      className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0878D9] transition hover:text-[#066BC2]"
                    >
                      Review suggestion
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

interface AnalysisRowProps {
  label: string;
  value: string;
  valueClass?: string;
}

function AnalysisRow({
  label,
  value,
  valueClass = 'text-[#17233F]',
}: AnalysisRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-[#667085]">
        {label}
      </span>

      <span
        className={`text-xs font-semibold ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}