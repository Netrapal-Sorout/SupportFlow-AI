export type ArticleStatus =
  | 'published'
  | 'draft';

export type ArticleCategory =
  | 'billing'
  | 'account'
  | 'shipping'
  | 'technical'
  | 'general';

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  status: ArticleStatus;
  summary: string;
  content: string;
  author: string;
  views: number;
  helpfulCount: number;
  updatedAt: string;
  createdAt: string;
}