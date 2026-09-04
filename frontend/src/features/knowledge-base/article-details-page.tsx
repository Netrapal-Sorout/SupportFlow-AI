import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Eye,
  ThumbsUp,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const articles = {
  'ART-1001': {
    id: 'ART-1001',
    title: 'How to reset your password',
    category: 'Account',
    status: 'Published',
    author: 'Support Team',
    updatedAt: '2 hours ago',
    createdAt: 'March 15, 2025',
    views: 1248,
    helpfulCount: 312,
    content: [
      {
        heading: 'Reset your password',
        paragraphs: [
          'If you have forgotten your password, you can reset it from the login page.',
          'Select the "Forgot password?" option and enter the email address associated with your account.',
        ],
      },
      {
        heading: 'Check your email',
        paragraphs: [
          'You will receive an email containing a secure password reset link.',
          'If you do not see the email within a few minutes, check your spam or junk folder.',
        ],
      },
      {
        heading: 'Create a new password',
        paragraphs: [
          'Open the reset link and create a new password that meets the security requirements.',
          'After successfully changing your password, return to the login page and sign in again.',
        ],
      },
    ],
  },
};

export function ArticleDetailsPage() {
  const { articleId } = useParams();

  const article =
    articles[articleId as keyof typeof articles];

  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-xl font-semibold text-white">
          Article not found
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          The article you are looking for does not exist.
        </p>

        <Link
          to="/knowledge-base"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Knowledge Base
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        to="/knowledge-base"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge Base
      </Link>

      {/* Header */}
      <section className="rounded-xl border border-slate-800 bg-slate-950">
        <div className="flex flex-col justify-between gap-5 p-6 lg:flex-row lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                {article.category}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {article.status}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-semibold text-white">
              {article.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Article ID: {article.id}
            </p>
          </div>

          <Link
            to={`/knowledge-base/${article.id}/edit`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
          >
            <Edit3 className="h-4 w-4" />
            Edit Article
          </Link>
        </div>

        {/* Metadata */}
        <div className="grid border-t border-slate-800 sm:grid-cols-4">
          <div className="border-b border-slate-800 px-6 py-4 sm:border-b-0 sm:border-r">
            <p className="text-xs text-slate-500">
              Author
            </p>

            <p className="mt-1 text-sm text-slate-300">
              {article.author}
            </p>
          </div>

          <div className="border-b border-slate-800 px-6 py-4 sm:border-b-0 sm:border-r">
            <p className="text-xs text-slate-500">
              Updated
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              {article.updatedAt}
            </p>
          </div>

          <div className="border-b border-slate-800 px-6 py-4 sm:border-b-0 sm:border-r">
            <p className="text-xs text-slate-500">
              Views
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
              <Eye className="h-4 w-4 text-slate-500" />
              {article.views.toLocaleString()}
            </p>
          </div>

          <div className="px-6 py-4">
            <p className="text-xs text-slate-500">
              Helpful votes
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
              <ThumbsUp className="h-4 w-4 text-slate-500" />
              {article.helpfulCount}
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <article className="rounded-xl border border-slate-800 bg-slate-950 p-6 lg:p-8">
          <div className="max-w-3xl">
            {article.content.map((section) => (
              <section
                key={section.heading}
                className="mb-8 last:mb-0"
              >
                <h2 className="text-lg font-semibold text-white">
                  {section.heading}
                </h2>

                <div className="mt-3 space-y-3">
                  {section.paragraphs.map(
                    (paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-slate-400"
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* AI / Knowledge info */}
        <aside className="space-y-6">
          <section className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <h2 className="text-sm font-semibold text-white">
              AI Knowledge Source
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Published articles can be indexed and used by
              SupportFlow AI when generating answers for
              customer tickets.
            </p>

            <div className="mt-4 rounded-lg border border-blue-500/10 bg-slate-950 p-3">
              <p className="text-xs text-slate-500">
                Indexing status
              </p>

              <p className="mt-1 text-sm font-medium text-emerald-400">
                Ready for indexing
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <h2 className="text-sm font-semibold text-white">
              Article Information
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs text-slate-500">
                  Created
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {article.createdAt}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Last updated
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {article.updatedAt}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}