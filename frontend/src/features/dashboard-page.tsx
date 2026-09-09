import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
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
    title: 'Open Tickets',
    value: '128',
    change: '12.5%',
    description: 'from last week',
    positive: true,
    icon: MessageSquare,
    iconClass: 'bg-blue-50 text-blue-600',
    chartClass: 'text-blue-600',
  },
  {
    title: 'Avg. Response Time',
    value: '4m 32s',
    change: '18.2%',
    description: 'from last week',
    positive: false,
    icon: Clock3,
    iconClass: 'bg-cyan-50 text-cyan-600',
    chartClass: 'text-cyan-500',
  },
  {
    title: 'AI Resolution Rate',
    value: '72.4%',
    change: '8.7%',
    description: 'from last week',
    positive: true,
    icon: TrendingUp,
    iconClass: 'bg-green-50 text-green-600',
    chartClass: 'text-green-500',
  },
  {
    title: 'High Priority',
    value: '14',
    change: '3',
    description: 'from last week',
    positive: false,
    icon: AlertCircle,
    iconClass: 'bg-orange-50 text-orange-500',
    chartClass: 'text-orange-500',
  },
];

const activityStats = [
  {
    label: 'New Tickets',
    value: '156',
    change: '14.3%',
    positive: true,
    icon: MessageSquare,
    iconClass: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Resolved',
    value: '142',
    change: '9.8%',
    positive: true,
    icon: CheckCircle2,
    iconClass: 'bg-cyan-50 text-cyan-600',
  },
  {
    label: 'Pending',
    value: '28',
    change: '5.2%',
    positive: false,
    icon: Clock3,
    iconClass: 'bg-orange-50 text-orange-500',
  },
  {
    label: 'Closed',
    value: '124',
    change: '11.6%',
    positive: true,
    icon: CheckCircle2,
    iconClass: 'bg-violet-50 text-violet-600',
  },
];

const chartPoints = [
  { x: 0, y: 145 },
  { x: 125, y: 72 },
  { x: 250, y: 150 },
  { x: 375, y: 103 },
  { x: 500, y: 170 },
  { x: 625, y: 94 },
  { x: 750, y: 122 },
];

const chartLine = chartPoints
  .map((point) => `${point.x},${point.y}`)
  .join(' ');

const chartArea = `0,180 ${chartLine} 750,180`;

export function DashboardPage() {
  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] px-7 py-7">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-6 flex items-center justify-between gap-6">
          <div>
            <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
              Dashboard
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Overview of your customer support operations.
            </p>
          </div>

          <button
            type="button"
            className="flex h-10 shrink-0 items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <CalendarDays
              size={16}
              className="text-slate-500"
            />

            <span>May 12 - May 18, 2025</span>

            <ChevronDown
              size={15}
              className="text-slate-400"
            />
          </button>
        </div>

        {/* =====================================================
            KPI CARDS
        ====================================================== */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.title}
                className="min-h-[148px] rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition duration-200 hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-slate-600">
                      {metric.title}
                    </p>

                    <p className="mt-2 text-[24px] font-semibold leading-none tracking-tight text-slate-900">
                      {metric.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${metric.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-7 flex items-end justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-1.5 text-[11px]">
                    {metric.positive ? (
                      <ArrowUpRight
                        size={13}
                        className="shrink-0 text-green-500"
                      />
                    ) : (
                      <ArrowDownRight
                        size={13}
                        className="shrink-0 text-red-500"
                      />
                    )}

                    <span
                      className={
                        metric.positive
                          ? 'font-medium text-green-600'
                          : 'font-medium text-red-500'
                      }
                    >
                      {metric.change}
                    </span>

                    <span className="truncate text-slate-400">
                      {metric.description}
                    </span>
                  </div>

                  <svg
                    width="76"
                    height="28"
                    viewBox="0 0 76 28"
                    fill="none"
                    className={`shrink-0 ${metric.chartClass}`}
                    aria-hidden="true"
                  >
                    <path
                      d="M1 23C8 22 10 17 16 18C22 19 23 13 29 14C35 15 37 9 43 11C49 13 52 5 58 8C64 11 67 3 75 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </article>
            );
          })}
        </section>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(360px,0.9fr)]">
          {/* ===================================================
              TICKET ACTIVITY
          ==================================================== */}
          <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BarChart3 size={19} />
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-slate-900">
                    Ticket Activity
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Recent support activity overview
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Last 7 days
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Chart */}
            <div className="mt-5">
              <div className="relative h-[270px]">
                {/* Grid */}
                <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pl-8">
                  {[100, 80, 60, 40, 20, 0].map((value) => (
                    <div
                      key={value}
                      className="flex items-center gap-3"
                    >
                      <span className="absolute left-0 w-6 text-right text-[10px] text-slate-400">
                        {value}
                      </span>

                      <div className="h-px flex-1 border-t border-dashed border-slate-200" />
                    </div>
                  ))}
                </div>

                {/* SVG */}
                <svg
                  viewBox="0 0 750 180"
                  preserveAspectRatio="none"
                  className="absolute left-8 right-0 top-1 h-[225px] w-[calc(100%-32px)]"
                >
                  <defs>
                    <linearGradient
                      id="activityFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3B82F6"
                        stopOpacity="0.20"
                      />

                      <stop
                        offset="100%"
                        stopColor="#3B82F6"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <polygon
                    points={chartArea}
                    fill="url(#activityFill)"
                  />

                  <polyline
                    points={chartLine}
                    fill="none"
                    stroke="#0878D9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {chartPoints.map((point) => (
                    <circle
                      key={`${point.x}-${point.y}`}
                      cx={point.x}
                      cy={point.y}
                      r="5.5"
                      fill="#ffffff"
                      stroke="#0878D9"
                      strokeWidth="3"
                    />
                  ))}
                </svg>

                {/* Dates */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between">
                  {[
                    'May 12',
                    'May 13',
                    'May 14',
                    'May 15',
                    'May 16',
                    'May 17',
                    'May 18',
                  ].map((date) => (
                    <span
                      key={date}
                      className="text-[10px] text-slate-400"
                    >
                      {date}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {activityStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-slate-200 bg-slate-50/40 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${stat.iconClass}`}
                      >
                        <Icon size={15} />
                      </div>

                      <span className="text-[11px] font-medium text-slate-600">
                        {stat.label}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-[17px] font-semibold text-slate-900">
                        {stat.value}
                      </span>

                      <span
                        className={
                          stat.positive
                            ? 'text-[10px] font-medium text-green-600'
                            : 'text-[10px] font-medium text-red-500'
                        }
                      >
                        {stat.positive ? '↑' : '↓'} {stat.change}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          {/* ===================================================
              AI INSIGHTS
          ==================================================== */}
          <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Sparkles size={19} />
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-slate-900">
                  AI Insights
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  AI-generated operational insights
                </p>
              </div>
            </div>

            {/* Insights */}
            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <TrendingUp size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[13px] font-semibold text-slate-800">
                        Response time improved
                      </h4>

                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-slate-400"
                      />
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      AI-assisted responses reduced average handling time this week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <FileText size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[13px] font-semibold text-slate-800">
                        Billing questions increased
                      </h4>

                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-slate-400"
                      />
                    </div>

                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      Consider updating your billing knowledge base articles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-50 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
            >
              View all insights
              <ArrowUpRight size={14} />
            </button>
          </article>
        </section>
      </div>
    </div>
  );
}