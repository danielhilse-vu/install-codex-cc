"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";
import { AuthSteps } from "./auth-steps";
import { PluginInstallSteps } from "./plugin-install-steps";

type Env = "local" | "coder";

export function InstallSteps() {
  const [env, setEnv] = useState<Env>("local");
  const isCoder = env === "coder";

  // Step numbers shift when Coder step 1 is hidden
  const n = isCoder
    ? { connect: 1, install: 2, auth: 3, plugin: 4 }
    : { install: 1, auth: 2, plugin: 3 };

  return (
    <div>
      {/* Environment toggle */}
      <div className="inline-flex gap-px bg-neutral-200 dark:bg-neutral-700/50 rounded-lg p-0.5 mb-10">
        {(["local", "coder"] as Env[]).map((e) => (
          <button
            key={e}
            onClick={() => setEnv(e)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              env === e
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            }`}
          >
            {e === "coder" ? "Coder environment" : "Local"}
          </button>
        ))}
      </div>

      <div className="space-y-12">

        {/* Step: Connect (Coder only) */}
        {isCoder && (
          <section>
            <StepHeading n={n.connect!}>Connect to your Coder workspace</StepHeading>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              SSH into your workspace from your local machine. Everything from
              here runs inside Coder.
            </p>
            <CodeBlock env="local" code="coder ssh <workspace-name>" />
          </section>
        )}

        {/* Step: Install Codex */}
        <section>
          <StepHeading n={n.install}>Install Codex</StepHeading>
          {isCoder ? (
            <>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Codex is installed globally via npm. On Coder this requires{" "}
                <code className="font-mono text-[13px] px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded">
                  sudo
                </code>
                .
              </p>
              <CodeBlock env="coder" code="sudo npm install -g @openai/codex" />
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Codex is installed globally via npm.
              </p>
              <CodeBlock env="local" code="npm install -g @openai/codex" />
            </>
          )}
        </section>

        {/* Step: Authenticate */}
        <section>
          <StepHeading n={n.auth}>Authenticate</StepHeading>
          {isCoder ? (
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Because Coder runs headlessly, skip the browser-based login and
              use device-code authentication instead.
            </p>
          ) : (
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Sign in to link your OpenAI account with the Codex CLI. Use
              device-code authentication so no browser needs to open in your
              terminal.
            </p>
          )}
          <CodeBlock
            env={isCoder ? "coder" : "local"}
            code="codex login --device-auth"
          />
          <LoginOutput />
          <AuthSteps />
        </section>

        {/* Step: Install plugin */}
        <section>
          <StepHeading n={n.plugin}>Install the Claude Code plugin</StepHeading>
          <p className="mt-3 mb-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Choose how you access Claude Code.
          </p>
          <PluginInstallSteps />
        </section>

      </div>
    </div>
  );
}

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
