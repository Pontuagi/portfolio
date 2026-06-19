import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function ContactCta() {
  return (
    <Section id="contact" className="bg-white dark:bg-[#071412]">
      <div className="overflow-hidden rounded-2xl bg-amber-50 shadow-sm shadow-amber-900/5 dark:bg-amber-300/[0.08]">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-amber-400 to-teal-600" />

        <div className="px-8 py-14 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-300">
              Let us build
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
              Have an idea that needs careful engineering?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-stone-600 dark:text-emerald-50/70">
              I am open to meaningful full-stack, mobile, backend, and
              automation-focused work where the goal is useful software, not
              just more screens.
            </p>
          </div>

          <div className="mt-10 shrink-0 lg:mt-0">
            <Button href="/contact">Get in touch</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
