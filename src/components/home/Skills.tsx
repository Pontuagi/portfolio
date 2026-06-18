import { skillGroups } from "@/data/skills";
import { MotionCard } from "@/components/motion/MotionCard";
import { Section } from "@/components/ui/Section";

export function Skills() {
  return (
    <Section className="bg-white dark:bg-[#071412]">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-800 dark:text-teal-200">
          Skills and tools
        </p>
        <h2 className="mt-4 text-3xl font-bold text-emerald-950 dark:text-emerald-50 sm:text-4xl">
          A practical stack for full-stack product work.
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-5">
        {skillGroups.map((group) => (
          <MotionCard
            key={group.title}
            className="rounded-lg border border-emerald-950/10 bg-[#f7f5ef] p-5 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07]"
          >
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50">
              {group.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-emerald-50/65">
              {group.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-700 dark:bg-white/10 dark:text-emerald-50/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
