import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="story-gradient subtle-grid px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-800">
            Full-stack software engineer
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-tight text-emerald-950 sm:text-6xl">
            I build software that turns complex ideas into useful everyday tools.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
            I am {site.name}, a Nairobi-based engineer shaped by mechatronics,
            ALX software training, backend specialization, and hands-on product work
            across web and mobile platforms.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/projects">Explore case studies</Button>
            <Button href="/contact" variant="secondary">
              Start a conversation
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-stone-600">
            {site.socialLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-teal-800">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-lg bg-amber-200/70 lg:block" />
          <div className="relative overflow-hidden rounded-lg border border-emerald-950/10 bg-white p-3 shadow-xl shadow-emerald-950/10">
            <Image
              src="/images/bg.png"
              alt="Kipkoech Benedict"
              width={720}
              height={720}
              className="aspect-square rounded-md object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-6 right-4 max-w-64 rounded-lg bg-emerald-950 p-5 text-white shadow-lg">
            <p className="text-sm leading-6 text-emerald-50">
              From engineering systems to software systems, I care about tools that
              simplify work and improve lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
