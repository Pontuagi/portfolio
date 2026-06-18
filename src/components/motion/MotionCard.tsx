"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cardLift, reducedMotionTransition } from "@/lib/motion";

type MotionCardProps = ComponentPropsWithoutRef<typeof motion.article> & {
  children: ReactNode;
};

export function MotionCard({ children, className = "", ...props }: MotionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0.94, y: 12 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      viewport={{ once: true, amount: 0.18 }}
      variants={prefersReducedMotion ? undefined : cardLift}
      transition={prefersReducedMotion ? reducedMotionTransition : { duration: 0.22 }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
