"use client";

import { useState } from "react";
import Image from "next/image";

const STEPS = [
  {
    label: "Sign in to OpenAI",
    hint: "Enter your work email and click Continue.",
    src: "/steps/1.%20login.png",
  },
  {
    label: "Okta SSO",
    hint: "Use your Windows username (same as your computer login).",
    src: "/steps/2.%20okta%20SSO%20sign%20in%20.png",
  },
  {
    label: "Authorize Codex",
    hint: "Review the permissions and click Continue to link your account.",
    src: "/steps/3.%20Sign%20into%20Codex.png",
  },
  {
    label: "Enter device code",
    hint: "Paste the 9-character code printed in your terminal.",
    src: "/steps/4.%20enter%20the%20passkey.png",
  },
];

export function AuthSteps() {
  const [current, setCurrent] = useState(0);
  const step = STEPS[current];

  return (
    <div className="mt-4">
      {/* Hint */}
      <p className="mb-2 text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
        {step.hint}
      </p>

      {/* Image */}
      <div className="rounded-t-lg overflow-hidden border border-b-0 border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
        <div
          key={step.src}
          className="relative w-full aspect-[4/3] animate-fade-slide"
        >
          <Image
            src={step.src}
            alt={step.label}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex items-stretch border border-neutral-200 dark:border-neutral-700 rounded-b-lg overflow-hidden divide-x divide-neutral-200 dark:divide-neutral-700">
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-1 flex items-center justify-center gap-2 px-2 py-2.5 transition-colors ${
              i === current
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                : "bg-neutral-50 dark:bg-neutral-800/40 text-neutral-400 dark:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-600 dark:hover:text-neutral-300"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold shrink-0 transition-colors ${
                i === current
                  ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-[11px] font-medium leading-tight">{s.label}</span>
          </button>
        ))}

      </div>

    </div>
  );
}
