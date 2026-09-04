import {
  Bell,
  ChevronDown,
  Search,
} from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-[92px] shrink-0 items-center justify-between border-b border-[#E4EAF2] bg-white px-6 lg:px-8">
      {/* Search */}
      <div className="relative w-full max-w-[555px]">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />

        <input
          type="search"
          placeholder="Search tickets, customers..."
          className="h-12 w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] pl-12 pr-4 text-sm text-[#17233F] outline-none placeholder:text-[#667085] transition focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
        />
      </div>

      {/* Right side */}
      <div className="ml-6 flex items-center">
        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl text-[#475467] transition hover:bg-[#F1F5F9]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-[#0878D9]" />
        </button>

        <div className="mx-4 h-8 w-px bg-[#E4EAF2]" />

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-[#F8FAFC]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0BB3B0] text-sm font-semibold text-white">
            SA
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-[#17233F]">
              Support Agent
            </p>

            <p className="text-xs text-[#667085]">
              Administrator
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-[#667085]" />
        </button>
      </div>
    </header>
  );
}