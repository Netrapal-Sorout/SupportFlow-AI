import {
  Clock3,
  MessageSquare,
  Sparkles,
  Ticket,
} from 'lucide-react';

import { AIPerformanceCard } from './ai-performance-card';
import { AnalyticsStatCard } from './analytics-stat-card';
import { TicketCategoryChart } from './ticket-category-chart';
import { TicketVolumeChart } from './ticket-volume-chart';

const ticketVolume = [
  { label: 'Mon', tickets: 82 },
  { label: 'Tue', tickets: 96 },
  { label: 'Wed', tickets: 74 },
  { label: 'Thu', tickets: 118 },
  { label: 'Fri', tickets: 104 },
  { label: 'Sat', tickets: 61 },
  { label: 'Sun', tickets: 48 },
];

const ticketCategories = [
  {
    category: 'Billing',
    tickets: 342,
    percentage: 32,
  },
  {
    category: 'Technical',
    tickets: 278,
    percentage: 26,
  },
  {
    category: 'Account',
    tickets: 214,
    percentage: 20,
  },
  {
    category: 'Shipping',
    tickets: 139,
    percentage: 13,
  },
  {
    category: 'General',
    tickets: 96,
    percentage: 9,
  },
];

const aiPerformance = [
  {
    metric: 'AI Resolution Rate',
    value: '72.4%',
    description:
      'Tickets resolved with AI assistance without requiring additional intervention.',
  },
  {
    metric: 'Suggestion Acceptance',
    value: '87.6%',
    description:
      'AI-generated responses accepted or lightly edited by support agents.',
  },
  {
    metric: 'AI Confidence',
    value: '92.4%',
    description:
      'Average confidence across ticket classification and AI recommendations.',
  },
  {
    metric: 'Time Saved',
    value: '18.7 hrs',
    description:
      'Estimated support-agent time saved through AI-assisted workflows.',
  },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
              <Sparkles size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#17233F]">
                Analytics
              </h1>

              <p className="mt-1 text-sm text-[#667085]">
                Understand your support performance and
                measure the impact of AI.
              </p>
            </div>
          </div>
        </div>

        <select
          defaultValue="7"
          className="w-fit rounded-xl border border-[#E4EAF2] bg-white px-4 py-2.5 text-sm text-[#475467] outline-none focus:border-[#0878D9] focus:ring-4 focus:ring-[#0878D9]/10"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard
          icon={<Ticket size={19} />}
          label="Total Tickets"
          value="1,284"
          change={12.4}
          comparison="vs previous period"
        />

        <AnalyticsStatCard
          icon={<Clock3 size={19} />}
          label="Avg. Response Time"
          value="4m 32s"
          change={-8.2}
          comparison="vs previous period"
        />

        <AnalyticsStatCard
          icon={<MessageSquare size={19} />}
          label="Resolution Rate"
          value="91.8%"
          change={4.7}
          comparison="vs previous period"
        />

        <AnalyticsStatCard
          icon={<Sparkles size={19} />}
          label="AI Resolution Rate"
          value="72.4%"
          change={9.3}
          comparison="vs previous period"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,1fr)]">
        <TicketVolumeChart data={ticketVolume} />

        <TicketCategoryChart data={ticketCategories} />
      </div>

      {/* AI Analytics */}
      <AIPerformanceCard data={aiPerformance} />
    </div>
  );
}