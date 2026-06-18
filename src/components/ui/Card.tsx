import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-emerald-950/10 bg-white/80 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07] dark:shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
