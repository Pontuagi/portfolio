"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { reducedMotionTransition } from "@/lib/motion";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function MotionSection({ children, className = "", id }: MotionSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0.92, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={
        prefersReducedMotion
          ? reducedMotionTransition
          : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.section>
  );
}
