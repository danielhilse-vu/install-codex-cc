"use client";

import { useState } from "react";

type Env = "terminal" | "claude";

const ENV_CONFIG: Record<Env, { label: string; labelColor: string; bg: string; border: string }> = {
  terminal: {
    label: "Terminal",
    labelColor: "text-neutral-400",
    bg: "bg-neutral-100 dark:bg-neutral-950",
    border: "border-neutral-200 dark:border-neutral-800",
  },
  claude: {
    label: "Claude Code",
    labelColor: "text-violet-500 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/20",
    border: "border-violet-200 dark:border-violet-900",
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
      {/* Bar */}
      <div className={`flex items-center justify-between px-3 py-1.5 border-b ${cfg.border} ${cfg.bg}`}>
        <span className={`text-xs font-mono font-medium ${cfg.labelColor}`}>
          {cfg.label}
        </span>
        <button
          onClick={copy}
          aria-label="Copy to clipboard"
          className="text-xs font-mono text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors select-none"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {/* Code */}
      <pre className={`px-4 py-3 text-sm font-mono text-neutral-800 dark:text-neutral-200 overflow-x-auto whitespace-pre ${cfg.bg}`}>
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
      <code className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
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
