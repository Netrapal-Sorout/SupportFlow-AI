import {
  BookOpen,
  ChevronDown,
  Plus,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { ArticleList } from './article-list';
import type {
  ArticleCategory,
  KnowledgeBaseArticle,
} from './knowledge-base-types';

const articles: KnowledgeBaseArticle[] = [
  {
    id: 'ART-1001',
    title: 'How to reset your password',
    slug: 'how-to-reset-your-password',
    category: 'account',
    status: 'published',
    summary:
      'Step-by-step instructions for resetting your account password.',
    content:
      'Follow these steps to reset your password and regain access to your account.',
    author: 'Support Team',
    views: 1248,
    helpfulCount: 312,
    updatedAt: '2 hours ago',
    createdAt: 'March 15, 2025',
  },
  {
    id: 'ART-1002',
    title: 'Payment troubleshooting guide',
    slug: 'payment-troubleshooting-guide',
    category: 'billing',
    status: 'published',
    summary:
      'Common payment problems and troubleshooting steps.',
    content:
      'Review common payment problems and the recommended troubleshooting steps.',
    author: 'Support Team',
    views: 987,
    helpfulCount: 245,
    updatedAt: '5 hours ago',
    createdAt: 'April 2, 2025',
  },
  {
    id: 'ART-1003',
    title:
      'Understanding shipping and delivery times',
    slug: 'shipping-and-delivery-times',
    category: 'shipping',
    status: 'published',
    summary:
      'Learn about delivery estimates, tracking, and delayed orders.',
    content:
      'Understand delivery estimates, shipment tracking, and delayed order handling.',
    author: 'Emily Davis',
    views: 756,
    helpfulCount: 189,
    updatedAt: 'Yesterday',
    createdAt: 'May 10, 2025',
  },
  {
    id: 'ART-1004',
    title:
      'Troubleshooting dashboard loading issues',
    slug: 'dashboard-loading-issues',
    category: 'technical',
    status: 'published',
    summary:
      'Solutions for common dashboard loading and performance problems.',
    content:
      'Follow these troubleshooting steps when the dashboard fails to load correctly.',
    author: 'Engineering Team',
    views: 634,
    helpfulCount: 154,
    updatedAt: '2 days ago',
    createdAt: 'June 8, 2025',
  },
  {
    id: 'ART-1005',
    title:
      'Refund policy and processing times',
    slug: 'refund-policy-processing-times',
    category: 'billing',
    status: 'draft',
    summary:
      'Refund eligibility and expected processing times.',
    content:
      'Information about refund eligibility and expected processing times.',
    author: 'Support Team',
    views: 0,
    helpfulCount: 0,
    updatedAt: '3 days ago',
    createdAt: 'June 12, 2025',
  },
];

export function KnowledgeBasePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] =
    useState<ArticleCategory | 'all'>('all');

  const filteredArticles = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        normalizedSearch === '' ||
        article.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        article.summary
          .toLowerCase()
          .includes(normalizedSearch) ||
        article.slug
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        category === 'all' ||
        article.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
            <BookOpen className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#17233F]">
              Knowledge Base
            </h1>

            <p className="mt-1 text-sm text-[#667085]">
              Manage the information your support team
              and AI use to resolve tickets.
            </p>
          </div>
        </div>

        <Link
          to="/knowledge-base/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066BC2]"
        >
          <Plus className="h-4 w-4" />
          Create Article
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-[#E4EAF2] bg-white p-4 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search articles..."
              className="h-11 w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] pl-11 pr-4 text-sm text-[#17233F] outline-none placeholder:text-[#98A2B3] transition focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target
                    .value as ArticleCategory | 'all',
                )
              }
              className="h-11 w-full min-w-[170px] appearance-none rounded-xl border border-[#E4EAF2] bg-white px-4 pr-10 text-sm font-medium text-[#475467] outline-none transition focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
            >
              <option value="all">
                All Categories
              </option>

              <option value="billing">Billing</option>
              <option value="account">Account</option>
              <option value="shipping">Shipping</option>
              <option value="technical">
                Technical
              </option>
              <option value="general">General</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
          </div>
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-[#0878D9]" />

        <p className="text-sm text-[#667085]">
          Showing{' '}
          <span className="font-semibold text-[#17233F]">
            {filteredArticles.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-[#17233F]">
            {articles.length}
          </span>{' '}
          articles
        </p>
      </div>

      {/* Articles */}
      <ArticleList articles={filteredArticles} />
    </div>
  );
}