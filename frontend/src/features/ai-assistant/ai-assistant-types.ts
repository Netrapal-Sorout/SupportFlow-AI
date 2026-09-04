export type AIMessageRole =
  | 'user'
  | 'assistant'
  | 'system';

export interface AIMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  createdAt: string;
}

export type AISuggestionType =
  | 'reply'
  | 'summary'
  | 'classification'
  | 'knowledge';

export interface AISuggestion {
  id: string;
  type: AISuggestionType;
  title: string;
  content: string;
  confidence: number;
}

export interface AIAnalysis {
  intent: string;
  category: string;
  priority: string;
  sentiment: string;
  language: string;
  confidence: number;
}