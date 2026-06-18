import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-emerald-950/10 bg-emerald-950 px-5 py-10 text-white dark:border-white/10 dark:bg-[#05100f] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/bg.png"
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{site.name}</p>
            <p className="text-sm text-emerald-100/75">{site.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-emerald-100/80">
          <Link href="/projects" className="hover:text-white">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-white">
            Short Stories
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
        <p className="text-sm text-emerald-100/70">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
