"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Short Stories" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-950/10 bg-[#f7f5ef]/90 backdrop-blur dark:border-white/10 dark:bg-[#071412]/88">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/bg.png"
            alt="Kipkoech Benedict"
            width={40}
            height={40}
            className="rounded-full border border-emerald-950/10 dark:border-white/15"
            priority
          />
          <span className="text-sm font-bold uppercase text-emerald-950 dark:text-emerald-50">
            {site.name}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-teal-900 text-white dark:bg-teal-400 dark:text-emerald-950"
                    : "text-stone-700 hover:bg-emerald-950/5 hover:text-emerald-950 dark:text-emerald-50/75 dark:hover:bg-white/10 dark:hover:text-emerald-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-emerald-950/15 bg-white/70 text-emerald-950 dark:border-white/15 dark:bg-white/10 dark:text-emerald-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span
              className={`h-0.5 w-full rounded bg-current transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded bg-current transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-emerald-950/10 bg-[#f7f5ef] px-5 py-3 dark:border-white/10 dark:bg-[#071412] md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-stone-800 hover:bg-emerald-950/5 dark:text-emerald-50/80 dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
