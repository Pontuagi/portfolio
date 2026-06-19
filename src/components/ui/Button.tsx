import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-700 text-white shadow-sm shadow-teal-900/10 hover:bg-teal-800 dark:bg-teal-500 dark:text-emerald-950 dark:hover:bg-teal-400",
  secondary:
    "border border-emerald-900/20 bg-white/70 text-emerald-950 hover:border-teal-700 hover:text-teal-800 dark:border-white/15 dark:bg-white/[0.08] dark:text-emerald-50 dark:hover:border-teal-300 dark:hover:text-teal-200",
  ghost:
    "text-teal-800 hover:bg-teal-900/5 dark:text-teal-200 dark:hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${variants[variant]} ${className}`;

  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
