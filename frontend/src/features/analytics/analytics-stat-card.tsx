import {
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';

import type { ReactNode } from 'react';

interface AnalyticsStatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change: number;
  comparison: string;
}

export function AnalyticsStatCard({
  icon,
  label,
  value,
  change,
  comparison,
}: AnalyticsStatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)] transition hover:border-[#D5DFEA] hover:shadow-[0_6px_20px_rgba(23,35,63,0.07)]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            isPositive
              ? 'text-[#16A34A]'
              : 'text-[#EF4444]'
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {Math.abs(change)}%
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-[#667085]">
          {label}
        </p>

        <p className="mt-1 text-2xl font-bold text-[#17233F]">
          {value}
        </p>

        <p className="mt-2 text-xs text-[#98A2B3]">
          {comparison}
        </p>
      </div>
    </div>
  );
}