import {
  Bot,
  Send,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

import type { AIMessage } from './ai-assistant-types';
import { AIMessageItem } from './ai-message';

const initialMessages: AIMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content:
      'Hello! I’m your SupportFlow AI copilot. I can analyze tickets, search your knowledge base, summarize conversations, and draft customer responses.',
    createdAt: '10:30 AM',
  },
  {
    id: 'msg-2',
    role: 'user',
    content:
      'Analyze ticket TK-1048 and suggest a response.',
    createdAt: '10:31 AM',
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content:
      'Ticket TK-1048 appears to be a billing issue involving a failed payment during checkout. The customer may have been charged even though the payment failed. I recommend checking the payment status and explaining the expected resolution timeline.',
    createdAt: '10:31 AM',
  },
];

export function AIChat() {
  const [messages, setMessages] =
    useState<AIMessage[]>(initialMessages);

  const [input, setInput] = useState('');

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    const newMessage: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      createdAt: 'Just now',
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      newMessage,
    ]);

    setInput('');
  };

  return (
    <section className="flex min-h-[620px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <Bot size={20} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">
            SupportFlow AI
          </h2>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs text-slate-500">
              AI Copilot
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {messages.map((message) => (
          <AIMessageItem
            key={message.id}
            message={message}
          />
        ))}

        {messages.length === 0 && (
          <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <Sparkles size={24} />
            </div>

            <h3 className="text-base font-semibold text-white">
              How can I help?
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              Ask the AI assistant to analyze a ticket,
              summarize a conversation, or draft a
              response.
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-3"
        >
          <textarea
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Ask AI about a ticket, customer, or knowledge base..."
            rows={2}
            className="min-h-[52px] flex-1 resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}