import { Save, User } from 'lucide-react';
import { useState } from 'react';

export function SettingsProfile() {
  const [name, setName] = useState('Support Agent');
  const [email, setEmail] = useState('agent@supportflow.ai');
  const [role, setRole] = useState('Support Agent');

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    console.log({
      name,
      email,
      role,
    });
  };

  return (
    <section className="rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="border-b border-[#E4EAF2] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0878D9]">
            <User size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#17233F]">
              Profile
            </h2>

            <p className="mt-1 text-xs text-[#667085]">
              Manage your personal account information.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-5"
      >
        <div>
          <label className="mb-2 block text-xs font-medium text-[#475467]">
            Full Name
          </label>

          <input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] px-4 py-3 text-sm text-[#17233F] outline-none placeholder:text-[#98A2B3] focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#475467]">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full rounded-xl border border-[#E4EAF2] bg-[#F8FAFC] px-4 py-3 text-sm text-[#17233F] outline-none focus:border-[#0878D9] focus:bg-white focus:ring-4 focus:ring-[#0878D9]/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#475467]">
            Role
          </label>

          <input
            value={role}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-[#E4EAF2] bg-[#F2F4F7] px-4 py-3 text-sm text-[#98A2B3]"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-[#0878D9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#066BC2]"
        >
          <Save size={16} />
          Save Changes
        </button>
      </form>
    </section>
  );
}