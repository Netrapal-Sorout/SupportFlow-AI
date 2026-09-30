import {
  ArrowRight,
  BookOpen,
  CreditCard,
  HelpCircle,
  Search,
  Settings,
  Shield,
  Truck,
} from 'lucide-react';

import { useState } from 'react';

const categories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and get started quickly.',
    icon: BookOpen,
  },
  {
    title: 'Account',
    description: 'Manage your profile and account settings.',
    icon: Settings,
  },
  {
    title: 'Billing',
    description: 'Payments, invoices and billing questions.',
    icon: CreditCard,
  },
  {
    title: 'Shipping',
    description: 'Delivery, shipping and order information.',
    icon: Truck,
  },
  {
    title: 'Security',
    description: 'Account security and privacy information.',
    icon: Shield,
  },
  {
    title: 'Troubleshooting',
    description: 'Solutions for common technical problems.',
    icon: HelpCircle,
  },
];

const articles = [
  'How do I update my account information?',
  'How can I check the status of my ticket?',
  'How do I update my billing information?',
  'Where can I find my previous support requests?',
  'What should I include when creating a ticket?',
];

export function ClientHelpCenterPage() {
  const [search, setSearch] = useState('');

  const filteredArticles = articles.filter(
    (article) =>
      article
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">

      <div className="mx-auto w-full max-w-[1600px] space-y-5">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

          <div className="absolute left-0 top-0 h-full w-1 bg-[#0878D9]" />

          <div className="px-6 py-8 text-center sm:px-8 sm:py-10">

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF]">
              <BookOpen className="h-5 w-5 text-[#0878D9]" />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0878D9]">
              Help Center
            </p>

            <h1 className="mt-2 text-[28px] font-bold tracking-[-0.025em] text-[#17233F]">
              How can we help?
            </h1>

            <p className="mx-auto mt-2 max-w-[600px] text-[13px] leading-6 text-[#667085]">
              Find answers, guides and troubleshooting
              information for common questions.
            </p>

            <div className="relative mx-auto mt-6 max-w-[720px]">

              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search guides, articles and answers..."
                className="h-12 w-full rounded-xl border border-[#D8E0EA] bg-white pl-11 pr-4 text-[13px] text-[#17233F] outline-none shadow-sm placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
              />

            </div>

          </div>

        </section>

        {/* Categories */}
        <section>

          <div className="mb-4">

            <h2 className="text-[15px] font-bold text-[#17233F]">
              Browse by topic
            </h2>

            <p className="mt-1 text-[11px] text-[#98A2B3]">
              Find information organized by category.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  type="button"
                  className="group rounded-2xl border border-[#E1E7EF] bg-white p-5 text-left shadow-[0_3px_16px_rgba(23,35,63,0.035)] transition hover:-translate-y-0.5 hover:border-[#CFE0F2]"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF]">
                      <Icon className="h-4 w-4 text-[#0878D9]" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-[#B7C0CC] group-hover:text-[#0878D9]" />

                  </div>

                  <h3 className="mt-4 text-[14px] font-bold text-[#17233F]">
                    {category.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] leading-5 text-[#667085]">
                    {category.description}
                  </p>

                </button>
              );
            })}

          </div>

        </section>

        {/* Articles */}
        <section className="overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white shadow-[0_3px_16px_rgba(23,35,63,0.035)]">

          <div className="border-b border-[#E8EDF3] px-6 py-5">

            <h2 className="text-[14px] font-bold text-[#17233F]">
              Popular articles
            </h2>

            <p className="mt-1 text-[11px] text-[#98A2B3]">
              Helpful answers to common questions.
            </p>

          </div>

          <div className="divide-y divide-[#EEF2F6]">

            {filteredArticles.map((article) => (
              <button
                key={article}
                type="button"
                className="group flex w-full items-center gap-4 px-6 py-4 text-left hover:bg-[#FBFCFE]"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F2F5F8]">
                  <BookOpen className="h-4 w-4 text-[#667085]" />
                </div>

                <span className="min-w-0 flex-1 text-[12px] font-medium text-[#344054] group-hover:text-[#0878D9]">
                  {article}
                </span>

                <ArrowRight className="h-4 w-4 shrink-0 text-[#B7C0CC] group-hover:text-[#0878D9]" />

              </button>
            ))}

          </div>

        </section>

      </div>

    </div>
  );
}