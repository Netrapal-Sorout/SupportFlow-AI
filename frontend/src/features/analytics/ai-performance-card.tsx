import {
  Brain,
  CheckCircle2,
  Clock3,
  Sparkles,
} from 'lucide-react';

import type { AIPerformanceData } from './analytics-types';

interface AIPerformanceCardProps {
  data: AIPerformanceData[];
}

const icons = [
  <Brain size={18} />,
  <CheckCircle2 size={18} />,
  <Sparkles size={18} />,
  <Clock3 size={18} />,
];

export function AIPerformanceCard({
  data,
}: AIPerformanceCardProps) {
  return (
    <div className="rounded-2xl border border-[#E4EAF2] bg-white p-5 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
          <Sparkles size={20} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#17233F]">
            AI Performance
          </h2>

          <p className="mt-1 text-xs text-[#667085]">
            AI impact across your support operation
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={item.metric}
            className="rounded-xl border border-[#E4EAF2] bg-[#FBFCFE] p-4 transition hover:border-[#D5DFEA] hover:shadow-sm"
          >
            <div className="flex items-center gap-2 text-[#6F5BD3]">
              {icons[index % icons.length]}

              <span className="text-xs font-medium text-[#667085]">
                {item.metric}
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-[#17233F]">
              {item.value}
            </p>

            <p className="mt-1 text-xs leading-5 text-[#667085]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}