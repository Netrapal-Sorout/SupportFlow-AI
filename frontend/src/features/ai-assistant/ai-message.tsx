import { Bot, User } from 'lucide-react';

import type { AIMessage } from './ai-assistant-types';

interface AIMessageProps {
  message: AIMessage;
}

export function AIMessageItem({
  message,
}: AIMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser
            ? 'bg-indigo-600 text-white'
            : 'border border-slate-700 bg-slate-800 text-slate-200'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message.content}
        </p>

        <p
          className={`mt-2 text-xs ${
            isUser
              ? 'text-indigo-200'
              : 'text-slate-500'
          }`}
        >
          {message.createdAt}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-slate-300">
          <User size={18} />
        </div>
      )}
    </div>
  );
}