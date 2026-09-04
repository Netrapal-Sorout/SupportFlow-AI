import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const metrics = [
  {
    label: 'Open Tickets',
    value: '128',
    change: '12.5%',
    direction: 'up',
    icon: MessageSquare,
    iconClass: 'bg-[#EAF4FF] text-[#0878D9]',
    chartClass: 'text-[#0878D9]',
  },
  {
    label: 'Avg. Response Time',
    value: '4m 32s',
    change: '18.2%',
    direction: 'down',
    icon: Clock3,
    iconClass: 'bg-[#E7F9F8] text-[#0BB3B0]',
    chartClass: 'text-[#0BB3B0]',
  },
  {
    label: 'AI Resolution Rate',
    value: '72.4%',
    change: '8.7%',
    direction: 'up',
    icon: TrendingUp,
    iconClass: 'bg-[#EAF8E8] text-[#45B83C]',
    chartClass: 'text-[#45B83C]',
  },
  {
    label: 'High Priority',
    value: '14',
    change: '3',
    direction: 'down',
    icon: AlertCircle,
    iconClass: 'bg-[#FFF3E5] text-[#FF8A00]',
    chartClass: 'text-[#FF8A00]',
  },
];

const activityData = [
  { day: 'May 12', value: 42 },
  { day: 'May 13', value: 81 },
  { day: 'May 14', value: 39 },
  { day: 'May 15', value: 60 },
  { day: 'May 16', value: 29 },
  { day: 'May 17', value: 70 },
  { day: 'May 18', value: 57 },
];

