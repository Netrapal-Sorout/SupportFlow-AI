import { Building2, Save } from 'lucide-react';
import { useState } from 'react';

export function SettingsWorkspace() {
  const [workspaceName, setWorkspaceName] =
    useState('SupportFlow Workspace');

  const [supportEmail, setSupportEmail] = useState(
    'support@supportflow.ai',
  );

  const [timezone, setTimezone] =
    useState('Asia/Kolkata');

  return (
    <section className="rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="border-b border-[#E4EAF2] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
            <Building2 size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#17233F]">
              Workspace
            </h2>

            <p className="mt-1 text-xs text-[#667085]">
              Configure your support workspace.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-[#475467]">
            Workspace Name
          </label>

          <input
            value={workspaceName}
            onChange={(event) =>
              setWorkspaceName(event.target.value)
            }
            className="w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] px-4 py-3 text-sm text-[#17233F] outline-none placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#475467]">
            Support Email
          </label>

          <input
            type="email"
            value={supportEmail}
            onChange={(event) =>
              setSupportEmail(event.target.value)
            }
            className="w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] px-4 py-3 text-sm text-[#17233F] outline-none placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#475467]">
            Timezone
          </label>

          <select
            value={timezone}
            onChange={(event) =>
              setTimezone(event.target.value)
            }
            className="w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] px-4 py-3 text-sm text-[#475467] outline-none focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
          >
            <option value="Asia/Kolkata">
              Asia/Kolkata
            </option>

            <option value="America/New_York">
              America/New_York
            </option>

            <option value="Europe/London">
              Europe/London
            </option>
          </select>
        </div>

        <button
          type="button"
          onClick={() =>
            console.log({
              workspaceName,
              supportEmail,
              timezone,
            })
          }
          className="flex items-center gap-2 rounded-xl bg-[#0878D9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#066BC2]"
        >
          <Save size={16} />
          Save Workspace
        </button>
      </div>
    </section>
  );
}