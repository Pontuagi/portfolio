"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ReadMoreProps = {
  preview: ReactNode;
  more: ReactNode;
};

export function ReadMore({ preview, more }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div>
      {preview}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="more"
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            {more}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
      >
        {expanded ? "Read less" : "Read more"}
        <span aria-hidden className="text-xs opacity-70">
          {expanded ? "↑" : "↓"}
        </span>
      </button>
    </div>
  );
}
