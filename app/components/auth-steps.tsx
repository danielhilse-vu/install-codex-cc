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
  const isFirst = current === 0;
  const isLast = current === STEPS.length - 1;

  return (
    <div className="mt-4">
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
        <button
          onClick={() => setCurrent((c) => c - 1)}
          disabled={isFirst}
          aria-label="Previous step"
          className="px-3 py-2.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors bg-neutral-50 dark:bg-neutral-800/60 text-sm shrink-0"
        >
          ←
        </button>

        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-1 px-2 py-2.5 text-[11px] font-medium text-center transition-colors leading-tight ${
              i === current
                ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                : "bg-neutral-50 dark:bg-neutral-800/60 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            {s.label}
          </button>
        ))}

        <button
          onClick={() => setCurrent((c) => c + 1)}
          disabled={isLast}
          aria-label="Next step"
          className="px-3 py-2.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors bg-neutral-50 dark:bg-neutral-800/60 text-sm shrink-0"
        >
          →
        </button>
      </div>

      {/* Hint */}
      <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
        {step.hint}
      </p>
    </div>
  );
}
