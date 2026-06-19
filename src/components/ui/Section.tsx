import type { ReactNode } from "react";
import { MotionSection } from "@/components/motion/MotionSection";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
};

export function Section({ children, className = "", id, animate = true }: SectionProps) {
  const classes = `px-5 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`;

  if (!animate) {
    return (
      <section id={id} className={classes}>
        <div className="mx-auto max-w-6xl">{children}</div>
      </section>
    );
  }

  return (
    <MotionSection id={id} className={classes}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </MotionSection>
  );
}
