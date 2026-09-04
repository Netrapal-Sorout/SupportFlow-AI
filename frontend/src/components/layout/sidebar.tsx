import {
  BarChart3,
  BookOpen,
  Bot,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Tickets',
    path: '/tickets',
    icon: MessageSquare,
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

export function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-[#E4EAF2] bg-white transition-all duration-200 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand */}
      <div className="flex h-[92px] items-center border-b border-[#E4EAF2] px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0878D9] text-lg font-bold text-white shadow-sm">
            SF
          </div>

          {!collapsed && (
            <div>
              <p className="text-[17px] font-semibold tracking-tight text-[#17233F]">
                SupportFlow
              </p>

              <p className="text-xs text-[#667085]">
                AI Platform
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  'group flex h-11 items-center rounded-xl px-3 text-sm font-medium transition-all',
                  collapsed
                    ? 'justify-center'
                    : 'gap-3',
                  isActive
                    ? 'bg-[#0878D9] text-white shadow-sm'
                    : 'text-[#475467] hover:bg-[#F1F5F9] hover:text-[#17233F]',
                ].join(' ')
              }
            >
              <Icon className="h-[19px] w-[19px] shrink-0" />

              {!collapsed && (
                <span>{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse */}
      <div className="border-t border-[#E4EAF2] p-4">
        <button
          type="button"
          onClick={onToggle}
          className={`flex h-10 w-full items-center rounded-xl text-sm font-medium text-[#475467] transition hover:bg-[#F1F5F9] hover:text-[#17233F] ${
            collapsed
              ? 'justify-center'
              : 'gap-3 px-3'
          }`}
          aria-label={
            collapsed
              ? 'Expand sidebar'
              : 'Collapse sidebar'
          }
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4EAF2] bg-[#F8FAFC]">
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </div>

          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}