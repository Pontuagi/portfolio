import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function ContactCta() {
  return (
    <Section className="bg-white">
      <div className="rounded-lg bg-amber-100 px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-amber-900">
            Let us build
          </p>
          <h2 className="mt-3 text-3xl font-bold text-emerald-950">
            Have a product, team, or automation idea that needs careful engineering?
          </h2>
          <p className="mt-4 leading-7 text-stone-700">
            I am open to meaningful full-stack, mobile, backend, and automation-focused
            work where the goal is useful software, not just more screens.
          </p>
        </div>
        <Button href="/contact" className="mt-8 lg:mt-0">
          Get in touch
        </Button>
      </div>
    </Section>
  );
}
