import {
  Bell,
  Mail,
  Ticket,
} from 'lucide-react';
import { useState } from 'react';

interface NotificationItemProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function NotificationItem({
  title,
  description,
  enabled,
  onChange,
}: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-[#17233F]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#667085]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? 'bg-[#0878D9]'
            : 'bg-[#D0D5DD]'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

export function SettingsNotifications() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [ticketAssignments, setTicketAssignments] =
    useState(true);

  const [ticketReplies, setTicketReplies] =
    useState(true);

  const [aiAlerts, setAiAlerts] = useState(true);

  const [weeklyReports, setWeeklyReports] =
    useState(false);

  return (
    <section className="rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="border-b border-[#E4EAF2] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
            <Bell size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#17233F]">
              Notifications
            </h2>

            <p className="mt-1 text-xs text-[#667085]">
              Choose which events should notify you.
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#E4EAF2] px-5">
        <NotificationItem
          title="Email Notifications"
          description="Receive important support updates by email."
          enabled={emailNotifications}
          onChange={setEmailNotifications}
        />

        <NotificationItem
          title="Ticket Assignments"
          description="Get notified when a ticket is assigned to you."
          enabled={ticketAssignments}
          onChange={setTicketAssignments}
        />

        <NotificationItem
          title="Ticket Replies"
          description="Get notified when customers reply to tickets."
          enabled={ticketReplies}
          onChange={setTicketReplies}
        />

        <NotificationItem
          title="AI Alerts"
          description="Receive alerts when AI requires human attention."
          enabled={aiAlerts}
          onChange={setAiAlerts}
        />

        <NotificationItem
          title="Weekly Reports"
          description="Receive a weekly support performance summary."
          enabled={weeklyReports}
          onChange={setWeeklyReports}
        />
      </div>
    </section>
  );
}