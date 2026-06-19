import { skillGroups } from "@/data/skills";
import { MotionCard } from "@/components/motion/MotionCard";
import { Section } from "@/components/ui/Section";
import type { ReactNode } from "react";

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625v-5.625m0 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 0v-5.625M3.75 12c0 2.278 3.694 4.125 8.25 4.125s8.25-1.847 8.25-4.125" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}

const categoryIcons: Record<string, ReactNode> = {
  Languages: <CodeIcon />,
  "Frontend and Mobile": <MonitorIcon />,
  "Backend and Data": <ServerIcon />,
  "Engineering Practice": <GearIcon />,
  "Professional Strengths": <PeopleIcon />,
};

export function Skills() {
  return (
    <Section id="skills" className="bg-white dark:bg-[#071412]">
      <div className="mb-14 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-800 dark:text-teal-200">
          Skills and tools
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl">
          A practical stack for full-stack product work.
        </h2>
      </div>

      {/* Row 1: 3 columns */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.slice(0, 3).map((group) => (
          <SkillCard key={group.title} group={group} />
        ))}
      </div>

      {/* Row 2: 2 columns */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {skillGroups.slice(3).map((group) => (
          <SkillCard key={group.title} group={group} />
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ group }: { group: (typeof skillGroups)[number] }) {
  const icon = categoryIcons[group.title];
  return (
    <MotionCard className="rounded-xl border border-emerald-950/10 bg-[#f7f5ef] p-6 shadow-sm shadow-emerald-950/5 dark:border-white/10 dark:bg-white/[0.07]">
      {icon ? (
        <div className="inline-flex items-center justify-center rounded-lg bg-teal-100 p-2 text-teal-800 dark:bg-teal-300/15 dark:text-teal-200">
          {icon}
        </div>
      ) : null}
      <h3 className="mt-4 text-lg font-bold text-emerald-950 dark:text-emerald-50">
        {group.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-emerald-50/55">
        {group.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-600 dark:bg-white/10 dark:text-emerald-50/75"
          >
            {skill}
          </span>
        ))}
      </div>
    </MotionCard>
  );
}
