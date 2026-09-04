import {
  ArrowLeft,
  FileText,
  Save,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function CreateArticlePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState('general');
  const [content, setContent] = useState('');

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    console.log({
      title,
      category,
      content,
    });

    navigate('/knowledge-base');
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
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">
              Create Article
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Add information to your support knowledge base.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl rounded-xl border border-slate-800 bg-slate-950"
      >
        <div className="space-y-6 p-6">
          {/* Title */}
          <div>
            <label
              htmlFor="article-title"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Article Title
            </label>

            <input
              id="article-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="How to reset your password"
              required
              className="h-11 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="article-category"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Category
            </label>

            <select
              id="article-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="h-11 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="general">
                General
              </option>

              <option value="billing">
                Billing
              </option>

              <option value="account">
                Account
              </option>

              <option value="shipping">
                Shipping
              </option>

              <option value="technical">
                Technical
              </option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="article-content"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Article Content
            </label>

            <textarea
              id="article-content"
              rows={16}
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              placeholder="Write the article content here..."
              required
              className="w-full resize-y rounded-lg border border-slate-800 bg-slate-900 px-3 py-3 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />

            <p className="mt-2 text-xs text-slate-600">
              Write clear, factual information. This
              content may later be used as an AI knowledge
              source.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">
          <Link
            to="/knowledge-base"
            className="inline-flex h-10 items-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
          >
            <Save className="h-4 w-4" />
            Save Article
          </button>
        </div>
      </form>
    </div>
  );
}