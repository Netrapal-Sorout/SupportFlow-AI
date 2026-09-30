import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Loader2,
  Paperclip,
  Send,
  Ticket,
  Trash2,
  Upload,
} from 'lucide-react';

import { useState } from 'react';

import type {
  ChangeEvent,
  FormEvent,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  createClientTicket,
} from './client-ticket.api';

type TicketCategory =
  | 'BILLING'
  | 'TECHNICAL'
  | 'ACCOUNT'
  | 'SHIPPING'
  | 'GENERAL';

type TicketPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';

const MAX_FILES = 5;

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'text/plain',
  'application/zip',
]);

function formatFileSize(
  size: number,
): string {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(
      size / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

export function ClientCreateTicketPage() {
  const navigate = useNavigate();

  const [subject, setSubject] =
    useState('');

  const [category, setCategory] =
    useState<TicketCategory>('GENERAL');

  const [priority, setPriority] =
    useState<TicketPriority>('MEDIUM');

  const [description, setDescription] =
    useState('');

  const [attachments, setAttachments] =
    useState<File[]>([]);

  const [attachmentError, setAttachmentError] =
    useState('');

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState('');

  function handleAttachmentChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    setAttachmentError('');

    if (selectedFiles.length === 0) {
      return;
    }

    if (
      attachments.length +
        selectedFiles.length >
      MAX_FILES
    ) {
      setAttachmentError(
        `You can attach up to ${MAX_FILES} files.`,
      );

      event.target.value = '';

      return;
    }

    const unsupportedFile =
      selectedFiles.find(
        (file) =>
          !ALLOWED_FILE_TYPES.has(
            file.type,
          ),
      );

    if (unsupportedFile) {
      setAttachmentError(
        `${unsupportedFile.name} is not a supported file type.`,
      );

      event.target.value = '';

      return;
    }

    const oversizedFile =
      selectedFiles.find(
        (file) =>
          file.size > MAX_FILE_SIZE,
      );

    if (oversizedFile) {
      setAttachmentError(
        `${oversizedFile.name} is larger than 10 MB.`,
      );

      event.target.value = '';

      return;
    }

    setAttachments((current) => [
      ...current,
      ...selectedFiles,
    ]);

    event.target.value = '';
  }

  function removeAttachment(
    index: number,
  ) {
    setAttachments((current) =>
      current.filter(
        (_, fileIndex) =>
          fileIndex !== index,
      ),
    );

    setAttachmentError('');
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError('');
    setAttachmentError('');

    if (!subject.trim()) {
      setError(
        'Please enter a subject.',
      );

      return;
    }

    if (!description.trim()) {
      setError(
        'Please describe your issue.',
      );

      return;
    }

    try {
      setIsSubmitting(true);

      await createClientTicket({
        subject: subject.trim(),
        category,
        priority,
        description:
          description.trim(),
        attachments,
      });

      navigate('/portal/tickets', {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create your ticket.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-5">

      {/* Header */}
      <section className="rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_4px_20px_rgba(23,35,63,0.04)]">
        <div className="flex items-center justify-between gap-4 px-7 py-6">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                navigate(
                  '/portal/tickets',
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4EAF2] bg-white text-[#667085] transition hover:bg-[#F8FAFC] hover:text-[#17233F]"
              aria-label="Back to tickets"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div>

              <div className="mb-1 flex items-center gap-2">

                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#0878D9]">
                  <Ticket className="h-4 w-4" />
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0878D9]">
                  Support
                </span>

              </div>

              <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#17233F]">
                Create a Support Ticket
              </h1>

              <p className="mt-1 text-[13px] text-[#667085]">
                Tell us what you need help with and our
                support team will get back to you.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_4px_20px_rgba(23,35,63,0.04)]"
      >

        <div className="border-b border-[#E8EDF3] px-7 py-5">

          <div className="flex items-center gap-3">

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F6FB] text-[#0878D9]">
              <FileText className="h-4 w-4" />
            </span>

            <div>

              <h2 className="text-[15px] font-semibold text-[#17233F]">
                Ticket Details
              </h2>

              <p className="mt-0.5 text-[12px] text-[#667085]">
                Provide enough information for our team
                to understand your issue.
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-6 px-7 py-7">

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-[#F3CACA] bg-[#FFF7F7] px-4 py-3 text-[13px] font-medium text-[#B42318]">
              {error}
            </div>
          )}

          {/* Subject */}
          <div>

            <label
              htmlFor="ticket-subject"
              className="mb-2 block text-[13px] font-semibold text-[#17233F]"
            >
              Subject

              <span className="ml-1 text-[#D92D20]">
                *
              </span>

            </label>

            <input
              id="ticket-subject"
              type="text"
              value={subject}
              onChange={(event) =>
                setSubject(
                  event.target.value,
                )
              }
              placeholder="Briefly describe your issue"
              className="h-11 w-full rounded-xl border border-[#DCE5EF] bg-white px-4 text-[13px] text-[#17233F] outline-none transition placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
            />

          </div>

          {/* Category + Priority */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>

              <label
                htmlFor="ticket-category"
                className="mb-2 block text-[13px] font-semibold text-[#17233F]"
              >
                Category
              </label>

              <select
                id="ticket-category"
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target
                      .value as TicketCategory,
                  )
                }
                className="h-11 w-full rounded-xl border border-[#DCE5EF] bg-white px-4 text-[13px] text-[#17233F] outline-none transition focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
              >
                <option value="GENERAL">
                  General
                </option>

                <option value="BILLING">
                  Billing
                </option>

                <option value="TECHNICAL">
                  Technical
                </option>

                <option value="ACCOUNT">
                  Account
                </option>

                <option value="SHIPPING">
                  Shipping
                </option>
              </select>

            </div>

            <div>

              <label
                htmlFor="ticket-priority"
                className="mb-2 block text-[13px] font-semibold text-[#17233F]"
              >
                Priority
              </label>

              <select
                id="ticket-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target
                      .value as TicketPriority,
                  )
                }
                className="h-11 w-full rounded-xl border border-[#DCE5EF] bg-white px-4 text-[13px] text-[#17233F] outline-none transition focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
              >
                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="URGENT">
                  Urgent
                </option>
              </select>

            </div>

          </div>

          {/* Description */}
          <div>

            <label
              htmlFor="ticket-description"
              className="mb-2 block text-[13px] font-semibold text-[#17233F]"
            >
              Describe your issue

              <span className="ml-1 text-[#D92D20]">
                *
              </span>

            </label>

            <textarea
              id="ticket-description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder="Please provide details about the problem, what happened, and any relevant information..."
              rows={8}
              className="w-full resize-none rounded-xl border border-[#DCE5EF] bg-white px-4 py-3 text-[13px] leading-6 text-[#17233F] outline-none transition placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
            />

          </div>

          {/* Attachments */}
          <div>

            <div className="mb-2 flex items-center justify-between gap-4">

              <label
                htmlFor="ticket-attachments"
                className="text-[13px] font-semibold text-[#17233F]"
              >
                Attachments
              </label>

              <span className="text-[11px] text-[#98A2B3]">
                Up to 5 files · 10 MB each
              </span>

            </div>

            <input
              id="ticket-attachments"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.gif,.pdf,.txt,.zip"
              onChange={
                handleAttachmentChange
              }
              className="sr-only"
            />

            <label
              htmlFor="ticket-attachments"
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#D5DEE9] bg-[#FAFBFC] px-4 py-4 transition hover:border-[#0878D9] hover:bg-[#F5FAFF]"
            >

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E1E7EF] bg-white text-[#0878D9] shadow-sm">
                <Paperclip className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">

                <p className="text-[12px] font-semibold text-[#17233F] group-hover:text-[#0878D9]">
                  Attach screenshots or files
                </p>

                <p className="mt-0.5 text-[11px] text-[#98A2B3]">
                  Click to browse files from your device
                </p>

              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#DCE5EF] bg-white px-3 py-2 text-[11px] font-semibold text-[#667085] shadow-sm">

                <Upload className="h-3.5 w-3.5" />

                Browse

              </span>

            </label>

            {/* Attachment error */}
            {attachmentError && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#F3CACA] bg-[#FFF7F7] px-3 py-2">

                <AlertCircle className="h-4 w-4 shrink-0 text-[#D64545]" />

                <p className="text-[11px] font-medium text-[#B42318]">
                  {attachmentError}
                </p>

              </div>
            )}

            {/* Selected files */}
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">

                {attachments.map(
                  (file, index) => (
                    <div
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="flex items-center gap-3 rounded-xl border border-[#E1E7EF] bg-white px-3 py-3"
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F7FF] text-[#0878D9]">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-[12px] font-semibold text-[#17233F]">
                          {file.name}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                          {formatFileSize(
                            file.size,
                          )}
                        </p>

                      </div>

                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0D9B68]" />

                      <button
                        type="button"
                        onClick={() =>
                          removeAttachment(
                            index,
                          )
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#98A2B3] transition hover:bg-[#FFF3F3] hover:text-[#D64545]"
                        aria-label={`Remove ${file.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>
                  ),
                )}

              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 border-t border-[#E8EDF3] px-7 py-5">

          <button
            type="button"
            onClick={() =>
              navigate(
                '/portal/tickets',
              )
            }
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#DCE5EF] bg-white px-5 text-[13px] font-semibold text-[#475467] transition hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-6 text-[13px] font-semibold text-white shadow-[0_5px_15px_rgba(8,120,217,0.18)] transition hover:bg-[#066BC2] disabled:cursor-not-allowed disabled:opacity-60"
          >

            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Ticket
              </>
            )}

          </button>

        </div>

      </form>

      {/* Help message */}
      <div className="flex items-start gap-3 rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] px-5 py-4">

        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0878D9]" />

        <p className="text-[12px] leading-5 text-[#667085]">
          Once submitted, your ticket will appear in My
          Tickets and our support team will be notified.
        </p>

      </div>

    </div>
  );
}