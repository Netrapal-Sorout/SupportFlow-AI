import {
  Plus,
  Search,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { CustomerList } from './customer-list';
import type { Customer } from './customer-types';

const customers: Customer[] = [
  {
    id: 'CUS-1001',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    company: 'Acme Corporation',
    status: 'active',
    totalTickets: 8,
    openTickets: 1,
    lastContact: '2 minutes ago',
    createdAt: 'March 12, 2025',
  },
  {
    id: 'CUS-1002',
    name: 'Michael Chen',
    email: 'michael@example.com',
    company: 'Northstar Labs',
    status: 'active',
    totalTickets: 5,
    openTickets: 1,
    lastContact: '14 minutes ago',
    createdAt: 'April 8, 2025',
  },
  {
    id: 'CUS-1003',
    name: 'Emily Davis',
    email: 'emily@example.com',
    company: 'Vertex Commerce',
    status: 'active',
    totalTickets: 12,
    openTickets: 2,
    lastContact: '28 minutes ago',
    createdAt: 'January 20, 2025',
  },
  {
    id: 'CUS-1004',
    name: 'David Wilson',
    email: 'david@example.com',
    company: 'Brightside Media',
    status: 'active',
    totalTickets: 3,
    openTickets: 0,
    lastContact: '1 hour ago',
    createdAt: 'June 3, 2025',
  },
  {
    id: 'CUS-1005',
    name: 'Jessica Brown',
    email: 'jessica@example.com',
    company: 'CloudPeak Systems',
    status: 'inactive',
    totalTickets: 7,
    openTickets: 0,
    lastContact: '2 days ago',
    createdAt: 'February 14, 2025',
  },
  {
    id: 'CUS-1006',
    name: 'Daniel Martinez',
    email: 'daniel@example.com',
    company: 'Summit Retail',
    status: 'active',
    totalTickets: 9,
    openTickets: 1,
    lastContact: '3 hours ago',
    createdAt: 'May 17, 2025',
  },
];

export function CustomersPage() {
  const [search, setSearch] = useState('');

  const filteredCustomers = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    if (!normalizedSearch) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        customer.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        customer.email
          .toLowerCase()
          .includes(normalizedSearch) ||
        customer.company
          .toLowerCase()
          .includes(normalizedSearch) ||
        customer.id
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#17233F]">
              Customers
            </h1>

            <p className="mt-1 text-sm text-[#667085]">
              Manage customer profiles and support history.
            </p>
          </div>
        </div>

        <Link
          to="/customers/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066BC2]"
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-[#E4EAF2] bg-white p-4 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
        <div className="relative max-w-[560px]">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search customers..."
            className="h-11 w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] pl-11 pr-4 text-sm text-[#17233F] outline-none placeholder:text-[#98A2B3] transition focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
          />
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-[#0878D9]" />

        <p className="text-sm text-[#667085]">
          Showing{' '}
          <span className="font-semibold text-[#17233F]">
            {filteredCustomers.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-[#17233F]">
            {customers.length}
          </span>{' '}
          customers
        </p>
      </div>

      {/* Customer List */}
      <CustomerList
        customers={filteredCustomers}
      />
    </div>
  );
}