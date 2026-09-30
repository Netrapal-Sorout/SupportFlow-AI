import {
  Bot,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from 'lucide-react';

import {
  useState,
} from 'react';

export function ClientAISupportPage() {
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<
    {
      sender: 'ai' | 'user';
      text: string;
    }[]
  >([
    {
      sender: 'ai',
      text: "Hi! I'm SupportFlow AI. I can help you find answers, understand support issues, and guide you to the right solution.",
    },
  ]);

  function handleSend() {
    const trimmed = message.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        sender: 'user',
        text: trimmed,
      },
    ]);

    setMessage('');

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          sender: 'ai',
          text: 'Thanks for your question. I can help you with that. If the issue requires account-specific support, you can also create a support ticket and our team will take a closer look.',
        },
      ]);
    }, 600);
  }

  return (
    <div className="flex min-h-full w-full min-w-0 flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-7">

      <div className="mx-auto flex min-h-[calc(100vh-56px)] w-full max-w-[1200px] flex-1 flex-col">

        {/* Header */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF]">
              <Sparkles className="h-5 w-5 text-[#0878D9]" />
            </div>

            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0878D9]">
                AI Support
              </p>

              <h1 className="mt-1 text-[26px] font-bold tracking-[-0.025em] text-[#17233F]">
                Ask SupportFlow AI
              </h1>

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#BFE8D7] bg-[#EEFBF5] px-3.5 py-2">

            <span className="h-2 w-2 rounded-full bg-[#18A96B]" />

            <span className="text-[11px] font-semibold text-[#0D8A5B]">
              AI Online
            </span>

          </div>

        </div>

        {/* AI Workspace */}
        <section className="flex min-h-[650px] flex-1 flex-col overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-[#E8EDF3] px-5 py-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF]">
              <Bot className="h-5 w-5 text-[#0878D9]" />
            </div>

            <div>

              <h2 className="text-[14px] font-bold text-[#17233F]">
                SupportFlow AI
              </h2>

              <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                AI-powered customer support assistant
              </p>

            </div>

          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-[#F8FAFC] p-5 sm:p-7">

            {messages.map((item, index) => {
              const isUser =
                item.sender === 'user';

              return (
                <div
                  key={`${item.sender}-${index}`}
                  className={[
                    'flex items-start gap-3',
                    isUser
                      ? 'justify-end'
                      : '',
                  ].join(' ')}
                >

                  {!isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={[
                      'max-w-[75%] rounded-2xl px-4 py-3',
                      isUser
                        ? 'rounded-tr-md bg-[#0878D9] text-white'
                        : 'rounded-tl-md border border-[#E1E7EF] bg-white text-[#475467]',
                    ].join(' ')}
                  >
                    <p className="text-[12px] leading-6">
                      {item.text}
                    </p>
                  </div>

                  {isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
                      <User className="h-4 w-4" />
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* Suggestions */}
          <div className="border-t border-[#E8EDF3] bg-white px-5 py-3">

            <div className="flex gap-2 overflow-x-auto">

              {[
                'How can I check my ticket?',
                'How do I update my account?',
                'I need help with billing',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() =>
                    setMessage(suggestion)
                  }
                  className="shrink-0 rounded-full border border-[#D8E0EA] bg-white px-3.5 py-2 text-[10px] font-medium text-[#667085] hover:border-[#B8D9F8] hover:bg-[#F5FAFF] hover:text-[#0878D9]"
                >
                  {suggestion}
                </button>
              ))}

            </div>

          </div>

          {/* Input */}
          <div className="border-t border-[#E8EDF3] bg-white p-4">

            <div className="flex items-end gap-3 rounded-xl border border-[#D8E0EA] bg-white p-2 focus-within:border-[#0878D9] focus-within:ring-4 focus-within:ring-[#0878D9]/10">

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                placeholder="Ask AI Support a question..."
                className="min-h-[44px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-[12px] leading-5 text-[#17233F] outline-none placeholder:text-[#98A2B3]"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0878D9] text-white transition hover:bg-[#066BC2] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4 text-white" />
              </button>

            </div>

            <p className="mt-2 text-center text-[9px] text-[#98A2B3]">
              AI responses may not always be accurate.
              For account-specific issues, create a ticket.
            </p>

          </div>

        </section>

      </div>

    </div>
  );
}