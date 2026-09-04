import {
  Bell,
  Bot,
  Building2,
  User,
} from 'lucide-react';
import { useState } from 'react';

import { SettingsAI } from './settings-ai';
import { SettingsNotifications } from './settings-notifications';
import { SettingsProfile } from './settings-profile';
import { SettingsWorkspace } from './settings-workspace';

type SettingsSection =
  | 'profile'
  | 'workspace'
  | 'notifications'
  | 'ai';

const sections = [
  {
    id: 'profile' as const,
    label: 'Profile',
    description: 'Personal account',
    icon: User,
  },
  {
    id: 'workspace' as const,
    label: 'Workspace',
    description: 'Company settings',
    icon: Building2,
  },
  {
    id: 'notifications' as const,
    label: 'Notifications',
    description: 'Alert preferences',
    icon: Bell,
  },
  {
    id: 'ai' as const,
    label: 'AI Configuration',
    description: 'AI behavior',
    icon: Bot,
  },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <SettingsProfile />;

      case 'workspace':
        return <SettingsWorkspace />;

      case 'notifications':
        return <SettingsNotifications />;

      case 'ai':
        return <SettingsAI />;

      default:
        return <SettingsProfile />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#17233F]">
          Settings
        </h1>

        <p className="mt-1 text-sm text-[#667085]">
          Manage your account, workspace, notifications,
          and AI configuration.
        </p>
      </div>

      {/* Settings Layout */}
      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Navigation */}
        <aside className="h-fit rounded-2xl border border-[#E4EAF2] bg-white p-2 shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
          {sections.map((section) => {
            const Icon = section.icon;

            const active =
              activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  setActiveSection(section.id)
                }
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                  active
                    ? 'bg-[#EAF4FF] text-[#0878D9]'
                    : 'text-[#475467] hover:bg-[#F8FAFC] hover:text-[#17233F]'
                }`}
              >
                <Icon size={18} />

                <div>
                  <p className="text-sm font-medium">
                    {section.label}
                  </p>

                  <p
                    className={`mt-0.5 text-[11px] ${
                      active
                        ? 'text-[#5B8FC4]'
                        : 'text-[#98A2B3]'
                    }`}
                  >
                    {section.description}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <div>{renderSection()}</div>
      </div>
    </div>
  );
}