import {
  BookOpen,
  CheckCircle2,
  FileText,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

import type { AISuggestion } from './ai-assistant-types';

interface AISuggestionCardProps {
  suggestion: AISuggestion;
}

const iconMap = {
  reply: MessageSquare,
  summary: FileText,
  classification: Sparkles,
  knowledge: BookOpen,
};

export function AISuggestionCard({
  suggestion,
}: AISuggestionCardProps) {
  const Icon = iconMap[suggestion.type];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Icon size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              {suggestion.title}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              AI suggestion
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
          <CheckCircle2 size={14} />
          {Math.round(suggestion.confidence * 100)}%
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {suggestion.content}
      </p>
    </div>
  );
}