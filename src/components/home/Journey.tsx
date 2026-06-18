import { timeline } from "@/data/timeline";
import { MotionCard } from "@/components/motion/MotionCard";
import { Section } from "@/components/ui/Section";

export function Journey() {
  return (
    <Section className="bg-[#f7f5ef] dark:bg-[#0b201d]">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
          Engineering journey
        </p>
        <h2 className="mt-4 text-3xl font-bold text-emerald-950 dark:text-emerald-50 sm:text-4xl">
          A timeline of learning, building, and taking responsibility.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {timeline.slice(0, 6).map((item) => (
          <MotionCard
            key={`${item.title}-${item.period}`}
            className="rounded-lg border border-emerald-950/10 bg-white/75 p-6 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase text-teal-900 dark:bg-teal-300/15 dark:text-teal-100">
                {item.type}
              </span>
              <span className="text-sm text-stone-500 dark:text-emerald-50/55">
                {item.period}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-emerald-950 dark:text-emerald-50">
              {item.title}
            </h3>
            <p className="mt-1 font-medium text-stone-600 dark:text-emerald-50/65">
              {item.organization}
            </p>
            <p className="mt-4 leading-7 text-stone-700 dark:text-emerald-50/75">
              {item.description}
            </p>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
