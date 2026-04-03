import { CodeBlock, InlineCommand } from "./components/code-block";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 flex-1">

      {/* Header */}
      <header className="mb-16">
        <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4">
          Internal Guide
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug">
          Codex + Claude Code
        </h1>
        <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-base leading-relaxed">
          How to install the Codex plugin for Claude Code and get started on a
          remote Coder environment.
        </p>
        <div className="mt-6 border-t border-neutral-200 dark:border-neutral-800" />
      </header>

      {/* Steps */}
      <div className="space-y-14">

        {/* Step 1 */}
        <section>
          <StepLabel n={1} />
          <h2 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Install Codex
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Codex is installed globally via npm. On a Coder environment this
            requires <code className="font-mono text-neutral-700 dark:text-neutral-300">sudo</code>.
          </p>
          <CodeBlock env="terminal" code="sudo npm install -g @openai/codex" />
        </section>

        {/* Step 2 */}
        <section>
          <StepLabel n={2} />
          <h2 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Authenticate
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Because Coder runs headlessly, skip the browser-based login and use
            device-code authentication instead.
          </p>
          <CodeBlock env="terminal" code="codex login --device-auth" />

          <Callout>
            <p className="text-sm leading-relaxed">
              Codex will print a URL and a 9-character one-time code — for
              example <span className="font-mono font-medium">XMOG-HPSSC</span>.
              Open the URL in your local browser, sign in to your OpenAI account,
              and enter the code when prompted. The CLI will confirm once the
              device is authorized.
            </p>
            <div className="mt-4 space-y-1 text-xs font-mono text-neutral-400 dark:text-neutral-500">
              <p>1. Open → https://auth.openai.com/codex/device</p>
              <p>2. Enter your one-time code</p>
              <p>3. Return here — the CLI finishes automatically</p>
            </div>
          </Callout>

          <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
            Never share your device code with anyone. It expires after 15 minutes.
          </p>
        </section>

        {/* Step 3 */}
        <section>
          <StepLabel n={3} />
          <h2 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Install the Claude Code plugin
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Inside a Claude Code session, run these three commands in order.
          </p>
          <div className="space-y-2">
            <CodeBlock env="claude" code="/plugin marketplace add openai/codex-plugin-cc" />
            <CodeBlock env="claude" code="/plugin install codex@openai-codex" />
            <CodeBlock env="claude" code="/reload-plugins" />
          </div>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Then run the setup wizard:
          </p>
          <CodeBlock env="claude" code="/codex:setup" />
        </section>

        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-neutral-800" />

        {/* Use cases */}
        <section>
          <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-6">
            What you can do with it
          </p>

          <div className="space-y-8">
            <UseCase
              command="/codex:review"
              title="Code review"
              description="Codex reviews your uncommitted changes (or a branch diff) and returns feedback inline. Pass --base <ref> to compare against any branch or commit."
            />
            <UseCase
              command="/codex:adversarial-review"
              title="Pressure-test your approach"
              description="Codex actively challenges your design decisions and surfaces assumptions you may have missed. Useful before a big merge."
            />
            <UseCase
              command="/codex:rescue"
              title="Delegate a complex task"
              description="Hand a stubborn investigation or fix to Codex and let it work in the background. Use /codex:status to check progress and /codex:result to retrieve the output."
            />
          </div>
        </section>

        {/* Footer note */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
            The plugin uses your local Codex installation and authentication — no
            separate credentials needed. Work started here can be resumed in the
            Codex CLI with{" "}
            <code className="font-mono">codex resume &lt;session-id&gt;</code>.
          </p>
        </div>

      </div>
    </main>
  );
}

/* ── Small shared components ── */

function StepLabel({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-400 dark:text-neutral-500">
      {n}
    </span>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 px-4 py-4 border-l-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 rounded-r-lg">
      {children}
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
    <div>
      <InlineCommand code={command} />
      <h3 className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
