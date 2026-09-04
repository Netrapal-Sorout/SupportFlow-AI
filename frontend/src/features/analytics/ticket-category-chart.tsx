import type { TicketCategoryData } from './analytics-types';

interface TicketCategoryChartProps {
  data: TicketCategoryData[];
}

export function TicketCategoryChart({
  data,
}: TicketCategoryChartProps) {
  return (
    <div className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div>
        <h2 className="text-sm font-semibold text-[#17233F]">
          Tickets by Category
        </h2>

        <p className="mt-1 text-xs text-[#667085]">
          Distribution of support requests
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {data.map((item) => (
          <div key={item.category}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-[#475467]">
                {item.category}
              </span>

              <span className="text-xs text-[#667085]">
                {item.tickets} · {item.percentage}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#E8EEF5]">
              <div
                className="h-full rounded-full bg-[#6F5BD3] transition-all duration-300"
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}