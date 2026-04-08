"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

type Mode = "terminal" | "vscode";

export function PluginInstallSteps() {
  const [mode, setMode] = useState<Mode>("terminal");

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-6">
      <div className="inline-flex gap-px bg-neutral-200 dark:bg-neutral-700/50 rounded-lg p-0.5">
        {(["terminal", "vscode"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === m
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            }`}
          >
            {m === "terminal"
              ? "Claude Code in the terminal"
              : "VS Code Extension"}
          </button>
        ))}
      </div>
      </div>

      {mode === "terminal" ? <TerminalPath /> : <VsCodePath />}
    </div>
  );
}

function TerminalPath() {
  return (
    <div className="space-y-7">
      <VsCodeStep label="A">
        Add the Codex marketplace to Claude Code.
        <CodeBlock env="claude" code="/plugin marketplace add openai/codex-plugin-cc" />
      </VsCodeStep>

      <VsCodeStep label="B">
        Install the plugin from the marketplace.
        <CodeBlock env="claude" code="/plugin install codex@openai-codex" />
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          <strong className="font-medium text-neutral-500 dark:text-neutral-400">Note (Coder workspaces):</strong>{" "}
          If Claude says it can&apos;t find <code className="font-mono text-[11px] px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">codex@openai-codex</code> in any marketplace, try{" "}
          <code className="font-mono text-[11px] px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">/plugin install codex</code> instead.
          This is likely because the marketplace wasn&apos;t added via the CLI and the UI flow already registered it differently.
        </p>
      </VsCodeStep>

      <VsCodeStep label="C">
        Reload plugins to activate it.
        <CodeBlock env="claude" code="/reload-plugins" />
      </VsCodeStep>

      <VsCodeStep label="D">
        Run the setup wizard.
        <CodeBlock env="claude" code="/codex:setup" />
      </VsCodeStep>
    </div>
  );
}

function VsCodePath() {
  return (
    <div className="space-y-7">
      <VsCodeStep label="A">
        In the Claude Code panel, type{" "}
        <code className="font-mono text-[12px] px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded">
          /plugin
        </code>{" "}
        and select{" "}
        <strong className="font-semibold text-neutral-700 dark:text-neutral-300">
          Manage plugins
        </strong>{" "}
        from the menu.
        <CommandMenuMockup />
      </VsCodeStep>

      <VsCodeStep label="B">
        In the dialog, click the{" "}
        <strong className="font-semibold text-neutral-700 dark:text-neutral-300">
          Marketplaces
        </strong>{" "}
        tab, paste the repo below, and click{" "}
        <strong className="font-semibold text-neutral-700 dark:text-neutral-300">
          Add
        </strong>
        .
        <ManagePluginsModal tab="marketplaces" />
      </VsCodeStep>

      <VsCodeStep label="C">
        Switch to the{" "}
        <strong className="font-semibold text-neutral-700 dark:text-neutral-300">
          Plugins
        </strong>{" "}
        tab, search{" "}
        <code className="font-mono text-[12px] px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded">
          codex
        </code>
        , then click{" "}
        <strong className="font-semibold text-neutral-700 dark:text-neutral-300">
          Install for you
        </strong>
        .
        <ManagePluginsModal tab="plugins" />
      </VsCodeStep>

      <VsCodeStep label="D">
        Restart the Claude Code extension to activate the plugin, then run the
        setup wizard:
        <CodeBlock env="claude" code="/codex:setup" />
      </VsCodeStep>
    </div>
  );
}

function VsCodeStep({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="font-mono text-[11px] font-semibold text-neutral-400 dark:text-neutral-600 shrink-0 mt-0.5 w-4 text-right">
        {label}
      </span>
      <div className="flex-1 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function CommandMenuMockup() {
  return (
    <div
      className="mt-3 rounded-xl overflow-hidden border border-neutral-700/50 select-none pointer-events-none text-sm"
      style={{ background: "#212121" }}
    >
      {/* Menu sections */}
      <div className="divide-y divide-neutral-700/40">
        {/* Customize */}
        <div className="pt-2.5 pb-1.5">
          <p className="px-4 pb-1.5 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Customize
          </p>
          <div className="px-2">
            <div
              className="px-3 py-2 rounded-md text-[13px] text-neutral-100 font-medium"
              style={{ background: "#3a3a3a" }}
            >
              Manage plugins
            </div>
          </div>
        </div>

        {/* Slash Commands */}
        <div className="py-1.5">
          <p className="px-4 py-1.5 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Slash Commands
          </p>
          {["/simplify", "/security-review", "/batch"].map((cmd) => (
            <div
              key={cmd}
              className="px-5 py-1.5 text-[13px] text-neutral-300"
            >
              {cmd}
            </div>
          ))}
        </div>

        {/* Context */}
        <div className="py-1.5">
          <p className="px-4 py-1.5 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            Context
          </p>
          <div className="px-5 py-1.5 text-[13px] text-neutral-300">
            Attach file…
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-2">
        <div
          className="rounded-lg border-2 overflow-hidden"
          style={{ borderColor: "#c05a2b", background: "#2a2a2a" }}
        >
          <div className="px-3 py-2.5 text-[13px] text-neutral-100 flex items-center gap-0.5">
            /plugin
            <span
              className="inline-block w-[2px] h-[14px] ml-0.5 align-middle"
              style={{ background: "#d0d0d0" }}
            />
          </div>
          <div
            className="flex items-center justify-between px-3 py-1.5 border-t border-neutral-700/50"
            style={{ background: "#252525" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 text-base leading-none">+</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded border border-neutral-600 text-neutral-400 text-[10px] font-bold">
                /
              </span>
              <span className="w-px h-3.5 bg-neutral-600 mx-1" />
              <span className="text-[11px] text-neutral-500">
                2 lines selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-neutral-500">
                Ask before edits
              </span>
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded text-white text-sm"
                style={{ background: "#c05a2b" }}
              >
                ↑
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManagePluginsModal({ tab }: { tab: "plugins" | "marketplaces" }) {
  return (
    <div
      className="mt-3 rounded-xl overflow-hidden border border-neutral-700/50 text-sm select-none pointer-events-none"
      style={{ background: "#212121" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-700/50"
        style={{ background: "#2a2a2a" }}
      >
        <span className="text-[13px] font-semibold text-neutral-200">
          Manage Plugins
        </span>
        <span className="text-neutral-500 text-base leading-none">×</span>
      </div>

      {/* Tabs */}
      <div
        className="flex px-4 gap-5 border-b border-neutral-700/50"
        style={{ background: "#2a2a2a" }}
      >
        {(["plugins", "marketplaces"] as const).map((t) => (
          <span
            key={t}
            className={`flex items-center gap-1.5 text-xs py-2 border-b-2 font-medium ${
              tab === t
                ? "border-neutral-200 text-neutral-200"
                : "border-transparent text-neutral-500"
            }`}
          >
            {t === "marketplaces" ? "Marketplaces" : "Plugins"}
            {t === "marketplaces" && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold leading-none">
                2
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Body */}
      <div className="p-4">
        {tab === "marketplaces" ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <div
                className="flex-1 px-3 py-1.5 text-xs font-mono rounded border-2 text-neutral-200"
                style={{ background: "#2a2a2a", borderColor: "#c05a2b" }}
              >
                openai/codex-plugin-cc
              </div>
              <div className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded">
                Add
              </div>
            </div>
            <div className="space-y-1.5 pt-1">
              {[
                { name: "claude-plugins-official", url: "anthropics/claude-plugins-official" },
                { name: "openai-codex", url: "openai/codex-plugin-cc" },
              ].map((entry) => (
                <div
                  key={entry.name}
                  className="px-3 py-2 rounded border border-neutral-700/60"
                  style={{ background: "#2a2a2a" }}
                >
                  <p className="text-[12px] font-medium text-neutral-200">{entry.name}</p>
                  <p className="text-[11px] text-neutral-500 font-mono">GitHub: {entry.url}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div
              className="px-3 py-1.5 text-xs font-mono rounded border-2 text-neutral-200"
              style={{ background: "#2a2a2a", borderColor: "#c05a2b" }}
            >
              codex
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase mb-2">
                Available
              </p>
              <div className="rounded-lg overflow-hidden border border-neutral-700/60">
                <div
                  className="px-3 py-2.5 border-b border-neutral-700/60"
                  style={{ background: "#2d2d2d" }}
                >
                  <p className="text-[13px] font-semibold text-neutral-200">codex</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Use Codex from Claude Code to review code or delegate tasks.
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">from openai-codex</p>
                </div>
                <div className="divide-y divide-neutral-700/50">
                  {[
                    { label: "Install for you", sub: "Available in all your projects", active: true },
                    { label: "Install for this project", sub: "Shared with all collaborators", active: false },
                    { label: "Install locally", sub: "Only for you, only in this repo", active: false },
                  ].map((opt) => (
                    <div
                      key={opt.label}
                      className="px-3 py-2"
                      style={{ background: opt.active ? "#3a3a3a" : "#252525" }}
                    >
                      <p className={`text-[12px] font-medium ${opt.active ? "text-neutral-100" : "text-neutral-400"}`}>
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-neutral-500">{opt.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
