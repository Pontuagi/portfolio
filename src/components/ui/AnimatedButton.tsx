"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/Button";

type AnimatedButtonProps = ComponentProps<typeof Button>;

export function AnimatedButton(props: AnimatedButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className="inline-flex"
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18 }}
    >
      <Button {...props} />
    </motion.span>
  );
}
