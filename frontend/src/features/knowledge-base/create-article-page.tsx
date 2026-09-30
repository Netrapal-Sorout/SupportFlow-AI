import {
  ArrowLeft,
  BookOpen,
  Save,
} from 'lucide-react';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createArticle } from './article.api';

type ArticleCategory =
  | 'GENERAL'
  | 'BILLING'
  | 'ACCOUNT'
  | 'SHIPPING'
  | 'TECHNICAL';

type ArticleStatus =
  | 'DRAFT'
  | 'PUBLISHED';

interface ArticleForm {
  title: string;
  slug: string;
  category: ArticleCategory;
  status: ArticleStatus;
  summary: string;
  content: string;
}

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function CreateArticlePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<ArticleForm>({
    title: '',
    slug: '',
    category: 'GENERAL',
    status: 'DRAFT',
    summary: '',
    content: '',
  });

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug
        ? current.slug
        : createSlug(value),
    }));
  }

  function handleSlugChange(value: string) {
    setForm((current) => ({
      ...current,
      slug: createSlug(value),
    }));
  }

  async function submit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');

    const title = form.title.trim();
    const slug = createSlug(form.slug);
    const summary = form.summary.trim();
    const content = form.content.trim();

    if (title.length < 3) {
      setError(
        'Title must be at least 3 characters.',
      );
      return;
    }

    if (slug.length < 3) {
      setError(
        'Slug must be at least 3 characters.',
      );
      return;
    }

    if (summary.length < 10) {
      setError(
        'Summary must be at least 10 characters.',
      );
      return;
    }

    if (content.length < 10) {
      setError(
        'Content must be at least 10 characters.',
      );
      return;
    }

    setSaving(true);

    try {
      const article = await createArticle({
        title,
        slug,
        category: form.category,
        status: form.status,
        summary,
        content,
      });

      navigate(
        `/knowledge-base/${article.id}`,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to create article',
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="sf-page article-create-page">
      <div className="sf-page__inner">
        <Link
          className="sf-back"
          to="/knowledge-base"
        >
          <ArrowLeft size={15} />
          Back to Knowledge Base
        </Link>

        <header
          className="sf-card sf-page-header"
          style={{
            padding: '18px 20px',
            marginBottom: 20,
          }}
        >
          <div className="sf-header-title">
            <div className="sf-icon-box">
              <BookOpen size={18} />
            </div>

            <div>
              <h1 className="sf-heading">
                Create Article
              </h1>

              <p className="sf-subheading">
                Publish a source of truth for agents
                and AI retrieval.
              </p>
            </div>
          </div>
        </header>

        <form
          className="sf-card"
          style={{ maxWidth: 980 }}
          onSubmit={submit}
        >
          <div className="sf-card__body sf-stack">
            {error && (
              <div className="sf-alert">
                {error}
              </div>
            )}

            <div>
              <label className="sf-label">
                Title
              </label>

              <input
                className="sf-input"
                value={form.title}
                onChange={(event) =>
                  handleTitleChange(
                    event.target.value,
                  )
                }
                placeholder="Payment troubleshooting"
              />
            </div>

            <div className="sf-form-grid">
              <div>
                <label className="sf-label">
                  Slug
                </label>

                <input
                  className="sf-input"
                  value={form.slug}
                  onChange={(event) =>
                    handleSlugChange(
                      event.target.value,
                    )
                  }
                  placeholder="payment-troubleshooting"
                />

                <p
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: '#667085',
                  }}
                >
                  Use lowercase letters, numbers,
                  and hyphens only.
                </p>
              </div>

              <div>
                <label className="sf-label">
                  Category
                </label>

                <select
                  className="sf-select"
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category:
                        event.target
                          .value as ArticleCategory,
                    }))
                  }
                >
                  <option value="GENERAL">
                    General
                  </option>

                  <option value="BILLING">
                    Billing
                  </option>

                  <option value="ACCOUNT">
                    Account
                  </option>

                  <option value="SHIPPING">
                    Shipping
                  </option>

                  <option value="TECHNICAL">
                    Technical
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="sf-label">
                Summary
              </label>

              <input
                className="sf-input"
                value={form.summary}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    summary:
                      event.target.value,
                  }))
                }
                placeholder="Briefly explain what this article covers"
              />
            </div>

            <div>
              <label className="sf-label">
                Content
              </label>

              <textarea
                className="sf-textarea"
                style={{ minHeight: 300 }}
                value={form.content}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    content:
                      event.target.value,
                  }))
                }
                placeholder="Write the complete knowledge base article here..."
              />
            </div>

            <div>
              <label className="sf-label">
                Status
              </label>

              <select
                className="sf-select"
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status:
                      event.target
                        .value as ArticleStatus,
                  }))
                }
              >
                <option value="DRAFT">
                  Draft
                </option>

                <option value="PUBLISHED">
                  Published
                </option>
              </select>
            </div>
          </div>

          <div className="sf-form-actions">
            <Link
              className="sf-button"
              to="/knowledge-base"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="sf-button sf-button--primary"
              disabled={saving}
            >
              <Save size={15} />

              {saving
                ? 'Saving…'
                : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}