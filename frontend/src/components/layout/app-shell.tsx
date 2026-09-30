import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react';

import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import {
  useEffect,
  useState,
} from 'react';

import {
  getCurrentUser,
} from '../../features/auth/auth.api';

import {
  getAccessToken,
  removeAccessToken,
} from '../../features/auth/auth.storage';

const navigation = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Tickets',
    path: '/admin/tickets',
    icon: MessageSquare,
  },
  {
    label: 'Customers',
    path: '/admin/customers',
    icon: Users,
  },
  {
    label: 'Knowledge Base',
    path: '/admin/knowledge-base',
    icon: BookOpen,
  },
  {
    label: 'AI Assistant',
    path: '/admin/ai-assistant',
    icon: Bot,
  },
  {
    label: 'Analytics',
    path: '/admin/analytics',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: Settings,
  },
];

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function AppShell() {
  const navigate = useNavigate();

  const [adminUser, setAdminUser] =
    useState<AdminUser | null>(null);

  const [isLoadingUser, setIsLoadingUser] =
    useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadAdminUser() {
      const token = getAccessToken();

      if (!token) {
        if (isMounted) {
          setIsLoadingUser(false);
        }

        return;
      }

      try {
        const user =
          await getCurrentUser(token);

        if (isMounted) {
          setAdminUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          });
        }
      } catch (error) {
        console.error(
          'Unable to load admin profile:',
          error,
        );
      } finally {
        if (isMounted) {
          setIsLoadingUser(false);
        }
      }
    }

    void loadAdminUser();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * Close mobile navigation whenever
   * the route changes through navigation.
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  /*
   * Prevent body scrolling while the
   * mobile drawer is open.
   */
  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = '';

      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  function handleLogout() {
    removeAccessToken();

    setIsMobileMenuOpen(false);

    navigate('/admin/login', {
      replace: true,
    });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  const displayName =
    adminUser?.name?.trim() || 'Admin';

  const displayEmail =
    adminUser?.email?.trim() || '';

  const displayRole =
    adminUser?.role === 'ADMIN'
      ? 'Administrator'
      : adminUser?.role === 'SUPPORT_AGENT'
        ? 'Support Agent'
        : adminUser?.role || 'Admin';

  const initials =
    displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) =>
        part.charAt(0).toUpperCase(),
      )
      .join('') || 'AD';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F7F9FC] text-[#17233F]">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden h-screen w-[270px] shrink-0 flex-col border-r border-[#E1E7EF] bg-white lg:flex">

        {/* Brand */}

        <div className="flex h-[76px] shrink-0 flex-col justify-center border-b border-[#E8EDF3] px-7">

          <div className="text-[19px] font-bold tracking-[-0.02em] text-[#17233F]">
            SupportFlow AI
          </div>

          <div className="mt-1 text-[15px] font-medium tracking-[0.08em] text-[#956800]">
            Admin Portal
          </div>

        </div>

        {/* Navigation */}

        <nav className="min-h-0 flex-1 overflow-y-auto px-2.5 py-7">

          <div className="space-y-1">

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'group flex h-12 items-center gap-2.5 rounded-lg px-2.5',
                      'text-[15px] font-medium',
                      'transition-colors duration-150',
                      'outline-none',
                      isActive
                        ? 'bg-[#EAF4FF] text-[#0878D9]'
                        : 'text-[#475467] hover:bg-[#F8FAFC] hover:text-[#17233F]',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={[
                          'h-3.5 w-3.5 shrink-0',
                          isActive
                            ? 'text-[#0878D9]'
                            : 'text-[#667085]',
                        ].join(' ')}
                        strokeWidth={1.8}
                      />

                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>

                      <ChevronRight
                        className={[
                          'h-3 w-3 shrink-0 transition-opacity duration-150',
                          isActive
                            ? 'opacity-100 text-[#0878D9]'
                            : 'opacity-0 group-hover:opacity-50',
                        ].join(' ')}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* Admin User */}

        <div className="shrink-0 border-t border-[#E8EDF3] px-5 pt-5 pb-[10px]">

          <div className="mb-2 rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-2.5">

            <div className="flex items-center gap-2.5">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0878D9] text-[12px] font-bold text-white">
                {isLoadingUser
                  ? '...'
                  : initials}
              </div>

              <div className="min-w-0 flex-1">

                <div className="truncate text-[15px] font-semibold text-[#17233F]">
                  {isLoadingUser
                    ? 'Loading...'
                    : displayName}
                </div>

                <div className="mt-0.5 truncate text-[12px] text-[#667085]">
                  {isLoadingUser
                    ? ''
                    : displayEmail}
                </div>

              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#DDE4EC] bg-white text-[11px] font-medium text-[#475467] transition-colors duration-150 hover:bg-[#F8FAFC] hover:text-[#D92D20]"
          >
            <LogOut className="h-3.5 w-3.5" />

            Log out
          </button>

        </div>

      </aside>


      {/* =====================================================
          MOBILE DRAWER OVERLAY
      ===================================================== */}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#17233F]/30 backdrop-blur-[2px] lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}


      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-[60] flex w-[290px] max-w-[85vw] flex-col',
          'border-r border-[#E1E7EF] bg-white shadow-[10px_0_35px_rgba(23,35,63,0.12)]',
          'transition-transform duration-200 ease-out lg:hidden',
          isMobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full',
        ].join(' ')}
      >

        {/* Mobile Brand */}

        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#E8EDF3] px-5">

          <div>

            <div className="text-[18px] font-bold tracking-[-0.02em] text-[#17233F]">
              SupportFlow AI
            </div>

            <div className="mt-0.5 text-[12px] font-semibold tracking-[0.08em] text-[#956800]">
              Admin Portal
            </div>

          </div>

          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E1E7EF] bg-white text-[#667085] transition hover:bg-[#F8FAFC] hover:text-[#17233F]"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>

        </div>


        {/* Mobile Navigation */}

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">

          <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
            Navigation
          </div>

          <div className="space-y-1">

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      'group flex h-11 items-center gap-3 rounded-xl px-3',
                      'text-[13px] font-medium',
                      'transition-colors duration-150',
                      isActive
                        ? 'bg-[#EAF4FF] text-[#0878D9]'
                        : 'text-[#475467] hover:bg-[#F8FAFC] hover:text-[#17233F]',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={[
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          isActive
                            ? 'bg-white text-[#0878D9]'
                            : 'text-[#667085]',
                        ].join(' ')}
                      >
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={1.8}
                        />
                      </span>

                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>

                      <ChevronRight
                        className={[
                          'h-3.5 w-3.5 shrink-0',
                          isActive
                            ? 'text-[#0878D9]'
                            : 'text-[#B0B8C4]',
                        ].join(' ')}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}

          </div>

        </nav>


        {/* Mobile User */}

        <div className="shrink-0 border-t border-[#E8EDF3] px-4 pt-4 pb-4">

          <div className="mb-2.5 rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-3">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0878D9] text-[12px] font-bold text-white">
                {isLoadingUser
                  ? '...'
                  : initials}
              </div>

              <div className="min-w-0 flex-1">

                <div className="truncate text-[13px] font-semibold text-[#17233F]">
                  {isLoadingUser
                    ? 'Loading...'
                    : displayName}
                </div>

                <div className="truncate text-[11px] text-[#667085]">
                  {isLoadingUser
                    ? ''
                    : displayEmail}
                </div>

              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#DDE4EC] bg-white text-[12px] font-medium text-[#475467] transition-colors hover:bg-[#F8FAFC] hover:text-[#D92D20]"
          >
            <LogOut className="h-4 w-4" />

            Log out
          </button>

        </div>

      </aside>


      {/* =====================================================
          APPLICATION AREA
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">


        {/* ===================================================
            DESKTOP HEADER
        =================================================== */}

        <header className="hidden h-[76px] shrink-0 items-center justify-between border-b border-[#E1E7EF] bg-white px-5 lg:flex">

          <div className="relative w-full max-w-[405px]">

            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              placeholder="Search tickets, customers..."
              className="h-8 w-full rounded-lg border border-[#DCE3EB] bg-[#FBFCFE] pl-9 pr-3 text-[11px] text-[#17233F] outline-none transition-colors duration-150 placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:bg-white"
            />

          </div>

          <button
            type="button"
            className="ml-4 flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE3EB] bg-white text-[#667085] hover:bg-[#F8FAFC]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

        </header>


        {/* ===================================================
            MOBILE HEADER
        =================================================== */}

        <header className="flex h-[64px] shrink-0 items-center justify-between border-b border-[#E1E7EF] bg-white px-3.5 lg:hidden">

          <div className="flex min-w-0 items-center gap-2.5">

            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DCE3EB] bg-white text-[#475467] transition hover:bg-[#F8FAFC]"
              aria-label="Open navigation"
              aria-expanded={
                isMobileMenuOpen
              }
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="min-w-0">

              <div className="truncate text-[15px] font-bold tracking-[-0.01em] text-[#17233F]">
                SupportFlow AI
              </div>

              <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#956800]">
                Admin Portal
              </div>

            </div>

          </div>

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DCE3EB] bg-white text-[#667085] hover:bg-[#F8FAFC]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

        </header>


        {/* ===================================================
            MOBILE SEARCH
        =================================================== */}

        <div className="border-b border-[#E8EDF3] bg-white px-3.5 py-2.5 lg:hidden">

          <div className="relative">

            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              placeholder="Search tickets, customers..."
              className="h-9 w-full rounded-lg border border-[#DCE3EB] bg-[#FBFCFE] pl-9 pr-3 text-[11px] text-[#17233F] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:bg-white"
            />

          </div>

        </div>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <main className="admin-content-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-[#F7F9FC]">

          <div className="admin-route-container w-full min-w-0">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}