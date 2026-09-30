import {
  ArrowLeft,
  BookOpen,
  Save,
  Trash2,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  deleteArticle,
  getArticle,
  updateArticle,
  type ArticleRecord,
} from './article.api';

type ArticleForm = Omit<
  ArticleRecord,
  | 'id'
  | 'views'
  | 'helpfulCount'
  | 'createdAt'
  | 'updatedAt'
  | 'author'
>;

export function ArticleDetailsPage() {
  const {
    articleId = '',
  } = useParams();

  const navigate = useNavigate();

  const [article, setArticle] =
    useState<ArticleRecord | null>(null);

  const [form, setForm] =
    useState<ArticleForm | null>(null);

  const [error, setError] =
    useState('');

  const [isSaving, setIsSaving] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  /*
   * =========================================================
   * LOAD ARTICLE
   * =========================================================
   */

  useEffect(() => {
    if (!articleId) {
      setError(
        'Article ID is missing.',
      );
      return;
    }

    setError('');

    void getArticle(articleId)
      .then((data) => {
        setArticle(data);

        setForm({
          title: data.title,
          slug: data.slug,
          category: data.category,
          status: data.status,
          summary: data.summary,
          content: data.content,
        });
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load article',
        );
      });
  }, [articleId]);

  /*
   * =========================================================
   * SAVE ARTICLE
   * =========================================================
   */

  async function save(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!articleId || !form) {
      return;
    }

    setError('');
    setSaved(false);
    setIsSaving(true);

    try {
      const updatedArticle =
        await updateArticle(
          articleId,
          form,
        );

      setArticle(updatedArticle);

      setForm({
        title: updatedArticle.title,
        slug: updatedArticle.slug,
        category:
          updatedArticle.category,
        status:
          updatedArticle.status,
        summary:
          updatedArticle.summary,
        content:
          updatedArticle.content,
      });

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 1800);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save article',
      );
    } finally {
      setIsSaving(false);
    }
  }

  /*
   * =========================================================
   * DELETE ARTICLE
   * =========================================================
   */

  async function remove() {
    if (!articleId) {
      return;
    }

    const confirmed =
      window.confirm(
        'Delete this article?',
      );

    if (!confirmed) {
      return;
    }

    setError('');
    setIsDeleting(true);

    try {
      await deleteArticle(articleId);

      navigate(
        '/admin/knowledge-base',
        {
          replace: true,
        },
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete article',
      );
    } finally {
      setIsDeleting(false);
    }
  }

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (!article || !form) {
    return (
      <div className="sf-page">
        <div className="sf-page__inner">

          {error ? (
            <div className="sf-alert">
              {error}
            </div>
          ) : (
            <div className="sf-empty">
              Loading article…
            </div>
          )}

        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <div className="sf-page article-detail-page">

      <div className="sf-page__inner">

        {/* BACK */}

        <Link
          className="sf-back"
          to="/admin/knowledge-base"
        >
          <ArrowLeft size={15} />
          Back to Knowledge Base
        </Link>

        {/* EDIT ARTICLE */}

        <form
          className="sf-card"
          style={{
            maxWidth: 980,
          }}
          onSubmit={save}
        >

          {/* HEADER */}

          <div className="sf-card__header">

            <div className="sf-header-title">

              <div className="sf-icon-box">
                <BookOpen size={17} />
              </div>

              <div>

                <div className="sf-section-title">
                  Edit Article
                </div>

                <p className="sf-subheading">
                  Updated{' '}
                  {new Date(
                    article.updatedAt,
                  ).toLocaleString()}{' '}
                  · {article.views} views
                </p>

              </div>

            </div>

          </div>

          {/* FORM BODY */}

          <div className="sf-card__body sf-stack">

            {error && (
              <div className="sf-alert">
                {error}
              </div>
            )}

            {/* TITLE */}

            <div>
              <label className="sf-label">
                Title
              </label>

              <input
                className="sf-input"
                value={form.title}
                onChange={(event) =>
                  setForm({
                    ...form,
                    title:
                      event.target.value,
                  })
                }
              />
            </div>

            {/* SLUG + STATUS */}

            <div className="sf-form-grid">

              <div>
                <label className="sf-label">
                  Slug
                </label>

                <input
                  className="sf-input"
                  value={form.slug}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      slug:
                        event.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="sf-label">
                  Status
                </label>

                <select
                  className="sf-select"
                  value={form.status}
                  onChange={(event) => {
                    const status =
                      event.target.value as
                        | 'DRAFT'
                        | 'PUBLISHED';

                    setForm({
                      ...form,
                      status,
                    });
                  }}
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

            {/* SUMMARY */}

            <div>
              <label className="sf-label">
                Summary
              </label>

              <input
                className="sf-input"
                value={form.summary}
                onChange={(event) =>
                  setForm({
                    ...form,
                    summary:
                      event.target.value,
                  })
                }
              />
            </div>

            {/* CONTENT */}

            <div>
              <label className="sf-label">
                Content
              </label>

              <textarea
                className="sf-textarea"
                style={{
                  minHeight: 360,
                }}
                value={form.content}
                onChange={(event) =>
                  setForm({
                    ...form,
                    content:
                      event.target.value,
                  })
                }
              />
            </div>

          </div>

          {/* ACTIONS */}

          <div className="sf-form-actions">

            <button
              type="button"
              className="sf-button sf-button--danger"
              onClick={remove}
              disabled={
                isDeleting ||
                isSaving
              }
            >
              <Trash2 size={15} />

              {isDeleting
                ? 'Deleting...'
                : 'Delete'}
            </button>

            <span
              style={{
                flex: 1,
              }}
            />

            <Link
              className="sf-button"
              to="/admin/knowledge-base"
            >
              Cancel
            </Link>

            {saved && (
              <span
                style={{
                  fontSize: 12,
                  color: '#087f7c',
                }}
              >
                Saved
              </span>
            )}

            <button
              type="submit"
              className="sf-button sf-button--primary"
              disabled={
                isSaving ||
                isDeleting
              }
            >
              <Save size={15} />

              {isSaving
                ? 'Saving...'
                : 'Save Changes'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}