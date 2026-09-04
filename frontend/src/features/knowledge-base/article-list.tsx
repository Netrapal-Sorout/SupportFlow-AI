import {
  BookOpen,
  ChevronRight,
  Eye,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import type {
  ArticleCategory,
  ArticleStatus,
  KnowledgeBaseArticle,
} from './knowledge-base-types';

interface ArticleListProps {
  articles: KnowledgeBaseArticle[];
}

function getCategoryClasses(
  category: ArticleCategory,
) {
  switch (category) {
    case 'account':
      return 'bg-[#EAF4FF] text-[#0878D9]';

    case 'billing':
      return 'bg-[#F0EDFF] text-[#6F5BD3]';

    case 'shipping':
      return 'bg-[#FFF3E5] text-[#FF8A00]';

    case 'technical':
      return 'bg-[#FEF0F0] text-[#EF4444]';

    case 'general':
      return 'bg-[#E7F9F8] text-[#0BB3B0]';

    default:
      return 'bg-[#F1F5F9] text-[#667085]';
  }
}

function getStatusClasses(
  status: ArticleStatus,
) {
  switch (status) {
    case 'published':
      return 'bg-[#E7F9F8] text-[#0BB3B0]';

    case 'draft':
      return 'bg-[#FFF3E5] text-[#FF8A00]';

    default:
      return 'bg-[#F1F5F9] text-[#667085]';
  }
}

function formatLabel(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export function ArticleList({
  articles,
}: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E4EAF2] bg-white px-6 py-16 text-center shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
          <BookOpen className="h-5 w-5" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-[#17233F]">
          No articles found
        </h3>

        <p className="mt-1 text-sm text-[#667085]">
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E4EAF2] bg-[#F8FAFC]">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Article
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Category
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Status
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Views
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Updated
              </th>

              <th className="w-12 px-4 py-4" />
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="group border-b border-[#E4EAF2] last:border-b-0 transition hover:bg-[#F8FAFC]"
              >
                {/* Article */}
                <td className="px-5 py-4">
                  <Link
                    to={`/knowledge-base/${article.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9] transition group-hover:bg-[#D7EBFF]">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#17233F] transition group-hover:text-[#0878D9]">
                        {article.title}
                      </p>

                      <p className="mt-1 max-w-[520px] truncate text-xs text-[#667085]">
                        {article.summary}
                      </p>
                    </div>
                  </Link>
                </td>

                {/* Category */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getCategoryClasses(
                      article.category,
                    )}`}
                  >
                    {formatLabel(article.category)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      article.status,
                    )}`}
                  >
                    {formatLabel(article.status)}
                  </span>
                </td>

                {/* Views */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-sm text-[#475467]">
                    <Eye className="h-4 w-4 text-[#667085]" />

                    {article.views.toLocaleString()}
                  </div>
                </td>

                {/* Updated */}
                <td className="px-5 py-4">
                  <div>
                    <p className="text-xs font-medium text-[#475467]">
                      {article.updatedAt}
                    </p>

                    <p className="mt-1 text-xs text-[#98A2B3]">
                      by {article.author}
                    </p>
                  </div>
                </td>

                {/* View */}
                <td className="px-4 py-4 text-right">
                  <Link
                    to={`/knowledge-base/${article.id}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#EAF4FF] hover:text-[#0878D9]"
                    aria-label={`View ${article.title}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}