"use client";

import { useState } from "react";

type CardDescriptionProps = {
  description: string;
  highlights?: readonly string[];
};

export function CardDescription({ description, highlights }: CardDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle =
    description.split(" ").length > 22 || Boolean(highlights?.length);

  if (!needsToggle) {
    return (
      <p className="mt-4 leading-7 text-stone-700 dark:text-emerald-50/75">
        {description}
      </p>
    );
  }

  return (
    <div>
      <p
        className={`mt-4 leading-7 text-stone-700 dark:text-emerald-50/75 ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {description}
      </p>
      {expanded && highlights?.length ? (
        <ul className="mt-3 space-y-1.5">
          {highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-sm leading-6 text-stone-600 dark:text-emerald-50/65"
            >
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" />
              {h}
            </li>
          ))}
        </ul>
      ) : null}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 text-xs font-semibold text-teal-700 transition hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}
