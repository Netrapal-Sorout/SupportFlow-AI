import {
  Bot,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

export function SettingsAI() {
  const [aiEnabled, setAiEnabled] = useState(true);

  const [autoClassification, setAutoClassification] =
    useState(true);

  const [suggestedReplies, setSuggestedReplies] =
    useState(true);

  const [autoSummaries, setAutoSummaries] =
    useState(true);

  const [humanApprovalRequired, setHumanApprovalRequired] =
    useState(true);

  const [confidenceThreshold, setConfidenceThreshold] =
    useState(85);

  return (
    <section className="rounded-2xl border border-[#E4EAF2] bg-white shadow-[0_2px_12px_rgba(23,35,63,0.04)]">
      <div className="border-b border-[#E4EAF2] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#6F5BD3]">
            <Sparkles size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#17233F]">
              AI Configuration
            </h2>

            <p className="mt-1 text-xs text-[#667085]">
              Control how AI assists your support team.
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-[#E4EAF2] px-5">
        <SettingToggle
          icon={<Bot size={17} />}
          title="Enable AI Assistant"
          description="Allow support agents to use AI assistance."
          enabled={aiEnabled}
          onChange={setAiEnabled}
        />

        <SettingToggle
          title="Automatic Classification"
          description="Automatically classify ticket intent, category, and priority."
          enabled={autoClassification}
          onChange={setAutoClassification}
        />

        <SettingToggle
          title="Suggested Replies"
          description="Generate AI-powered response suggestions for agents."
          enabled={suggestedReplies}
          onChange={setSuggestedReplies}
        />

        <SettingToggle
          title="Conversation Summaries"
          description="Generate summaries of long customer conversations."
          enabled={autoSummaries}
          onChange={setAutoSummaries}
        />

        <SettingToggle
          icon={<ShieldCheck size={17} />}
          title="Human Approval Required"
          description="Require an agent to review AI responses before sending."
          enabled={humanApprovalRequired}
          onChange={setHumanApprovalRequired}
        />

        <div className="py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#17233F]">
                Confidence Threshold
              </p>

              <p className="mt-1 text-xs text-[#667085]">
                Minimum confidence required for AI recommendations.
              </p>
            </div>

            <span className="text-sm font-semibold text-[#6F5BD3]">
              {confidenceThreshold}%
            </span>
          </div>

          <input
            type="range"
            min="50"
            max="100"
            value={confidenceThreshold}
            onChange={(event) =>
              setConfidenceThreshold(
                Number(event.target.value),
              )
            }
            className="mt-4 w-full accent-[#6F5BD3]"
          />

          <div className="mt-2 flex justify-between text-[11px] text-[#98A2B3]">
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SettingToggleProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function SettingToggle({
  icon,
  title,
  description,
  enabled,
  onChange,
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 text-[#6F5BD3]">
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-[#17233F]">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-[#667085]">
            {description}
          </p>
        </div>
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