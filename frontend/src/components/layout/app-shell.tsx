import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './header';
import { MainContent } from './main-content';
import { Sidebar } from './sidebar';

export function AppShell() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() =>
          setSidebarCollapsed((current) => !current)
        }
      />

      <div className="flex min-w-0 flex-1 flex-col bg-[#F8FAFC]">
        <Header />

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}