function MiniChart({
  className,
}: {
  className: string;
}) {
  return (
    <svg
      viewBox="0 0 90 40"
      className={`h-10 w-20 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 31 C10 31 10 23 18 25 C26 27 27 17 35 20 C43 23 45 10 53 16 C61 22 65 7 72 13 C78 18 82 8 88 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ActivityChart() {
  const maxValue = 100;

  return (
    <div className="mt-6">
      <div className="relative h-64">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[100, 80, 60, 40, 20, 0].map((value) => (
            <div
              key={value}
              className="flex items-center gap-3"
            >
              <span className="w-7 text-right text-xs text-[#667085]">
                {value}
              </span>

              <div className="h-px flex-1 border-t border-dashed border-[#E4EAF2]" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-10 right-0 top-0">
          <svg
            viewBox="0 0 700 230"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-label="Ticket activity chart"
          >
            <defs>
              <linearGradient
                id="activityArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#0878D9"
                  stopOpacity="0.20"
                />
                <stop
                  offset="100%"
                  stopColor="#0878D9"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            <path
              d="
                M 0 134
                C 35 120, 55 44, 116 44
                C 170 44, 195 138, 233 138
                C 285 138, 305 92, 350 92
                C 400 92, 420 180, 466 180
                C 520 180, 530 82, 583 82
                C 620 82, 655 112, 700 108
                L 700 230
                L 0 230
                Z
              "
              fill="url(#activityArea)"
            />

            <path
              d="
                M 0 134
                C 35 120, 55 44, 116 44
                C 170 44, 195 138, 233 138
                C 285 138, 305 92, 350 92
                C 400 92, 420 180, 466 180
                C 520 180, 530 82, 583 82
                C 620 82, 655 112, 700 108
              "
              fill="none"
              stroke="#0878D9"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {[
              [0, 134],
              [116, 44],
              [233, 138],
              [350, 92],
              [466, 180],
              [583, 82],
              [700, 108],
            ].map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r="5"
                fill="#FFFFFF"
                stroke="#0878D9"
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="ml-10 mt-3 grid grid-cols-7">
        {activityData.map((item) => (
          <span
            key={item.day}
            className="text-center text-xs text-[#475467]"
          >
            {item.day}
          </span>
        ))}
      </div>
    </div>
  );
}

const activitySummary = [
  {
    label: 'New Tickets',
    value: '156',
    change: '14.3%',
    positive: true,
    icon: MessageSquare,
    iconClass: 'bg-[#EAF4FF] text-[#0878D9]',
  },
  {
    label: 'Resolved',
    value: '142',
    change: '9.8%',
    positive: true,
    icon: CheckCircle2,
    iconClass: 'bg-[#E7F9F8] text-[#0BB3B0]',
  },
  {
    label: 'Pending',
    value: '28',
    change: '5.2%',
    positive: false,
    icon: Clock3,
    iconClass: 'bg-[#FFF3E5] text-[#FF8A00]',
  },
  {
    label: 'Closed',
    value: '124',
    change: '11.6%',
    positive: true,
    icon: CheckCircle2,
    iconClass: 'bg-[#F0EDFF] text-[#6F5BD3]',
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#17233F]">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-[#667085]">
            Overview of your customer support operations.
          </p>
        </div>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-xl border border-[#E4EAF2] bg-white px-4 text-sm font-medium text-[#17233F] shadow-sm transition hover:border-[#D5DEEA] hover:bg-[#F8FAFC]"
        >
          <CalendarDays className="h-4 w-4 text-[#475467]" />

          <span>May 12 - May 18, 2025</span>

          <ChevronDown className="h-4 w-4 text-[#667085]" />
        </button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          const isPositive =
            metric.label === 'Avg. Response Time' ||
            metric.label === 'High Priority'
              ? false
              : true;

          return (
            <div
              key={metric.label}
              className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(23,35,63,0.07)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#475467]">
                    {metric.label}
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-tight text-[#17233F]">
                    {metric.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${metric.iconClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="flex items-center gap-1 text-xs font-medium">
                  {isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#45B83C]" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-[#EF4444]" />
                  )}

                  <span
                    className={
                      isPositive
                        ? 'text-[#45B83C]'
                        : 'text-[#EF4444]'
                    }
                  >
                    {metric.change}
                  </span>

                  <span className="ml-1 font-normal text-[#667085]">
                    from last week
                  </span>
                </p>

                <MiniChart className={metric.chartClass} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Ticket Activity */}
        <section className="rounded-2xl border border-[#E4EAF2] bg-white p-6 shadow-[0_2px_12px_rgba(23,35,63,0.04)] xl:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#17233F]">
                  Ticket Activity
                </h2>

                <p className="mt-1 text-sm text-[#667085]">
                  Recent support activity overview
                </p>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 self-start rounded-lg border border-[#E4EAF2] bg-white px-3 py-2 text-xs font-medium text-[#475467] hover:bg-[#F8FAFC]"
            >
              Last 7 days
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          <ActivityChart />

          {/* Activity Summary */}
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {activitySummary.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#E4EAF2] bg-white p-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconClass}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span className="text-xs font-medium text-[#475467]">
                      {item.label}
                    </span>
                  </div>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-lg font-semibold text-[#17233F]">
                      {item.value}
                    </span>

                    <span
                      className={`mb-0.5 text-[11px] font-medium ${
                        item.positive
                          ? 'text-[#45B83C]'
                          : 'text-[#EF4444]'
                      }`}
                    >
                      {item.positive ? '↑' : '↓'}{' '}
                      {item.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI Insights */}
        <section className="rounded-2xl border border-[#E4EAF2] bg-white p-6 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#17233F]">
                AI Insights
              </h2>

              <p className="mt-1 text-sm text-[#667085]">
                AI-generated operational insights
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Insight 1 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-[#E4EAF2] bg-white p-4 transition hover:border-[#D5DEEA] hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E7F9F8] text-[#0BB3B0]">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#17233F]">
                  Response time improved
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  AI-assisted responses reduced average
                  handling time this week.
                </p>
              </div>

              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#667085] transition group-hover:text-[#0878D9]" />
            </div>

            {/* Insight 2 */}
            <div className="group flex items-start gap-3 rounded-2xl border border-[#E4EAF2] bg-white p-4 transition hover:border-[#D5DEEA] hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E5] text-[#FF8A00]">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#17233F]">
                  Billing questions increased
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667085]">
                  Consider updating your billing knowledge
                  base articles.
                </p>
              </div>

              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#667085] transition group-hover:text-[#0878D9]" />
            </div>
          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#EAF4FF] px-4 py-3 text-sm font-semibold text-[#0878D9] transition hover:bg-[#D7EBFF]"
          >
            View all insights
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </section>
      </div>
    </div>
  );
}