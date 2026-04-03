"use client";

import { useState } from "react";

type Env = "local" | "coder" | "claude";

const ENV_CONFIG: Record<
  Env,
  {
    label: string;
    labelColor: string;
    border: string;
    headerBg: string;
    codeBg: string;
    codeColor: string;
    prompt: string;
    promptColor: string;
  }
> = {
  local: {
    label: "Local terminal",
    labelColor: "text-neutral-400",
    border: "border-neutral-700/50",
    headerBg: "bg-[#1a1a1a]",
    codeBg: "bg-[#141414]",
    codeColor: "text-neutral-200/90",
    prompt: "$",
    promptColor: "text-neutral-500",
  },
  coder: {
    label: "Coder",
    labelColor: "text-amber-400",
    border: "border-amber-900/40",
    headerBg: "bg-[#1a1913]",
    codeBg: "bg-[#141410]",
    codeColor: "text-amber-50/90",
    prompt: "qs@coder:~$",
    promptColor: "text-amber-500",
  },
  claude: {
    label: "Claude Code",
    labelColor: "text-violet-400",
    border: "border-violet-900/50",
    headerBg: "bg-[#130f1e]",
    codeBg: "bg-[#0e0b18]",
    codeColor: "text-violet-50/90",
    prompt: ">",
    promptColor: "text-violet-500",
  },
};

export function CodeBlock({ code, env }: { code: string; env: Env }) {
  const [copied, setCopied] = useState(false);
  const cfg = ENV_CONFIG[env];

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className={`mt-3 rounded-lg border overflow-hidden ${cfg.border}`}>
      {/* Header bar */}
      <div
        className={`flex items-center justify-between px-3 py-1.5 border-b ${cfg.border} ${cfg.headerBg}`}
      >
        <span className={`text-xs font-mono font-semibold ${cfg.labelColor}`}>
          {cfg.label}
        </span>
        <button
          onClick={copy}
          aria-label="Copy to clipboard"
          className="text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors select-none"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {/* Code */}
      <pre
        className={`px-4 py-2.5 text-sm font-mono overflow-x-auto whitespace-pre ${cfg.codeBg} ${cfg.codeColor}`}
      >
        <span className={`select-none mr-2.5 font-bold ${cfg.promptColor}`}>
          {cfg.prompt}
        </span>
        {code}
      </pre>
    </div>
  );
}

export function InlineCommand({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <span className="inline-flex items-center gap-2 group">
      <code className="text-sm font-mono px-1.5 py-0.5 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 rounded">
        {code}
      </code>
      <button
        onClick={copy}
        aria-label="Copy to clipboard"
        className="text-xs font-mono text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors select-none"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}
