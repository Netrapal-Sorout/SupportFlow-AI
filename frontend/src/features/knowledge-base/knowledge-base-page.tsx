import {
  BookOpen,
  Plus,
  Search,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  getArticles,
  type ArticleRecord,
} from './article.api';

function label(value: string): string {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );
}

export function KnowledgeBasePage() {
  const [articles, setArticles] =
    useState<ArticleRecord[]>([]);

  const [search, setSearch] =
    useState('');

  const [category, setCategory] =
    useState('ALL');

  const [error, setError] =
    useState('');

  const load = () => {
    setError('');

    void getArticles(
      search,
      category,
    )
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load articles',
        );
      });
  };

  useEffect(() => {
    load();
  }, [category]);

  return (
    <div className="sf-page knowledge-base-page">

      <div className="sf-page__inner sf-stack">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header
          className="sf-card sf-page-header"
          style={{
            padding: '18px 20px',
          }}
        >
          <div className="sf-header-title">

            <div className="sf-icon-box">
              <BookOpen size={18} />
            </div>

            <div>
              <h1 className="sf-heading">
                Knowledge Base
              </h1>

              <p className="sf-subheading">
                Manage the articles used by agents and AI retrieval.
              </p>
            </div>

          </div>

          {/* ADMIN CREATE ARTICLE */}

          <Link
            className="sf-button sf-button--primary"
            to="/admin/knowledge-base/new"
          >
            <Plus size={16} />
            Create Article
          </Link>

        </header>

        {/* =====================================================
            SEARCH + FILTERS
        ===================================================== */}

        <section className="sf-card">

          <div className="sf-toolbar">

            <div
              style={{
                display: 'flex',
                gap: 10,
                flex: 1,
              }}
            >

              <div
                style={{
                  position: 'relative',
                  maxWidth: 650,
                  width: '100%',
                }}
              >

                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: 12,
                    color: '#98a2b3',
                  }}
                />

                <input
                  className="sf-input"
                  style={{
                    paddingLeft: 38,
                  }}
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter'
                    ) {
                      load();
                    }
                  }}
                  placeholder="Search articles…"
                />

              </div>

              <button
                type="button"
                className="sf-button"
                onClick={load}
              >
                Search
              </button>

            </div>

            {/* CATEGORY */}

            <select
              className="sf-select"
              style={{
                width: 170,
              }}
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value,
                )
              }
            >
              <option value="ALL">
                All categories
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

              <option value="GENERAL">
                General
              </option>
            </select>

          </div>

        </section>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="sf-alert">
            {error}
          </div>
        )}

        {/* =====================================================
            ARTICLES TABLE
        ===================================================== */}

        <section className="sf-card sf-table-wrap">

          <table className="sf-table">

            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>

              {articles.map((article) => (
                <tr key={article.id}>

                  {/* ARTICLE */}

                  <td>

                    {/* IMPORTANT:
                        USE ADMIN ARTICLE ROUTE
                    */}

                    <Link
                      className="sf-link"
                      to={`/admin/knowledge-base/${article.id}`}
                    >
                      {article.title}
                    </Link>

                    <div
                      style={{
                        fontSize: 11,
                        color: '#98a2b3',
                        marginTop: 3,
                      }}
                    >
                      {article.summary}
                    </div>

                  </td>

                  {/* CATEGORY */}

                  <td>
                    {label(
                      article.category,
                    )}
                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className="sf-pill"
                      style={{
                        background:
                          article.status ===
                          'PUBLISHED'
                            ? '#eaf8f7'
                            : '#f2f4f7',

                        color:
                          article.status ===
                          'PUBLISHED'
                            ? '#087f7c'
                            : '#667085',
                      }}
                    >
                      {label(
                        article.status,
                      )}
                    </span>

                  </td>

                  {/* VIEWS */}

                  <td>
                    {article.views}
                  </td>

                  {/* UPDATED */}

                  <td>
                    {new Date(
                      article.updatedAt,
                    ).toLocaleString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {articles.length === 0 && (
            <div className="sf-empty">
              No articles found.
            </div>
          )}

        </section>

      </div>

    </div>
  );
}