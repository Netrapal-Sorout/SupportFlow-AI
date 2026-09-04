import {
  ArrowLeft,
  Building2,
  Mail,
  Save,
  User,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function CreateCustomerPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    console.log({
      name,
      email,
      company,
    });

    navigate('/customers');
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        to="/customers"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Customers
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Add Customer
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Create a new customer profile.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-xl border border-slate-800 bg-slate-950"
      >
        <div className="border-b border-slate-800 px-6 py-5">
          <h2 className="text-sm font-semibold text-white">
            Customer Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Enter the customer's basic information.
          </p>
        </div>

        <div className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Sarah Johnson"
                required
                className="h-11 w-full rounded-lg border border-slate-800 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="sarah@example.com"
                required
                className="h-11 w-full rounded-lg border border-slate-800 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Company
            </label>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                id="company"
                type="text"
                value={company}
                onChange={(event) =>
                  setCompany(event.target.value)
                }
                placeholder="Acme Corporation"
                required
                className="h-11 w-full rounded-lg border border-slate-800 bg-slate-900 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-4">
          <Link
            to="/customers"
            className="inline-flex h-10 items-center rounded-lg border border-slate-700 px-4 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
          >
            <Save className="h-4 w-4" />
            Create Customer
          </button>
        </div>
      </form>
    </div>
  );
}