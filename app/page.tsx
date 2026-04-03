import { CodeBlock, InlineCommand } from "./components/code-block";
import { PluginInstallSteps } from "./components/plugin-install-steps";
import { AuthSteps } from "./components/auth-steps";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 flex-1">

      {/* Header */}
      <header className="mb-16">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] font-mono tracking-[0.18em] text-neutral-400 uppercase">
            Internal Guide
          </p>
          <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            Daniel Hilse · 04.03.2026
          </p>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
          Codex + Claude Code
        </h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base leading-relaxed max-w-prose">
          How to install the Codex plugin for Claude Code and get started on a
          remote Coder environment.
        </p>
      </header>

      {/* Steps */}
      <div className="space-y-12">

        {/* Step 1 */}
        <section>
          <StepHeading n={1}>Connect to your Coder workspace</StepHeading>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            SSH into your workspace from your local machine. Everything from
            here runs inside Coder.
          </p>
          <CodeBlock env="local" code="coder ssh <workspace-name>" />
        </section>

        {/* Step 2 */}
        <section>
          <StepHeading n={2}>Install Codex</StepHeading>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Codex is installed globally via npm. On Coder this requires{" "}
            <code className="font-mono text-[13px] px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded">sudo</code>.
          </p>
          <CodeBlock env="coder" code="sudo npm install -g @openai/codex" />
        </section>

        {/* Step 3 */}
        <section>
          <StepHeading n={3}>Authenticate</StepHeading>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Because Coder runs headlessly, skip the browser-based login and use
            device-code authentication instead.
          </p>
          <CodeBlock env="coder" code="codex login --device-auth" />
          <LoginOutput />
          <AuthSteps />
        </section>

        {/* Step 4 */}
        <section>
          <StepHeading n={4}>Install the Claude Code plugin</StepHeading>
          <p className="mt-3 mb-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Choose how you access Claude Code.
          </p>
          <PluginInstallSteps />
        </section>

        {/* Divider */}
        <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Use cases */}
        <section>
          <p className="text-[11px] font-mono tracking-[0.18em] text-neutral-400 uppercase mb-2">
            What you can do with it
          </p>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            <UseCase
              command="/codex:review"
              title="Code review"
              description="Reviews your uncommitted changes (or a branch diff) and returns feedback inline. Pass --base <ref> to compare against any branch or commit."
            />
            <UseCase
              command="/codex:adversarial-review"
              title="Pressure-test your approach"
              description="Actively challenges your design decisions and surfaces assumptions you may have missed. Useful before a big merge."
            />
            <UseCase
              command="/codex:rescue"
              title="Delegate a complex task"
              description="Hand a stubborn investigation or fix to Codex and let it work in the background. Use /codex:status to check progress and /codex:result to retrieve the output."
            />
          </div>
        </section>

        {/* Footer note */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 space-y-3">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
            The plugin uses your local Codex installation and authentication — no
            separate credentials needed. Work started here can be resumed in the
            Codex CLI with{" "}
            <code className="font-mono text-[11px] px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">
              codex resume &lt;session-id&gt;
            </code>.
          </p>
          <a
            href="https://github.com/openai/codex-plugin-cc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            openai/codex-plugin-cc
          </a>
        </div>

      </div>
    </main>
  );
}

/* ── Shared components ── */

function StepHeading({ n, children }: { n: number; children: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[11px] font-semibold text-neutral-400 dark:text-neutral-600 tabular-nums shrink-0 tracking-wider">
        0{n}
      </span>
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {children}
      </h2>
    </div>
  );
}

function LoginOutput() {
  return (
    <div className="mt-3 rounded-lg border border-amber-900/40 overflow-hidden">
      <div className="px-4 py-3 bg-[#141410] font-mono text-sm leading-relaxed space-y-3">
        <div>
          <p className="text-amber-50 font-bold">Welcome to Codex [v0.118.0]</p>
          <p className="text-neutral-500">OpenAI's command-line coding agent</p>
        </div>
        <div className="space-y-3">
          <p className="text-amber-50 font-bold">
            Follow these steps to sign in with ChatGPT using device code
            authorization:
          </p>
          <div>
            <p className="text-amber-50 font-bold">
              1. Open this link in your browser and sign in to your account
            </p>
            <a
              href="https://auth.openai.com/codex/device"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors underline-offset-2 hover:underline"
            >
              https://auth.openai.com/codex/device
            </a>
          </div>
          <div>
            <p className="text-amber-50 font-bold">
              2. Enter this one-time code{" "}
              <span className="text-neutral-500 font-normal">
                (expires in 15 minutes)
              </span>
            </p>
            <p className="text-amber-500 font-bold">XSB5-AKY4F</p>
          </div>
        </div>
        <p className="text-neutral-500">
          Device codes are a common phishing target. Never share this code.
        </p>
      </div>
    </div>
  );
}

function UseCase({
  command,
  title,
  description,
}: {
  command: string;
  title: string;
  description: string;
}) {
  return (
    <div className="py-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <InlineCommand code={command} />
      </div>
      <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
