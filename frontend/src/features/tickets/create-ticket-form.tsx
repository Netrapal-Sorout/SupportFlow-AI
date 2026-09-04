import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createTicketSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, 'Customer name must be at least 2 characters.'),

  customerEmail: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),

  subject: z
    .string()
    .trim()
    .min(5, 'Subject must be at least 5 characters.')
    .max(150, 'Subject must be less than 150 characters.'),

  category: z.enum([
    'billing',
    'technical',
    'account',
    'shipping',
    'general',
  ]),

  priority: z.enum([
    'low',
    'medium',
    'high',
    'urgent',
  ]),

  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters.')
    .max(
      5000,
      'Description must be less than 5000 characters.',
    ),
});

type CreateTicketFormValues = z.infer<
  typeof createTicketSchema
>;

interface CreateTicketFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function CreateTicketForm({
  onCancel,
  onSuccess,
}: CreateTicketFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),

    defaultValues: {
      customerName: '',
      customerEmail: '',
      subject: '',
      category: 'general',
      priority: 'medium',
      description: '',
    },
  });

  async function onSubmit(
    data: CreateTicketFormValues,
  ) {
    console.log('Create ticket:', data);

    // Temporary simulated submission.
    // Later this will call our backend API.
    await new Promise((resolve) =>
      setTimeout(resolve, 800),
    );

    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl space-y-6"
    >
      {/* Customer Information */}
      <section className="rounded-xl border border-slate-800 bg-slate-950">
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="text-sm font-semibold text-white">
            Customer Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Enter the customer's contact information.
          </p>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          {/* Customer Name */}
          <div>
            <label
              htmlFor="customerName"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Customer Name
            </label>

            <input
              id="customerName"
              type="text"
              placeholder="Sarah Johnson"
              {...register('customerName')}
              className={`h-11 w-full rounded-lg border bg-slate-900 px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 ${
                errors.customerName
                  ? 'border-red-500'
                  : 'border-slate-800'
              }`}
            />

            {errors.customerName && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Customer Email */}
          <div>
            <label
              htmlFor="customerEmail"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Customer Email
            </label>

            <input
              id="customerEmail"
              type="email"
              placeholder="sarah@example.com"
              {...register('customerEmail')}
              className={`h-11 w-full rounded-lg border bg-slate-900 px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 ${
                errors.customerEmail
                  ? 'border-red-500'
                  : 'border-slate-800'
              }`}
            />

            {errors.customerEmail && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.customerEmail.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Ticket Information */}
      <section className="rounded-xl border border-slate-800 bg-slate-950">
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="text-sm font-semibold text-white">
            Ticket Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Provide details about the customer's issue.
          </p>
        </div>

        <div className="space-y-5 p-6">
          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="Payment failed during checkout"
              {...register('subject')}
              className={`h-11 w-full rounded-lg border bg-slate-900 px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500 ${
                errors.subject
                  ? 'border-red-500'
                  : 'border-slate-800'
              }`}
            />

            {errors.subject && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Category + Priority */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Category
              </label>

              <select
                id="category"
                {...register('category')}
                className="h-11 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 text-sm text-slate-300 outline-none focus:border-blue-500"
              >
                <option value="general">
                  General
                </option>

                <option value="billing">
                  Billing
                </option>

                <option value="technical">
                  Technical
                </option>

                <option value="account">
                  Account
                </option>

                <option value="shipping">
                  Shipping
                </option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Priority
              </label>

              <select
                id="priority"
                {...register('priority')}
                className="h-11 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 text-sm text-slate-300 outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">High</option>

                <option value="urgent">
                  Urgent
                </option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={7}
              placeholder="Describe the customer's issue in detail..."
              {...register('description')}
              className={`w-full resize-none rounded-lg border bg-slate-900 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 ${
                errors.description
                  ? 'border-red-500'
                  : 'border-slate-800'
              }`}
            />

            {errors.description && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Create Ticket
            </>
          )}
        </button>
      </div>
    </form>
  );
}