import { timeline } from "@/data/timeline";
import { CardDescription } from "@/components/home/CardDescription";
import { MotionCard } from "@/components/motion/MotionCard";
import { Section } from "@/components/ui/Section";

function EducationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006-3.75 1.498m-13.5-7.998a48.158 48.158 0 0 1 6-2.292m6 0a48.152 48.152 0 0 1 6 2.292M10.5 8.25V6c0-.621.504-1.125 1.125-1.125h.75c.621 0 1.125.504 1.125 1.125v2.25" />
    </svg>
  );
}

const typeConfig = {
  education: {
    icon: <EducationIcon />,
    chipClass:
      "bg-teal-100 text-teal-800 dark:bg-teal-300/15 dark:text-teal-100",
  },
  experience: {
    icon: <ExperienceIcon />,
    chipClass:
      "bg-amber-100 text-amber-800 dark:bg-amber-300/15 dark:text-amber-100",
  },
} as const;

export function Journey() {
  return (
    <Section id="journey" className="bg-[#f7f5ef] dark:bg-[#0b201d]">
      <div className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-800 dark:text-teal-200">
          Engineering journey
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
          A timeline of learning, building, and taking responsibility.
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {timeline.slice(0, 6).map((item) => {
          const config = typeConfig[item.type as keyof typeof typeConfig];
          return (
            <MotionCard
              key={`${item.title}-${item.period}`}
              className="rounded-xl border border-emerald-950/10 bg-white/75 p-6 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07]"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase ${config?.chipClass ?? ""}`}
                >
                  {config?.icon}
                  {item.type}
                </span>
                <span className="text-sm text-stone-400 dark:text-emerald-50/45">
                  {item.period}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-emerald-950 dark:text-emerald-50">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-stone-500 dark:text-emerald-50/55">
                {item.organization}
              </p>
              <CardDescription
                description={item.description}
                highlights={item.highlights}
              />
            </MotionCard>
          );
        })}
      </div>
    </Section>
  );
}
