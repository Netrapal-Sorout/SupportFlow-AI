import {
  ChevronRight,
  Mail,
  Ticket,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import type {
  Customer,
  CustomerStatus,
} from './customer-types';

interface CustomerListProps {
  customers: Customer[];
}

function getStatusClasses(
  status: CustomerStatus,
) {
  switch (status) {
    case 'active':
      return 'bg-[#E7F9F8] text-[#0BB3B0]';

    case 'inactive':
      return 'bg-[#F1F5F9] text-[#667085]';

    default:
      return 'bg-[#F1F5F9] text-[#667085]';
  }
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function CustomerList({
  customers,
}: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E4EAF2] bg-white px-6 py-16 text-center shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
          <Users className="h-5 w-5" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-[#17233F]">
          No customers found
        </h3>

        <p className="mt-1 text-sm text-[#667085]">
          Try changing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E4EAF2] bg-[#F8FAFC]">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Company
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Status
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Tickets
              </th>

              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-[#667085]">
                Last Contact
              </th>

              <th className="w-12 px-4 py-4" />
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => {
              const initials = getInitials(
                customer.name,
              );

              return (
                <tr
                  key={customer.id}
                  className="group border-b border-[#E4EAF2] last:border-b-0 transition hover:bg-[#F8FAFC]"
                >
                  {/* Customer */}
                  <td className="px-5 py-4">
                    <Link
                      to={`/customers/${customer.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-xs font-semibold text-[#0878D9]">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#17233F] transition group-hover:text-[#0878D9]">
                          {customer.name}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-[#98A2B3]" />

                          <p className="truncate text-xs text-[#667085]">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </td>

                  {/* Company */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[#475467]">
                      {customer.company}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                        customer.status,
                      )}`}
                    >
                      {customer.status
                        .charAt(0)
                        .toUpperCase() +
                        customer.status.slice(1)}
                    </span>
                  </td>

                  {/* Tickets */}
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-2">
                      <Ticket className="mt-0.5 h-4 w-4 text-[#667085]" />

                      <div>
                        <p className="text-sm font-semibold text-[#17233F]">
                          {customer.totalTickets}
                        </p>

                        <p className="mt-0.5 text-xs text-[#98A2B3]">
                          {customer.openTickets}{' '}
                          open
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Last Contact */}
                  <td className="px-5 py-4">
                    <p className="text-xs font-medium text-[#667085]">
                      {customer.lastContact}
                    </p>
                  </td>

                  {/* View */}
                  <td className="px-4 py-4 text-right">
                    <Link
                      to={`/customers/${customer.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#EAF4FF] hover:text-[#0878D9]"
                      aria-label={`View ${customer.name}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}