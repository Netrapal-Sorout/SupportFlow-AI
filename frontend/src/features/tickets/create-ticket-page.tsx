import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { CreateTicketForm } from './create-ticket-form';

export function CreateTicketPage() {
  const navigate = useNavigate();

  function handleCancel() {
    navigate('/tickets');
  }

  function handleSuccess() {
    navigate('/tickets');
  }

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <Link
        to="/tickets"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tickets
      </Link>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Create Ticket
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Create a new customer support request.
        </p>
      </div>

      {/* Form */}
      <CreateTicketForm
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </div>
  );
}