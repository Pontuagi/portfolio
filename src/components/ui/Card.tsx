import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg border border-emerald-950/10 bg-white/80 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
