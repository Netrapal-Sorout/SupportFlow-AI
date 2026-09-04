import type { TicketVolumeData } from './analytics-types';

interface TicketVolumeChartProps {
  data: TicketVolumeData[];
}

export function TicketVolumeChart({
  data,
}: TicketVolumeChartProps) {
  const maxTickets = Math.max(
    ...data.map((item) => item.tickets),
  );

  return (
    <div className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[#17233F]">
            Ticket Volume
          </h2>

          <p className="mt-1 text-xs text-[#667085]">
            Number of tickets received over time
          </p>
        </div>

        <select
          className="rounded-lg border border-[#E4EAF2] bg-[#F8FAFC] px-3 py-2 text-xs text-[#475467] outline-none focus:border-[#0878D9] focus:ring-2 focus:ring-[#0878D9]/10"
          defaultValue="7"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="mt-8">
        <div className="flex h-64 items-end gap-3">
          {data.map((item) => {
            const height =
              (item.tickets / maxTickets) * 100;

            return (
              <div
                key={item.label}
                className="group flex h-full flex-1 flex-col justify-end"
              >
                <div className="relative flex h-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-[#0878D9] transition-all duration-200 group-hover:bg-[#066BC2]"
                    style={{
                      height: `${height}%`,
                    }}
                  >
                    <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#17233F] px-2 py-1 text-xs text-white shadow-sm group-hover:block">
                      {item.tickets}
                    </span>
                  </div>
                </div>

                <span className="mt-3 text-center text-[11px] font-medium text-[#667085]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}