import {
  Bot,
  ChevronRight,
  Grid2X2,
  HelpCircle,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  X,
} from 'lucide-react';

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useEffect, useState } from 'react';

const CLIENT_ACCESS_TOKEN_KEY =
  'supportflow_client_access_token';

const navigationItems = [
  {
    label: 'Overview',
    icon: Grid2X2,
    to: '/portal',
    end: true,
  },
  {
    label: 'My Tickets',
    icon: MessageSquare,
    to: '/portal/tickets',
    end: false,
  },
  {
    label: 'Help Center',
    icon: HelpCircle,
    to: '/portal/help-center',
    end: false,
  },
  {
    label: 'AI Support',
    icon: Bot,
    to: '/portal/ai-support',
    end: false,
  },
];

function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return 'CU';
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`
    .toUpperCase();
}

export function ClientShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  /*
   * Customer information.
   * This can later be supplied directly by
   * /api/client-auth/me.
   */
  const clientName =
    'Netrapal Sorout';

  const clientEmail =
    'netrapalsorout@gmail.com';

  const initials =
    getInitials(clientName);

  /*
   * ---------------------------------------------------------
   * SIGN OUT
   * Existing authentication logic preserved.
   * ---------------------------------------------------------
   */
  function handleSignOut() {
    localStorage.removeItem(
      CLIENT_ACCESS_TOKEN_KEY,
    );

    setIsMobileMenuOpen(false);

    navigate('/', {
      replace: true,
    });
  }

  /*
   * ---------------------------------------------------------
   * MOBILE MENU
   * ---------------------------------------------------------
   */
  function openMobileMenu() {
    setIsMobileMenuOpen(true);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  /*
   * Close the drawer whenever the route changes.
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  /*
   * Prevent the page behind the drawer from scrolling.
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

  return (
    <div className="flex h-screen w-full min-w-0 overflow-hidden bg-[#F5F7FA] text-[#17233F]">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden h-screen w-[270px] shrink-0 flex-col border-r border-[#E1E7EF] bg-white lg:flex">

        {/* ---------------------------------------------------
            BRAND
        --------------------------------------------------- */}

        <div className="flex h-[88px] shrink-0 items-center border-b border-[#E8EDF3] px-7">

          <div>

            <div className="text-[19px] font-bold tracking-[-0.02em] text-[#17233F]">
              SupportFlow AI
            </div>

            <div className="mt-0.5 text-[15px] font-medium text-[#956800]">
              Client Portal
            </div>

          </div>

        </div>


        {/* ---------------------------------------------------
            DESKTOP NAVIGATION
        --------------------------------------------------- */}

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-7">

          <nav className="space-y-1.5">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'group flex h-[44px] w-full items-center gap-3 rounded-xl px-3.5 text-[15px] font-medium transition-colors',
                      isActive
                        ? 'bg-[#EAF4FF] text-[#0878D9]'
                        : 'text-[#596579] hover:bg-[#F7F9FC] hover:text-[#17233F]',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={[
                          'h-[18px] w-[18px] shrink-0',
                          isActive
                            ? 'text-[#0878D9]'
                            : 'text-[#788496]',
                        ].join(' ')}
                      />

                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>

                      {isActive && (
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

          </nav>


          {/* -------------------------------------------------
              CREATE TICKET
          ------------------------------------------------- */}

          <button
            type="button"
            onClick={() =>
              navigate(
                '/portal/tickets/new',
              )
            }
            className="mt-8 flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-4 text-[13px] font-semibold text-white shadow-[0_5px_16px_rgba(8,120,217,0.20)] transition-colors hover:bg-[#066BC2]"
          >
            <Plus className="h-[17px] w-[17px]" />

            Create Ticket
          </button>

        </div>


        {/* ---------------------------------------------------
            DESKTOP CUSTOMER ACCOUNT
        --------------------------------------------------- */}

        <div className="shrink-0 border-t border-[#E8EDF3] bg-white px-5 pt-5 pb-[10px]">

          <div className="mb-2 rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-2.5">

            <div className="flex items-center gap-2.5">

              {/* Avatar */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0878D9] text-[13px] font-bold text-white">
                {initials}
              </div>

              {/* Customer information */}

              <div className="min-w-0 flex-1">

                <p className="truncate text-[13px] font-semibold text-[#17233F]">
                  {clientName}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-[#8A95A5]">
                  {clientEmail}
                </p>

              </div>

            </div>

          </div>


          {/* Sign out */}

          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#DCE5EF] bg-white px-4 text-[13px] font-medium text-[#475467] transition-colors hover:bg-[#F8FAFC] hover:text-[#D92D20]"
          >
            <LogOut className="h-4 w-4" />

            <span>Log out</span>
          </button>

        </div>

      </aside>


      {/* =====================================================
          MOBILE DRAWER BACKDROP
      ===================================================== */}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#17233F]/30 backdrop-blur-[2px] lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}


      {/* =====================================================
          MOBILE NAVIGATION DRAWER
      ===================================================== */}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-[60] flex w-[290px] max-w-[86vw] flex-col',
          'border-r border-[#E1E7EF] bg-white',
          'shadow-[10px_0_35px_rgba(23,35,63,0.12)]',
          'transition-transform duration-200 ease-out lg:hidden',
          isMobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full',
        ].join(' ')}
      >

        {/* ---------------------------------------------------
            MOBILE DRAWER HEADER
        --------------------------------------------------- */}

        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#E8EDF3] px-5">

          <div>

            <div className="text-[18px] font-bold tracking-[-0.02em] text-[#17233F]">
              SupportFlow AI
            </div>

            <div className="mt-0.5 text-[11px] font-semibold tracking-[0.08em] text-[#956800]">
              Client Portal
            </div>

          </div>


          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E1E7EF] bg-white text-[#667085] transition-colors hover:bg-[#F8FAFC] hover:text-[#17233F]"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>

        </div>


        {/* ---------------------------------------------------
            MOBILE NAVIGATION
        --------------------------------------------------- */}

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">

          <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
            Navigation
          </div>

          <nav className="space-y-1">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      'group flex h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition-colors',
                      isActive
                        ? 'bg-[#EAF4FF] text-[#0878D9]'
                        : 'text-[#596579] hover:bg-[#F7F9FC] hover:text-[#17233F]',
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
                            : 'text-[#788496]',
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

          </nav>


          {/* -------------------------------------------------
              MOBILE CREATE TICKET
          ------------------------------------------------- */}

          <button
            type="button"
            onClick={() => {
              closeMobileMenu();

              navigate(
                '/portal/tickets/new',
              );
            }}
            className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0878D9] px-4 text-[12px] font-semibold text-white shadow-[0_5px_16px_rgba(8,120,217,0.18)] transition-colors hover:bg-[#066BC2]"
          >
            <Plus className="h-4 w-4" />

            Create Ticket
          </button>

        </div>


        {/* ---------------------------------------------------
            MOBILE CUSTOMER ACCOUNT
        --------------------------------------------------- */}

        <div className="shrink-0 border-t border-[#E8EDF3] bg-white px-4 pt-4 pb-4">

          <div className="mb-2.5 rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] p-3">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0878D9] text-[13px] font-bold text-white">
                {initials}
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-[13px] font-semibold text-[#17233F]">
                  {clientName}
                </p>

                <p className="truncate text-[11px] text-[#667085]">
                  {clientEmail}
                </p>

              </div>

            </div>

          </div>


          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#DCE5EF] bg-white text-[12px] font-medium text-[#475467] transition-colors hover:bg-[#F8FAFC] hover:text-[#D92D20]"
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
            MOBILE HEADER
        =================================================== */}

        <header className="flex h-[64px] shrink-0 items-center justify-between border-b border-[#E1E7EF] bg-white px-3.5 lg:hidden">

          <div className="flex min-w-0 items-center gap-2.5">

            <button
              type="button"
              onClick={openMobileMenu}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DCE5EF] bg-white text-[#475467] transition-colors hover:bg-[#F8FAFC]"
              aria-label="Open navigation"
              aria-expanded={
                isMobileMenuOpen
              }
            >
              <Menu className="h-4 w-4" />
            </button>


            <div className="min-w-0">

              <div className="truncate text-[16px] font-bold tracking-[-0.01em] text-[#17233F]">
                SupportFlow AI
              </div>

              <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#956800]">
                Client Portal
              </div>

            </div>

          </div>


          {/* Mobile account avatar */}

          <button
            type="button"
            onClick={openMobileMenu}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-[11px] font-bold text-[#0878D9]"
            aria-label="Open account menu"
          >
            {initials}
          </button>

        </header>


        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-[#F5F7FA]">

          <div className="min-h-full w-full min-w-0 pt-0 lg:pt-0">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}