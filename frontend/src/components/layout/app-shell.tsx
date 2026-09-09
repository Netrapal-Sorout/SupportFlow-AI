import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Ticket,
  Users,
} from 'lucide-react';

import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import { removeAccessToken } from '../../features/auth/auth.storage';

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Tickets',
    path: '/tickets',
    icon: Ticket,
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: Users,
  },
  {
    label: 'Knowledge Base',
    path: '/knowledge-base',
    icon: BookOpen,
  },
  {
    label: 'AI Assistant',
    path: '/ai-assistant',
    icon: Bot,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

export function AppShell() {
  const navigate = useNavigate();

  function handleLogout(): void {
    removeAccessToken();

    navigate('/login', {
      replace: true,
    });
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className="fixed inset-y-0 left-0 z-30 flex w-[232px] flex-col border-r border-slate-200 bg-white"
      >
        {/* Brand */}
        <div className="flex h-[72px] shrink-0 items-center border-b border-slate-200 px-6">
          <div>
            <h1 className="text-[17px] font-bold tracking-tight text-slate-900">
              SupportFlow
            </h1>

            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
              AI Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'group flex min-h-[42px] w-full items-center gap-3 rounded-lg px-3',
                      'text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className={
                          isActive
                            ? 'shrink-0 text-blue-600'
                            : 'shrink-0 text-slate-400 group-hover:text-slate-600'
                        }
                      />

                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>

                      {isActive && (
                        <ChevronRight
                          size={15}
                          strokeWidth={2}
                          className="shrink-0 text-blue-500"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-slate-200 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 transition-all duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut
              size={17}
              strokeWidth={1.9}
              className="transition-transform duration-150 group-hover:-translate-x-0.5"
            />

            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          APPLICATION AREA
      ====================================================== */}
      <div className="ml-[232px] flex min-h-screen min-w-0 flex-1 flex-col">

        {/* ===================================================
            TOP HEADER
        ==================================================== */}
        <header className="sticky top-0 z-20 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-7">

          {/* Search */}
          <div className="relative w-full max-w-[490px]">
            <Search
              size={18}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              placeholder="Search tickets, customers..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Header Actions */}
          <div className="ml-6 flex shrink-0 items-center">

            {/* Notifications */}
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <Bell
                size={19}
                strokeWidth={1.8}
              />

              <span
                className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"
                aria-hidden="true"
              />
            </button>

            {/* Divider */}
            <div className="mx-3 h-7 w-px bg-slate-200" />

            {/* User */}
            <button
              type="button"
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                SA
              </div>

              <div className="hidden min-w-0 lg:block">
                <p className="max-w-[130px] truncate text-sm font-semibold leading-5 text-slate-800">
                  Support Agent
                </p>

                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className="text-slate-400"
              />
            </button>
          </div>
        </header>

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
